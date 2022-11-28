<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\UserModel;


class UserController extends Controller
{
    // Add an user into users table
    public function store(Request $request){
        $validated = $request->validate([
            'LastName' => 'string|required',
            'FirstName' => 'string|required',
            'Email' => 'email|required',
            'Password' => 'string|required',
        ]);

        $user = UserModel::create([
            'LastName' => $request->LastName,
            'FirstName' => $request->FirstName,
            'Email' => $request->Email,
            'Password' => Hash::make($request->Password)
        ]);
        return response()->json($user, 200);
    }

    // Check if user already exists in users table
    public function show(Request $request){
        $validated = $request->validate([
            'Email' => 'email|required',
            'Password' => 'string|required',
        ]);

        $user = UserModel::where('Email', '=', $request->Email)->first();
        if (!Hash::check($request->Password, $user->Password)) {
            return response()->json([
                'success'=>false,
                'message' => 'Wrong password'
            ], 401);
         }
        return response()->json($user, 200);
    }

    // Update user
    public function update(Request $request, UserModel $user){
        $validated = $request->validate([
            'FinancialKnowledge' => 'Integer|required',
        ]);
        $user->update(['FinancialKnowledge' => $request->FinancialKnowledge]);

        return response()->json($user, 200);
    }
}
