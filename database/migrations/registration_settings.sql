-- Registration Settings Table and Data
-- Run this in phpMyAdmin or MySQL command line

CREATE TABLE IF NOT EXISTS `registration_settings` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO `registration_settings` (`key`, `value`, `type`, `label`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
('registration_enabled', 'true', 'boolean', 'เปิด/ปิด การลงทะเบียน', 'ควบคุมการเปิดหรือปิดระบบลงทะเบียน', 1, NOW(), NOW()),
('registration_start_date', NOW(), 'datetime', 'วันที่เริ่มต้นลงทะเบียน', 'วันที่และเวลาเริ่มต้นการลงทะเบียน', 1, NOW(), NOW()),
('registration_end_date', DATE_ADD(NOW(), INTERVAL 30 DAY), 'datetime', 'วันที่สิ้นสุดลงทะเบียน', 'วันที่และเวลาสิ้นสุดการลงทะเบียน', 1, NOW(), NOW()),
('registration_closed_message', 'ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว', 'text', 'ข้อความเมื่อปิดลงทะเบียน', 'ข้อความที่จะแสดงเมื่อการลงทะเบียนสิ้นสุดลง', 1, NOW(), NOW()),
('registration_not_yet_message', 'การลงทะเบียนจะเปิดเร็วๆ นี้', 'text', 'ข้อความเมื่อ belum เปิดลงทะเบียน', 'ข้อความที่จะแสดงเมื่อการลงทะเบียนยังไม่เริ่มต้น', 1, NOW(), NOW());
