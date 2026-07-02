<?php

namespace App\CustomApps;

use Illuminate\Support\Facades\Route;

abstract class CustomApp
{
    protected string $name;

    protected string $description;

    protected string $version = '1.0.0';

    protected string $icon = 'apps';

    protected array $middleware = [];

    abstract public function registerRoutes(): void;

    abstract public function menu(): array;

    public function name(): string
    {
        return $this->name;
    }

    public function description(): string
    {
        return $this->description;
    }

    public function version(): string
    {
        return $this->version;
    }

    public function icon(): string
    {
        return $this->icon;
    }

    public function middleware(): array
    {
        return $this->middleware;
    }

    public function permissions(): array
    {
        return [];
    }

    public function getRoutesPath(): ?string
    {
        $reflection = new \ReflectionClass($this);
        $dir = dirname($reflection->getFileName());

        $path = $dir . '/Routes/web.php';

        return file_exists($path) ? $path : null;
    }

    public function getViewsPath(): ?string
    {
        $reflection = new \ReflectionClass($this);
        $dir = dirname($reflection->getFileName());

        $path = $dir . '/Views';

        return is_dir($path) ? $path : null;
    }
}
