<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\FinancialProductsModel;

class FinancialProductsController extends Controller
{
	// List all financial products
	public function index(Request $request){
		$financialProducts = FinancialProductsModel::all();

		return response()->json($financialProducts, 200);
	}
}
