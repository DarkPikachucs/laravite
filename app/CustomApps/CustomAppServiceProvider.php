<?php

namespace App\CustomApps;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class CustomAppServiceProvider extends ServiceProvider
{
    private array $apps = [];

    public function register(): void
    {
        $this->discoverApps();

        $this->app->singleton('custom-apps', fn () => $this->apps);
        $this->app->singleton('custom-apps.provider', fn () => $this);
    }

    public function boot(): void
    {
        foreach ($this->apps as $app) {
            $this->registerAppRoutes($app);
            $this->registerAppViews($app);
        }

        $this->loadViewsFrom(__DIR__ . '/../../resources/views/vendor/custom-apps', 'custom-apps');
    }

    private function discoverApps(): void
    {
        $appsPath = __DIR__;
        $directories = glob($appsPath . '/*', GLOB_ONLYDIR);

        foreach ($directories as $dir) {
            $basename = basename($dir);
            $appClass = __NAMESPACE__ . "\\{$basename}\\{$basename}App";

            if (class_exists($appClass) && is_subclass_of($appClass, CustomApp::class)) {
                $instance = $this->app->make($appClass);
                $this->apps[$instance->name()] = $instance;
            }
        }
    }

    private function registerAppRoutes(CustomApp $app): void
    {
        $routesPath = $app->getRoutesPath();

        if ($routesPath) {
            Route::middleware($app->middleware())
                ->name("app.{$app->name()}.")
                ->group($routesPath);
        }
    }

    private function registerAppViews(CustomApp $app): void
    {
        $viewsPath = $app->getViewsPath();

        if ($viewsPath) {
            $this->loadViewsFrom($viewsPath, "app-{$app->name()}");
        }
    }

    public function getApps(): array
    {
        return $this->apps;
    }

    public function getApp(string $name): ?CustomApp
    {
        return $this->apps[$name] ?? null;
    }
}
