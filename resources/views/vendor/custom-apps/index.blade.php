<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Apps</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Custom Applications</h1>
            <p class="text-lg text-gray-600">เลือกแอปพลิเคชันที่ต้องการใช้งาน</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($apps as $app)
                <a href="{{ url('/app/' . $app->name()) }}"
                   class="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100">
                    <div class="flex items-center mb-4">
                        <span class="material-icons text-3xl text-indigo-600 mr-3">{{ $app->icon() }}</span>
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900">{{ $app->name() }}</h2>
                            <span class="text-sm text-gray-500">v{{ $app->version() }}</span>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">{{ $app->description() }}</p>
                    <div class="flex flex-wrap gap-2">
                        @foreach ($app->menu() as $item)
                            <span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                                {{ $item['label'] }}
                            </span>
                        @endforeach
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</body>
</html>
