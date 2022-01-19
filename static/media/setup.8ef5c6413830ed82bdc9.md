# Required software
-   Apache2
-   Php 7 or 8
-   Javascript


## Installation on MAC OSX  

-   **Install PHP on Mac**
    ```
    brew install php
    php -version
    ```
    
- Install Apache Service on Mac
    -   Install httpd
        ```
        brew install httpd
        brew services start httpd        
        brew services list
        ```
    
    -   **Update configuration --**  _Path may vary on httpt installation_
    
        ```
        sudo vi /usr/local/etc/httpd/httpd.conf
        or sudo vi /opt/homebrew/etc/httpd/httpd.conf
        ```      
        -   Listen 80
        -   LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
        -   User ***** (via command line: ls -lh)
        -   Group ***** (via command line: ls -lh)
        
        -   The following paths must be altered to be exact as in your computer
            -   DocumentRoot "/****/var/www"  
            -   Directory "/****/var/www"  
            -   ServerRoot "/*****/opt/httpd". 
            -   LoadModule php_module "*******/lib/httpd/modules/libphp.so"
            -   ServerName localhost

        -   Adding php module - https://php.watch/versions/8.0/mod_php-rename    
            ```
            <IfModule php_module> 
            DirectoryIndex index.html default.php index.php 
            AddHandler application/x-httpd-php .php
            </IfModule>
            ```

    -  **restart httpd**
    ```
    brew services restart httpd     
    ```
    -  **start apache web service**
    ```
    sudo apachectl start 
    ```


## Installation on Ubuntu 20.04
-   The guide of [install the apapche2 on ubuntu20.04](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04).
-   Install Php7.4
    -   The reference link of [install php7.4 for ubunutu20.04](https://linuxize.com/post/how-to-install-php-on-ubuntu-20-04/)
    -   command lines:
        ``` 
        sudo apt install php libapache2-mod-php
        sudo systemctl restart apache2 
        ```
        
  
