<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_financial_products', function (Blueprint $table) {
            $table->integer("userid")->index();
            $table->integer("financialproductid")->index();
            $table->foreign('userid')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('financialproductid')->references('id')->on('financial_products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_financial_products');
    }
};
