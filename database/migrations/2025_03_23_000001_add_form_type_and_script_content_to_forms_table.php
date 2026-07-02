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
        // Add form_type and script_content columns to forms table
        Schema::table('forms', function (Blueprint $table) {
            // Form type: 'schema' (default) or 'script'
            $table->string('form_type')->default('schema')->after('schema');
            
            // Script content for script-based forms
            $table->longText('script_content')->nullable()->after('form_type');
            
            // Index for form_type
            $table->index('form_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('forms', function (Blueprint $table) {
            $table->dropColumn(['form_type', 'script_content']);
        });
    }
};
