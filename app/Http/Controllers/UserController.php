<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Hash;
use App\User;
use App\UserType;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UsersController extends Controller
{
    public function getUserType(){
        return UserType::orderBy('id', 'desc')->get();
    }

    public function getProfessors(){
        return User::where('user_type_id', 3)->get();
    }

    public function createUser(Request $request){
        // validate
        $this->validate($request, [
            'firstName'=> 'required',
            'lastName'=> 'required',
            'password'=> 'required|min:6',
            'email'=> 'required|email',
            'userType'=> 'required',
        ]);

        $password = bcrypt($request-> password);

        $user = User::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'password' => $password,
            'user_type_id' => $request->userType,
        ]);
        
        return $user;
    }

    public function loginUser(Request $request){
        
        // validate request
        $this->validate($request, [
            'email' => 'bail|required|email',
            'password' => 'bail|required|min:6',
        ]);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            return response()->json([
                'msg' => 'You are logged in',
                'user' => $user,
                'status'=> 200,
            ]);
        } else {
            return response()->json([
                'msg' => 'Pogrešni podatci za prijavu',
                'status'=> 401
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}