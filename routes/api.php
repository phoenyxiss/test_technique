<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FinancialProductsController;
use App\Http\Controllers\UsersFinancialProductsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', UserController::class); // Les routes "users.*" de l'API
Route::apiResource('financial_products', FinancialProductsController::class); // Les routes "financial_products.*" de l'API
Route::apiResource('users_financial_products', UsersFinancialProductsController::class); // Les routes "users_financial_products.*" de l'API
