# Social Meta Tags Implementation

## ✅ สิ่งที่สร้างแล้วเสร็จ

### 1. ไฟล์ที่สร้าง
```
├── resources/views/components/social-meta.blade.php    (Component หลัก)
├── app/Http/Controllers/MetaTagController.php          (Controller จัดการ meta tags)
├── app/Helpers/SocialMetaHelper.php                    (Helper function)
├── routes/web.php                                       (อัปเดต routes)
├── resources/views/app.blade.php                        (อัปเดต layout)
└── SOCIAL_META_TAGS_GUIDE.md                            (คู่มือภาษาไทย)
```

## 🎯 การทำงาน

### สำหรับหน้าแบบสำรวจ (Forms)
```
URL: https://survey.pcru.ac.th/forms/58bd4b53-da5d-4e11-8053-b1bf9efcab5c

Meta Tags ที่สร้าง:
- title: "Survey Form"
- description: "Complete this survey form"
- url: "https://survey.pcru.ac.th/forms/58bd4b53-da5d-4e11-8053-b1bf9efcab5c"
- type: "website"
```

### สำหรับหน้าแรก
```
URL: https://survey.pcru.ac.th/

Meta Tags ที่สร้าง:
- title: "Survey - แพลตฟอร์มสำรวจออนไลน์"
- description: "สร้างแบบสำรวจออนไลน์ได้ง่ายๆ ในไม่กี่นาที"
- url: "https://survey.pcru.ac.th/"
- type: "website"
```

## 📱 แพลตฟอร์มที่รองรับ

เมื่อแชร์ลิงก์ จะแสดงตัวอย่างใน:
- ✅ **Facebook** - Open Graph Protocol
- ✅ **Twitter** - Twitter Cards
- ✅ **Line** - Open Graph Protocol
- ✅ **WhatsApp** - Open Graph Protocol
- ✅ **LinkedIn** - Open Graph Protocol
- ✅ **Telegram** - Open Graph Protocol

## 🔧 วิธีใช้งาน

### 1. อัปเดต MetaTagController

เปิด `app/Http/Controllers/MetaTagController.php` และแก้ไขดึงข้อมูลจาก database:

```php
public function form($uuid)
{
    // ตัวอย่าง: ดึงข้อมูลจาก forms table
    $form = DB::table('forms')->where('uuid', $uuid)->first();
    
    if ($form) {
        $metaData = [
            'title' => $form->name . ' - Survey',
            'description' => Str::limit($form->description ?? 'Complete this survey', 150),
            'image' => $form->image ? asset('storage/' . $form->image) : asset('og-image.jpg'),
            'type' => 'website',
            'url' => url()->current(),
            'locale' => 'th_TH',
        ];
    }
    
    return view('app', compact('metaData'));
}
```

### 2. สร้างรูปภาพ OG Image

สร้างรูปภาพขนาด **1200 x 630 px** และบันทึกที่:
```
public/og-image.jpg
```

หรืออัปเดต path ใน `.env`:
```env
DEFAULT_OG_IMAGE=https://survey.pcru.ac.th/images/og-default.jpg
```

### 3. ทดสอบ

#### Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
ใส่ URL: `https://survey.pcru.ac.th/forms/58bd4b53-da5d-4e11-8053-b1bf9efcab5c`

#### Line It Button Checker
```
https://developers.line.biz/en/docs/line-login/integrate-line-login/
```

## 🎨 ตัวอย่างการแสดงผล

### Facebook/Line/WhatsApp
```
┌─────────────────────────────────────┐
│                                     │
│         [รูปภาพ 1200x630]           │
│                                     │
├─────────────────────────────────────┤
│ Survey Form                         │
│ Complete this survey form           │
│ survey.pcru.ac.th                   │
└─────────────────────────────────────┘
```

### Twitter (Summary Large Image)
```
┌─────────────────────────────────────┐
│                                     │
│         [รูปภาพ 1200x628]           │
│                                     │
├─────────────────────────────────────┤
│ Survey Form                         │
│ Complete this survey form           │
│ survey.pcru.ac.th                   │
└─────────────────────────────────────┘
```

## 📋 Checklist

- [ ] สร้างรูปภาพ OG Image (1200x630 px)
- [ ] อัปโหลดรูปภาพไปที่ `public/og-image.jpg`
- [ ] อัปเดต MetaTagController เพื่อดึงข้อมูลจาก database
- [ ] ทดสอบด้วย Facebook Debugger
- [ ] ทดสอบด้วย Line
- [ ] ทดสอบด้วย Twitter Card Validator

## 🔗 ลิงก์ทดสอบ

1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **Meta Tags Inspector**: https://www.metatags.io/
4. **Line**: แชร์ลิงก์ใน Line แอป

## 🚀 การเคลียร์แคช

หากรีเฟรชแล้วไม่เปลี่ยน:

### Facebook
```
1. เข้า https://developers.facebook.com/tools/debug/
2. ใส่ URL ของคุณ
3. กด "Scrape Again"
```

### Line
Line จะแคชค่อนข้างนาน (1-2 ชั่วโมง) รอหรือเปลี่ยน URL

## 📞 ติดต่อ/คำถาม

ดูคู่มือเพิ่มเติมที่: `SOCIAL_META_TAGS_GUIDE.md`
