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
        Schema::table('users', function (Blueprint $table) {
            // Add google_id if not exists
            if (!Schema::hasColumn('users', 'google_id')) {
                $table->string('google_id')->nullable()->after('email');
            }
            
            // Add avatar if not exists
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable()->after('google_id');
            }
            
            // Add user_type if not exists
            if (!Schema::hasColumn('users', 'user_type')) {
                $table->string('user_type')->default('external')->after('avatar');
            }
            
            // Add is_internal if not exists
            if (!Schema::hasColumn('users', 'is_internal')) {
                $table->boolean('is_internal')->default(false)->after('user_type');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'avatar', 'user_type', 'is_internal']);
        });
    }
};
