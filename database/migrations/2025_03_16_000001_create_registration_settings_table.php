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
        Schema::create('registration_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, boolean, datetime, number
            $table->string('label')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Insert default settings
        $now = now();
        DB::table('registration_settings')->insert([
            [
                'key' => 'registration_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'label' => 'เปิด/ปิด การลงทะเบียน',
                'description' => 'ควบคุมการเปิดหรือปิดระบบลงทะเบียน',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'registration_start_date',
                'value' => now()->toDateTimeString(),
                'type' => 'datetime',
                'label' => 'วันที่เริ่มต้นลงทะเบียน',
                'description' => 'วันที่และเวลาเริ่มต้นการลงทะเบียน',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'registration_end_date',
                'value' => now()->addDays(30)->toDateTimeString(),
                'type' => 'datetime',
                'label' => 'วันที่สิ้นสุดลงทะเบียน',
                'description' => 'วันที่และเวลาสิ้นสุดการลงทะเบียน',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'registration_closed_message',
                'value' => 'ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว',
                'type' => 'text',
                'label' => 'ข้อความเมื่อปิดลงทะเบียน',
                'description' => 'ข้อความที่จะแสดงเมื่อการลงทะเบียนสิ้นสุดลง',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'key' => 'registration_not_yet_message',
                'value' => 'การลงทะเบียนจะเปิดเร็วๆ นี้',
                'type' => 'text',
                'label' => 'ข้อความเมื่อ belum เปิดลงทะเบียน',
                'description' => 'ข้อความที่จะแสดงเมื่อการลงทะเบียนยังไม่เริ่มต้น',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_settings');
    }
};
