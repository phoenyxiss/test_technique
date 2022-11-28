<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserFinancialProductsModel extends Model
{
    protected $table = 'users_financial_products';
    protected $connection = 'pgsql';
    public $timestamps = false;
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'UserId',
        'FinancialProductId'
    ];
}
