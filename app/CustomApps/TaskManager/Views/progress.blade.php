<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ติดตามความคืบหน้า - Task Manager</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4">
        <div class="mb-8">
            <a href="{{ route('app.task-manager.index') }}"
               class="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; กลับไปหน้ารายการ</a>
            <h1 class="text-3xl font-bold text-gray-900">ติดตามความคืบหน้า</h1>
        </div>

        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div class="text-sm text-gray-500 mb-1">รอดำเนินการ</div>
                <div class="text-3xl font-bold text-yellow-600">0</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div class="text-sm text-gray-500 mb-1">กำลังดำเนินการ</div>
                <div class="text-3xl font-bold text-blue-600">0</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div class="text-sm text-gray-500 mb-1">เสร็จแล้ว</div>
                <div class="text-3xl font-bold text-green-600">0</div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">ภาพรวมความคืบหน้า</h2>
            <div class="w-full bg-gray-200 rounded-full h-4">
                <div class="bg-indigo-600 h-4 rounded-full" style="width: 0%"></div>
            </div>
            <p class="text-sm text-gray-500 mt-2">ความคืบหน้าโดยรวม: 0%</p>
        </div>
    </div>
</body>
</html>
