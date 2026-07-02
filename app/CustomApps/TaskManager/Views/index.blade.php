<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Task Manager</h1>
                <p class="text-gray-600 mt-1">จัดการงานเฉพาะกิจ</p>
            </div>
            <a href="{{ route('app.task-manager.create') }}"
               class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <span class="mr-2">+</span> สร้างงานใหม่
            </a>
        </div>

        @if (session('success'))
            <div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                {{ session('success') }}
            </div>
        @endif

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <div class="flex gap-4">
                    <input type="text" placeholder="ค้นหางาน..."
                           class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                        <option value="">ทุกสถานะ</option>
                        <option value="pending">รอดำเนินการ</option>
                        <option value="in_progress">กำลังดำเนินการ</option>
                        <option value="completed">เสร็จแล้ว</option>
                    </select>
                    <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                        <option value="">ทุกระดับ</option>
                        <option value="low">ต่ำ</option>
                        <option value="medium">กลาง</option>
                        <option value="high">สูง</option>
                    </select>
                </div>
            </div>

            <div class="divide-y divide-gray-100">
                <div class="p-6 text-center text-gray-500">
                    <p class="text-lg mb-2">ยังไม่มีงาน</p>
                    <p class="text-sm">คลิก "สร้างงานใหม่" เพื่อเพิ่มงานแรกของคุณ</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
