-- Forms and Submissions Tables Migration
-- Run this in phpMyAdmin or MySQL command line

-- Forms table - stores form schema and settings
CREATE TABLE IF NOT EXISTS `forms` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `schema` json NOT NULL,
  `settings` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `published_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forms_uuid_unique` (`uuid`),
  KEY `forms_is_active_index` (`is_active`),
  KEY `forms_published_at_index` (`published_at`),
  KEY `forms_created_by_foreign` (`created_by`),
  CONSTRAINT `forms_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Form submissions table - stores individual submissions
CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` bigint UNSIGNED NOT NULL,
  `responses` json NOT NULL,
  `respondent_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `respondent_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `respondent_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_submissions_form_id_foreign` (`form_id`),
  KEY `form_submissions_created_at_index` (`created_at`),
  KEY `form_submissions_is_read_index` (`is_read`),
  CONSTRAINT `form_submissions_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Form analytics table - tracks views and completions
CREATE TABLE IF NOT EXISTS `form_analytics` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` bigint UNSIGNED NOT NULL,
  `event_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metadata` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `form_analytics_form_id_foreign` (`form_id`),
  KEY `form_analytics_event_type_index` (`event_type`),
  CONSTRAINT `form_analytics_form_id_foreign` FOREIGN KEY (`form_id`) REFERENCES `forms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
