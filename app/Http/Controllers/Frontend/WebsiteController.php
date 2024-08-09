<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class WebsiteController extends Controller
{
    function getHomepage(Request $request) {

        return Inertia::render('Website/Homepage');
    }

    function getAboutPage(){
        return Inertia::render('Website/About');
        
    }

    function getContactPage(){
        return Inertia::render('Website/Contact');
        
    }
}
