#!/bin/bash
# Check if forms routes are registered

echo "Checking forms routes..."
php artisan route:list --path=forms

echo ""
echo "Checking all API routes..."
php artisan route:list --path=api
