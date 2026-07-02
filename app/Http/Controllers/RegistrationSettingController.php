<?php

namespace App\Http\Controllers;

use App\Models\RegistrationSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;

class RegistrationSettingController extends Controller
{
    /**
     * Display registration status
     */
    public function status()
    {
        $status = RegistrationSetting::getRegistrationStatus();
        
        return response()->json([
            'success' => true,
            'data' => $status,
        ]);
    }

    /**
     * Display all settings (for admin)
     */
    public function index()
    {
        $settings = RegistrationSetting::getAllSettings();
        
        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Update setting value
     */
    public function update(Request $request, $key)
    {
        $setting = RegistrationSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'ไม่พบการตั้งค่า',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'value' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $value = $request->value;

        // Validate datetime format if type is datetime
        if ($setting->type === 'datetime') {
            $dateTime = \DateTime::createFromFormat('Y-m-d\TH:i', $value);
            if (!$dateTime) {
                $dateTime = \DateTime::createFromFormat('Y-m-d H:i:s', $value);
            }
            if (!$dateTime) {
                return response()->json([
                    'success' => false,
                    'message' => 'รูปแบบวันที่และเวลาไม่ถูกต้อง (ใช้รูปแบบ Y-m-d H:i:s หรือ Y-m-d\TH:i)',
                ], 422);
            }
            $value = $dateTime->format('Y-m-d H:i:s');
        }

        // Validate boolean if type is boolean
        if ($setting->type === 'boolean') {
            $value = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
        }

        RegistrationSetting::set($key, $value);
        RegistrationSetting::clearCache();

        return response()->json([
            'success' => true,
            'message' => 'อัปเดตการตั้งค่าสำเร็จ',
            'data' => [
                'key' => $key,
                'value' => $value,
            ],
        ]);
    }

    /**
     * Bulk update settings
     */
    public function bulkUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'settings' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $updated = [];
        $failed = [];

        foreach ($request->settings as $settingData) {
            if (!isset($settingData['key']) || !isset($settingData['value'])) {
                continue;
            }

            $setting = RegistrationSetting::where('key', $settingData['key'])->first();
            
            if (!$setting) {
                $failed[] = $settingData['key'];
                continue;
            }

            $value = $settingData['value'];

            if ($setting->type === 'datetime') {
                $dateTime = \DateTime::createFromFormat('Y-m-d\TH:i', $value);
                if (!$dateTime) {
                    $dateTime = \DateTime::createFromFormat('Y-m-d H:i:s', $value);
                }
                if (!$dateTime) {
                    $failed[] = $settingData['key'];
                    continue;
                }
                $value = $dateTime->format('Y-m-d H:i:s');
            }

            if ($setting->type === 'boolean') {
                $value = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
            }

            RegistrationSetting::set($settingData['key'], $value);
            $updated[] = $settingData['key'];
        }

        RegistrationSetting::clearCache();

        return response()->json([
            'success' => true,
            'message' => 'อัปเดตการตั้งค่าสำเร็จ',
            'data' => [
                'updated' => $updated,
                'failed' => $failed,
            ],
        ]);
    }

    /**
     * Refresh cache
     */
    public function refreshCache()
    {
        RegistrationSetting::clearCache();
        
        return response()->json([
            'success' => true,
            'message' => 'ล้างแคชสำเร็จ',
        ]);
    }
}
