# Social Meta Tags Guide

## การสร้าง Social Meta Tags สำหรับแชร์ลิงก์

เมื่อคุณแชร์ลิงก์เว็บไซต์ไปยังโซเชียลมีเดียต่างๆ เช่น Facebook, Twitter, Line, WhatsApp ระบบจะดึงข้อมูลจาก Meta Tags ใน HTML มาแสดงเป็นตัวอย่างลิงก์

## 📋 สิ่งที่แสดงเมื่อแชร์

```
┌─────────────────────────────────────┐
│  [Image Preview]                    │
│                                     │
│  Title (ชื่อหน้า)                  │
│  Description (คำอธิบายสั้นๆ)        │
│  example.com (URL)                  │
└─────────────────────────────────────┘
```

## 🎯 การใช้งาน

### 1. Blade Component (แนะนำ)

```blade
<x-social-meta
    title="ชื่อหน้าของคุณ"
    description="คำอธิบายที่จะแสดง"
    image="https://example.com/image.jpg"
    url="https://example.com/page-url"
    type="website"
    locale="th_TH"
/>
```

### 2. พารามิเตอร์ทั้งหมด

```blade
<x-social-meta
    {{-- ข้อมูลพื้นฐาน --}}
    title="ชื่อหน้า"
    description="คำอธิบาย"
    
    {{-- รูปภาพ (แนะนำขนาด 1200x630 px) --}}
    image="https://example.com/og-image.jpg"
    imageWidth="1200"
    imageHeight="630"
    
    {{-- URL และประเภท --}}
    url="https://example.com/current-page"
    type="website" {{-- หรือ article --}}
    siteName="ชื่อเว็บไซต์"
    locale="th_TH"
    
    {{-- Twitter เฉพาะ --}}
    twitterCard="summary_large_image"
    twitterSite="@twitterhandle"
    twitterCreator="@creatorhandle"
    
    {{-- บทความ (ถ้า type = article) --}}
    publishedTime="2025-03-24T10:00:00+07:00"
    modifiedTime="2025-03-24T12:00:00+07:00"
    author="ชื่อผู้เขียน"
    section="หมวดหมู่"
    tags=["tag1", "tag2", "tag3"]
    
    {{-- อื่นๆ --}}
    favicon="/favicon.ico"
    themeColor="#ffffff"
    canonical="https://example.com/canonical-url"
/>
```

### 3. ตัวอย่างการใช้งานจริง

#### หน้าแรก
```blade
<x-social-meta
    title="Survey - แพลตฟอร์มสำรวจออนไลน์"
    description="สร้างแบบสำรวจออนไลน์ได้ง่ายๆ ในไม่กี่นาที"
    image="{{ asset('images/og-home.jpg') }}"
    type="website"
/>
```

#### หน้าบทความ
```blade
<x-social-meta
    title="{{ $article->title }}"
    description="{{ Str::limit($article->content, 150) }}"
    image="{{ asset('storage/' . $article->featured_image) }}"
    type="article"
    publishedTime="{{ $article->published_at }}"
    author="{{ $article->author->name }}"
    tags="{{ $article->tags->pluck('name')->toArray() }}"
/>
```

#### หน้าผลิตภัณฑ์
```blade
<x-social-meta
    title="{{ $product->name }}"
    description="{{ $product->description }}"
    image="{{ asset('storage/' . $product->image) }}"
    type="product"
    url="{{ route('products.show', $product->id) }}"
/>
```

## 📱 แพลตฟอร์มที่รองรับ

### 1. **Facebook**
- ใช้ Open Graph Protocol
- รูปภาพแนะนำ: 1200 x 630 px
- อัปเดต: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### 2. **Twitter**
- ใช้ Twitter Cards
- รูปภาพแนะนำ: 1200 x 628 px (summary_large_image)
- อัปเดต: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 3. **Line**
- ใช้ Open Graph เช่นเดียวกับ Facebook
- รูปภาพแนะนำ: 1200 x 630 px

### 4. **WhatsApp**
- ใช้ Open Graph
- รูปภาพแนะนำ: 1200 x 627 px

### 5. **LinkedIn**
- ใช้ Open Graph
- รูปภาพแนะนำ: 1200 x 627 px

## 🛠️ การตั้งค่าใน config/app.php

```php
'default_social_meta' => [
    'title' => env('APP_NAME', 'Survey'),
    'description' => env('APP_DESCRIPTION', 'Survey Application'),
    'image' => env('DEFAULT_OG_IMAGE', '/og-image.jpg'),
    'twitter_site' => env('TWITTER_SITE', '@yourhandle'),
    'locale' => 'th_TH',
],
```

## 🎨 การสร้างรูปภาพ OG

### ขนาดที่แนะนำ
- **Facebook/Line/LinkedIn**: 1200 x 630 px
- **Twitter**: 1200 x 628 px
- **Minimum**: 600 x 315 px
- **Format**: JPG หรือ PNG
- **Size**: ไม่เกิน 5 MB

### เครื่องมือสร้าง
- [Canva](https://www.canva.com/) - มีเทมเพลต OG Image
- [Figma](https://figma.com/)
- [Adobe Spark](https://spark.adobe.com/)

## 🧪 การทดสอบ

### 1. Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
ใส่ URL ของคุณเพื่อดูว่า Facebook เห็นอะไร

### 2. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```

### 3. Line It Button Checker
```
https://developers.line.biz/en/docs/line-login/integrate-line-login/
```

### 4. Meta Tags Inspector (ทั่วไป)
```
https://www.metatags.io/
```

## 🔄 การเคล็ดลับแคช

เมื่ออัปเดต Meta Tags แล้ว แต่แชร์แล้วยังไม่เปลี่ยน:

### Facebook
```
https://developers.facebook.com/tools/debug/?q=YOUR_URL
```
กด "Scrape Again"

### Line
Line จะแคชค่อนข้างนาน รอประมาณ 1-2 ชั่วโมง หรือเปลี่ยน URL

## 📝 ตัวอย่างใน Controller

```php
public function show($slug)
{
    $article = Article::where('slug', $slug)->firstOrFail();
    
    $metaData = socialMeta([
        'title' => $article->title,
        'description' => Str::limit($article->content, 150),
        'image' => asset('storage/' . $article->featured_image),
        'type' => 'article',
        'publishedTime' => $article->published_at->toIso8601String(),
        'author' => $article->author->name,
        'tags' => $article->tags->pluck('name')->toArray(),
    ]);
    
    return view('articles.show', compact('article', 'metaData'));
}
```

## 🔗 ทรัพยากรเพิ่มเติม

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters/)
- [Schema.org JSON-LD](https://schema.org/docs/gs.html)

## ✅ Checklist

- [ ] ตั้งค่า title ไม่เกิน 60 ตัวอักษร
- [ ] ตั้งค่า description 150-160 ตัวอักษร
- [ ] รูปภาพขนาด 1200x630 px ขึ้นไป
- [ ] ใช้ absolute URL สำหรับรูปภาพ
- [ ] ตั้งค่า canonical URL
- [ ] ทดสอบด้วย Facebook Debugger
- [ ] ทดสอบด้วย Twitter Validator
- [ ] ตรวจสอบ JSON-LD Schema
