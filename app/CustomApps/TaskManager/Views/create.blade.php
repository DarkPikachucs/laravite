<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สร้างงานใหม่ - Task Manager</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    <div class="max-w-3xl mx-auto py-8 px-4">
        <div class="mb-8">
            <a href="{{ route('app.task-manager.index') }}"
               class="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">&larr; กลับไปหน้ารายการ</a>
            <h1 class="text-3xl font-bold text-gray-900">สร้างงานใหม่</h1>
        </div>

        <form action="{{ route('app.task-manager.store') }}" method="POST"
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            @csrf

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ชื่องาน</label>
                <input type="text" name="title" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                       placeholder="ระบุชื่องาน">
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียด</label>
                <textarea name="description" rows="4"
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="ระบุรายละเอียดงาน (ถ้ามี)"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">ระดับความสำคัญ</label>
                    <select name="priority" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="low">ต่ำ</option>
                        <option value="medium" selected>กลาง</option>
                        <option value="high">สูง</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">กำหนดส่ง</label>
                    <input type="date" name="due_date"
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
            </div>

            <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <a href="{{ route('app.task-manager.index') }}"
                   class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">ยกเลิก</a>
                <button type="submit"
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">สร้างงาน</button>
            </div>
        </form>
    </div>
</body>
</html>
