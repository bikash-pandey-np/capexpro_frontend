<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Position;
use Carbon\Carbon;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use Throwable;
use Illuminate\Support\Facades\Log;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $positions = Position::query();

        $search = false;
        if($request->has('search') && $request->search != ''){
            $search = true;
            $positions->where(function($query) use ($request) {
                $query->where('symbol', 'like', '%'.$request->search.'%')
                    ->orWhere('identifier', 'like', '%'.$request->search.'%')
                    ->orWhereHas('tradedBy', function($subQuery) use ($request) {
                        $subQuery->where('full_name', 'like', '%'.$request->search.'%')
                            ->orWhere('email', 'like', '%'.$request->search.'%')
                            ->orWhere('customer_code', 'like', '%'.$request->search.'%');
                    });
            });
        }

        if($request->has('status') && $request->status != ''){
            $search = true;
            $positions->where('status', $request->status);
        }

        $positions->with(['tradedBy']);
        $positions = $positions->latest()->paginate(10);

        return Inertia::render('Admin/Positions/Index', [
            'positions' => $positions,
            'search' => $search,
        ]);
    }

    public function makeWin(Request $request)
    {

        DB::beginTransaction();

        try{

            $position = Position::with('tradedBy')->find($request->id);

            $position->update([
                'outcome' => 'Positive',
                'pnl' => $request->amount,
                'status' => 'Settled',
                'closed_at' => $position->will_close_at,
                'is_active' => false,
                'trade_close_price' => $position->type == 'long' ? $position->entry_price + (10/100) * $position->entry_price : $position->entry_price - (10/100) * $position->entry_price,

            ]);


            $customer = Customer::find($position->tradedBy->id);

            Log::info('Previous Balance'. $customer->balance_usdt);

            Log::info('Balance to Add ' . $request->amount);

            Log::info('Trade amount ' . $position->amount);

            $customer->balance_usdt = $customer->balance_usdt + $request->amount + $position->amount;

            $customer->save();

            DB::commit();

            return back()->with('success', 'Position Updated successfully');
        }catch(Throwable
         $e){
            DB::rollBack();
            Log::error('POisitionController@makeWin' . $e->getMessage() . ' on line ' . $e->getLine());
            return back()->with('error', 'Something went wrong');
        }

    }

    public function makeLose(Request $request)
    {
        DB::beginTransaction();

        try{

            $position = Position::with('tradedBy')->find($request->id);

            $position->update([
                'outcome' => 'Negative',
                'pnl' => $position->amount,
                'status' => 'Settled',
                'closed_at' => $position->will_close_at,
                'is_active' => false,
                'trade_close_price' => $position->type == 'long' ? $position->entry_price - (10/100) * $position->entry_price : $position->entry_price + (10/100) * $position->entry_price,
            ]);


            // $customer = Customer::find($position->tradedBy->id);

            // Log::info('Previous Balance'. $customer->balance_usdt);

            // Log::info('Balance to Add ' . $request->amount);

            // Log::info('Trade amount ' . $position->amount);


            // $customer->save();

            DB::commit();

            return back()->with('success', 'Position Updated successfully');
        }catch(Throwable
         $e){
            DB::rollBack();
            Log::error('POisitionController@makeWin' . $e->getMessage() . ' on line ' . $e->getLine());
            return back()->with('error', 'Something went wrong');
        }
    }
}
