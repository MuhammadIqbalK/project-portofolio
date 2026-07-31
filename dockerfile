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
    gd \
    pdo_sqlite \ 
    sqlite3

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Run php-fpm as root so mounted host files (owned by uid 1000) stay writable
RUN sed -i "s/^user = www-data/user = root/" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/^group = www-data/group = root/" /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www

CMD ["php-fpm"]

EXPOSE 9000
