# Setup environement for development

## Install Apache Service on Mac
-   brew install httpd
-   brew services start hpptd
-   brew services list
-   sudo vi /usr/local/etc/httpd/httpd.conf
    - Listen 80
    - LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
    - User ***** (via command line: ls -lh)
    - Group ***** (via command line: ls -lh)
    - DocumentRoot "/usr/local/var/www"  (must be correct)
    - Directory "/usr/local/var/www    (must be correct)

-   brew services restart httpd     


## Install PHP on Mac
- brew install php
- php -version
  
