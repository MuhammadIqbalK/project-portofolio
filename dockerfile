FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip \
    libpng-dev libonig-dev libxml2-dev \
    libpq-dev \
    default-mysql-client \
    gnupg

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd 

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Map www-data to host uid/gid 1000 so bind-mounted files stay writable
RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data \
    && sed -i "s/^listen = 9000/listen = 9001/" /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www

CMD ["php-fpm"]

EXPOSE 9001
