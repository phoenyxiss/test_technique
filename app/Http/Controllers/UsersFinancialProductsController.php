<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\UserFinancialProductsModel;

class UsersFinancialProductsController extends Controller
{
	// Add an user and financial products into users_financial_products table
    public function store(Request $request){
        $validated = $request->validate([
            'UserId' => 'integer|required',
            'FinancialProductId' => 'integer|required',
        ]);

        $usersFinancialProducts = UserFinancialProductsModel::create([
            'UserId' => $request->UserId,
            'FinancialProductId' => $request->FinancialProductId
        ]);

        return response()->json($usersFinancialProducts, 200);
    }

    // Get user's financial products by user id
    public function show(Request $request){
        $validated = $request->validate([
            'UserId' => 'integer|required',
        ]);

        $usersFinancialProducts = UserFinancialProductsModel::where('UserId', '=', ($request->UserId))->first();

        return response()->json($usersFinancialProducts, 200);
    }
}
