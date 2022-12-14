# Website Microservices Morowali

## hosting
open port 
```
sudo ufw allow 8080
ufw allow 'Nginx Full'

sudo lsof -i:80
sudo lsof -i -P -n
```

## perbaikan package lama
```
npm install --package-lock-only
```


## buat ssh-keygen dari ssh
```
ssh-keygen -t rsa -b 4096 -m PEM -C "my-morowali"
```

## simpan ssh.pub
```
code ~/.ssh/authorized_keys
```

## kill port
```
sudo fuser -k 80/tcp
```


## NGINX LARAVEL
```
server {
    listen 80;
    server_name malte.italoborg.es;
    root /home/italo/www/malte.italoborg.es/public;

    charset utf-8;

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /home/log/nginx/malte.italoborg.es-error.log error;
    error_page 404 /index.php;
    sendfile off;

    # Point index to the Laravel front controller.
    index index.php;

    location / {
            try_files $uri $uri/ /index.php;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        #deny all;
    }
}
```
https://upcloud.com/resources/tutorials/troubleshoot-linux-memory-issues
