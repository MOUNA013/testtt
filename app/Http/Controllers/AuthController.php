<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getLogin()
    {
        if (!is_null(session('id'))) return redirect()->route('payment');
        else return view('login');
    }

    public function postLogin(Request $request)
    {
        $request->validate([
            'log_email' => 'required|email',
            'log_password' => 'required'
        ]);

        $email = $request->input('log_email');
        $password = $request->input('log_password');

        // if(!Hash::check($password, $user->password)) 
        if (!Auth::attempt(['email' => $email, 'password' => $password])) return back()->withInput()->withErrors(['password' => __("Wrong password. Try again or click `Forgot password` to reset it.")]);
        $user = User::where('email', $email)->first();
        // $request->session()->regenerate();

        session([
            'id' => encrypt($user->id),
            'name' => $user->name,
            'password' => $user->password,
        ]);

        $intendedUrl = $request->session()->get('intended_url');
        if ($intendedUrl) return redirect()->to($intendedUrl);
        else return back();
    }
}
