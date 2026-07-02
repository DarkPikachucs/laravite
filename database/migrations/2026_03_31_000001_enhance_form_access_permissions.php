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
        Schema::table('form_access_requests', function (Blueprint $table) {
            // Add permission level for granular access control
            $table->enum('permission_level', ['view', 'export', 'manage'])->default('view')
                ->after('status')
                ->comment('view: ดูผลลัพธ์, export: ส่งออกข้อมูล, manage: จัดการทั้งหมด');

            // Add expiration for temporary access
            $table->timestamp('expires_at')->nullable()->after('reviewed_at')
                ->comment('วันหมดอายุสิทธิ์ (null = ถาวร)');

            // Add notification preferences
            $table->boolean('notify_on_submission')->default(false)->after('expires_at')
                ->comment('แจ้งเตือนเมื่อมีผู้ส่งแบบฟอร์มใหม่');

            // Add audit trail
            $table->json('audit_log')->nullable()->after('notify_on_submission')
                ->comment('ประวัติการเปลี่ยนแปลงสิทธิ์');
        });

        // Create table for direct access grants (owner can grant without request)
        Schema::create('form_access_grants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->foreignId('granted_by')->constrained('users')->onDelete('cascade'); // เจ้าของ who granted
            $table->foreignId('user_id')->constrained()->users()->onDelete('cascade'); // ผู้ได้รับสิทธิ์
            $table->enum('permission_level', ['view', 'export', 'manage'])->default('view');
            $table->timestamp('expires_at')->nullable();
            $table->boolean('notify_on_submission')->default(false);
            $table->text('notes')->nullable(); // หมายเหตุจากเจ้าของ
            $table->json('audit_log')->nullable();
            $table->timestamps();

            $table->unique(['form_id', 'user_id']);
            $table->index(['user_id', 'expires_at']);
        });

        // Create table for access request audit trail
        Schema::create('form_access_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('access_request_id')->nullable()->constrained('form_access_requests')->onDelete('cascade');
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ผู้กระทำ
            $table->string('action'); // created, approved, rejected, revoked, modified, expired
            $table->json('old_values')->nullable(); // ค่าเดิม
            $table->json('new_values')->nullable(); // ค่าใหม่
            $table->text('reason')->nullable(); // เหตุผล
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['form_id', 'created_at']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_access_audit_logs');
        Schema::dropIfExists('form_access_grants');

        Schema::table('form_access_requests', function (Blueprint $table) {
            $table->dropColumn([
                'permission_level',
                'expires_at',
                'notify_on_submission',
                'audit_log',
            ]);
        });
    }
};
