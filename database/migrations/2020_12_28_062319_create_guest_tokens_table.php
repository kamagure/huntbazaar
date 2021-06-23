<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuestTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guest_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token_invitation');
            $table->string('register_code')->nullable();
            $table->enum('status', ['NOT YET', 'FINISH'])->default('NOT YET');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guest_tokens');
    }
}
