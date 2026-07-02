<?php

namespace App\CustomApps;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomAppController extends Controller
{
    public function index(Request $request)
    {
        $apps = app('custom-apps');

        return view('custom-apps::index', compact('apps'));
    }

    public function app(Request $request, string $appName)
    {
        $apps = app('custom-apps');
        $app = $apps[$appName] ?? null;

        if (!$app) {
            abort(404, "App '{$appName}' not found.");
        }

        $view = "app-{$appName}::index";

        return view()->exists($view)
            ? view($view, ['app' => $app])
            : response()->json([
                'app' => $app->name(),
                'description' => $app->description(),
                'version' => $app->version(),
                'menu' => $app->menu(),
            ]);
    }
}
