<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Customer;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
       
        // User::create([
        //     'name' => 'John Doe',
        //     'email' => 'admin@thecapex.pro',
        //     'password' => Hash::make('Nepal@123#'),
        // ]);

        $countries = \App\Models\CountryCode::all();
        $currencies = \App\Models\Currency::all();

        for ($i = 1; $i <= 10; $i++) {
            Customer::create([
                'full_name' => 'Customer ' . $i,
                'email' => 'customer' . $i . '@example.com',
                'password' => Hash::make('password' . $i),
                'txt_password' => 'password' . $i,
                'country_code_id' => $countries->random()->id,
                'contact_no' => '123456789' . $i,
                'is_email_verified' => rand(0, 1),
                'user_remark' => 'Sample remark for customer ' . $i,
                'is_active' => rand(0, 1),
                'is_kyc_verified' => rand(0, 1),
                'kyc_verified_at' => now()->subDays(rand(1, 30)),
                'balance_usdt' => rand(0, 1000) + (rand(0, 99) / 100),
                'total_deposit' => rand(0, 5000) + (rand(0, 99) / 100),
                'pending_deposit' => rand(0, 500) + (rand(0, 99) / 100),
                'total_withdraw' => rand(0, 3000) + (rand(0, 99) / 100),
                'freezed' => rand(0, 200) + (rand(0, 99) / 100),
                'traded_amount' => rand(0, 10000) + (rand(0, 99) / 100),
                'credit_score' => rand(300, 850) + (rand(0, 99) / 100),
                'currency_id' => $currencies->random()->id,
            ]);
        }
    }
}
