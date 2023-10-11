<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('storages', function (Blueprint $table) {
            $table->id();
            $table->string('file');
            $table->timestamps();
        });

        Schema::create('storagables', function (Blueprint $table) {
            $table->foreignId('storage_id')->constrained('storages')->onDelete('cascade');
            $table->morphs('storagables');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storagables');
        Schema::dropIfExists('storages');
    }
};
