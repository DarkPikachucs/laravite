<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ประวัติ - Data Report</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4">
        <div class="mb-8">
            <a href="{{ route('app.data-report.index') }}"
               class="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; กลับไปสร้างรายงาน</a>
            <h1 class="text-3xl font-bold text-gray-900">ประวัติการสร้างรายงาน</h1>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="text-left px-6 py-3 text-sm font-medium text-gray-500">วันที่</th>
                        <th class="text-left px-6 py-3 text-sm font-medium text-gray-500">ประเภท</th>
                        <th class="text-left px-6 py-3 text-sm font-medium text-gray-500">รูปแบบ</th>
                        <th class="text-left px-6 py-3 text-sm font-medium text-gray-500">ผู้สร้าง</th>
                        <th class="text-right px-6 py-3 text-sm font-medium text-gray-500">การกระทำ</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                            <p class="text-lg mb-1">ยังไม่มีประวัติ</p>
                            <p class="text-sm">เมื่อคุณสร้างรายงาน ประวัติจะแสดงที่นี่</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
