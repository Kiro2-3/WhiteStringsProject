#!/bin/bash
set -e

# Run Laravel setup
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Create supervisor log directory
mkdir -p /var/log/supervisor

# Start supervisord
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
