<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialProductsModel extends Model
{
    protected $table = 'financial_products';
    protected $connection = 'pgsql';
    protected $primaryKey = 'Id';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'Name',
    ];
}
