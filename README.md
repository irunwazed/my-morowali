# Website Microservices Morowali

## hosting
open port 
```
sudo ufw allow 8080
ufw allow 'Nginx Full'
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