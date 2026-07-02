<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class RegistrationSetting extends Model
{
    use HasFactory;

      protected $connection = 'mysql';
      
    protected $fillable = [
        'key',
        'value',
        'type',
        'label',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get setting value by key
     */
    public static function get(string $key, $default = null)
    {
        $setting = Cache::remember("registration_setting.{$key}", 3600, function () use ($key) {
            return static::where('key', $key)->where('is_active', true)->first();
        });

        if (!$setting) {
            return $default;
        }

        return self::castValue($setting->value, $setting->type);
    }

    /**
     * Set setting value by key
     */
    public static function set(string $key, $value): bool
    {
        $setting = static::where('key', $key)->first();

        if (!$setting) {
            return false;
        }

        $setting->update(['value' => $value]);
        Cache::forget("registration_setting.{$key}");

        return true;
    }

    /**
     * Cast value based on type
     */
    private static function castValue($value, string $type)
    {
        return match ($type) {
            'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'datetime' => $value ? new \DateTime($value) : null,
            'number' => (float) $value,
            default => $value,
        };
    }

    /**
     * Check if registration is currently available
     */
    public static function isRegistrationOpen(): bool
    {
        if (!self::get('registration_enabled', true)) {
            return false;
        }

        $now = now();
        $startDate = self::get('registration_start_date');
        $endDate = self::get('registration_end_date');

        if ($startDate && $now < $startDate) {
            return false;
        }

        if ($endDate && $now > $endDate) {
            return false;
        }

        return true;
    }

    /**
     * Get registration status
     */
    public static function getRegistrationStatus(): array
    {
        $enabled = self::get('registration_enabled', true);
        $startDate = self::get('registration_start_date');
        $endDate = self::get('registration_end_date');
        $now = now();

        if (!$enabled) {
            return [
                'status' => 'closed',
                'message' => self::get('registration_closed_message', 'การลงทะเบียนถูกปิดใช้งาน'),
            ];
        }

        if ($startDate && $now < $startDate) {
            return [
                'status' => 'not_started',
                'message' => self::get('registration_not_yet_message', 'การลงทะเบียนจะเปิดเร็วๆ นี้'),
                'start_date' => $startDate->format('Y-m-d H:i:s'),
            ];
        }

        if ($endDate && $now > $endDate) {
            return [
                'status' => 'ended',
                'message' => self::get('registration_closed_message', 'ขออภัย การลงทะเบียนได้สิ้นสุดลงแล้ว'),
                'end_date' => $endDate->format('Y-m-d H:i:s'),
            ];
        }

        return [
            'status' => 'open',
            'message' => 'ลงทะเบียนได้ทันที',
            'start_date' => $startDate?->format('Y-m-d H:i:s'),
            'end_date' => $endDate?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get all settings for admin
     */
    public static function getAllSettings(): array
    {
        return Cache::remember('registration_settings.all', 3600, function () {
            return static::where('is_active', true)
                ->orderBy('label')
                ->get()
                ->map(function ($setting) {
                    return [
                        'key' => $setting->key,
                        'value' => $setting->value,
                        'type' => $setting->type,
                        'label' => $setting->label,
                        'description' => $setting->description,
                    ];
                })
                ->toArray();
        });
    }

    /**
     * Clear cache
     */
    public static function clearCache(): void
    {
        Cache::forget('registration_settings.all');
        
        $settings = static::all();
        foreach ($settings as $setting) {
            Cache::forget("registration_setting.{$setting->key}");
        }
    }
}