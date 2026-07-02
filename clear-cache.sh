#!/bin/bash
# Clear all Laravel caches and optimize

echo "Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Done!"
