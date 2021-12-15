[Go back](readme)
# Setup environement for development
-   Apache2
-   php 7 or 8
-   javascript


## MAC OSX 
- Install Apache Service on Mac
    -   Install httpd
    ````
          brew install httpd
          brew services start hpptd
          brew services list
    ````
    

    -   Update configuration
    ```
    sudo vi /usr/local/etc/httpd/httpd.conf
    ```   
        - Listen 80
        - LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
        - User ***** (via command line: ls -lh)
        - Group ***** (via command line: ls -lh)
        - DocumentRoot "/usr/local/var/www"  (Alter it to the corrent)
        - Directory "/usr/local/var/www    (Alter it to the corrent)
        - ServerRoot "/usr/local/opt/httpd"
        - LoadModule php_module "/usr/local/opt/php/lib/httpd/modules/libphp.so"

        - https://php.watch/versions/8.0/mod_php-rename    
            ```
            <IfModule php_module\> 
            DirectoryIndex index.html default.php index.php 
            AddHandler application/x-httpd-php .php
            ```

    -  restart httpd 
    ```
    brew services restart httpd     
    ```

-   Install PHP on Mac
    ```
    brew install php
    php -version
    ```

## Ubunto 20.04
-   The guide of [install the apapche2 on ubuntu20.04](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04).
-   Install Php7.4
    -   The reference link of [install php7.4 for ubunutu20.04](https://linuxize.com/post/how-to-install-php-on-ubuntu-20-04/)
    -   command lines:
        ``` 
        sudo apt install php libapache2-mod-php
        sudo systemctl restart apache2 
        ```
        
  
