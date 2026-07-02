<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'sqlite_phy70';

    public function up(): void
    {
        Schema::create('phy70_organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('phy70_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organization_id');
            $table->string('name');
            $table->string('email');
            $table->string('password')->nullable();
            $table->string('google_id')->nullable();
            $table->string('avatar')->nullable();
            $table->string('role')->default('user'); // admin or user
            $table->string('phone_number')->nullable();
            $table->rememberToken();
            $table->timestamps();

            // Ensure email is unique across the users table
            $table->unique(['email']);
            
            $table->foreign('organization_id')->references('id')->on('phy70_organizations')->onDelete('cascade');
        });

        Schema::create('phy70_proposals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organization_id');
            $table->unsignedBigInteger('user_id');
            
            // Section 1
            $table->text('national_strategy')->nullable();
            $table->text('master_plan')->nullable();
            $table->text('national_plan')->nullable();
            $table->text('regional_development')->nullable();
            
            // Section 2
            $table->text('province_issue')->nullable();
            $table->text('development_guideline')->nullable();
            $table->text('main_plan')->nullable();
            $table->text('plan')->nullable();
            
            // Section 3
            $table->string('project_name')->nullable();
            $table->text('main_activity')->nullable();
            $table->string('operating_agency')->nullable();
            $table->string('responsible_person')->nullable();
            $table->string('position')->nullable();
            $table->text('contact_address')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('attachments')->nullable(); // JSON array of uploaded file paths and names
            
            $table->timestamps();

            $table->foreign('organization_id')->references('id')->on('phy70_organizations')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('phy70_users')->onDelete('cascade');
        });

        Schema::create('phy70_invitations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organization_id');
            $table->string('email');
            $table->string('token')->unique();
            $table->boolean('used')->default(false);
            $table->timestamps();

            $table->foreign('organization_id')->references('id')->on('phy70_organizations')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phy70_invitations');
        Schema::dropIfExists('phy70_proposals');
        Schema::dropIfExists('phy70_users');
        Schema::dropIfExists('phy70_organizations');
    }
};
