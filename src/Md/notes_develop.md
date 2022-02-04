## Notes for development

1.  CORS Issue solution: <strong> Feb 3, 2000  </strong>
    adding the headers to *".htaccess"*
    ```
    Header add Access-Control-Allow-Origin "*"
    Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"  
    ```