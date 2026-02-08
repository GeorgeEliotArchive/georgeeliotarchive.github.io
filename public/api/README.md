# George Eliot Archive CSV API

This is a simple client-side API endpoint for accessing George Eliot Archive CSV data.

## Endpoint

```
https://georgeeliotarchive.github.io/api/csv.html
```

## Parameters

- `searchTerm` (optional): Search term to filter results
- `format` (optional): Response format
  - `csv` (default): Returns raw CSV data
  - `json`: Returns data wrapped in JSON
- `callback` (optional): JSONP callback function name

## Examples

### Get all items from collection 17 (default)
```
https://georgeeliotarchive.github.io/api/csv.html
```

### Search for items containing "1875"
```
https://georgeeliotarchive.github.io/api/csv.html?searchTerm=1875
```

### Get JSON response
```
https://georgeeliotarchive.github.io/api/csv.html?searchTerm=1875&format=json
```

### JSONP request
```
https://georgeeliotarchive.github.io/api/csv.html?searchTerm=1875&callback=myCallback
```

## Response Formats

### CSV Format (default)
Returns raw CSV data with appropriate headers.

### JSON Format
```json
{
  "success": true,
  "data": "CSV data here...",
  "searchTerm": "1875"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "searchTerm": "1875"
}
```

## Usage in Applications

### JavaScript Fetch
```javascript
fetch('https://georgeeliotarchive.github.io/api/csv.html?searchTerm=1875')
  .then(response => response.text())
  .then(csvData => {
    console.log(csvData);
  });
```

### jQuery JSONP
```javascript
$.ajax({
  url: 'https://georgeeliotarchive.github.io/api/csv.html',
  dataType: 'jsonp',
  data: { searchTerm: '1875' },
  success: function(response) {
    if (response.success) {
      console.log(response.data);
    }
  }
});
```

## Notes

- This is a client-side proxy that runs in the browser
- CORS is handled by the browser
- Rate limiting may apply based on georgeeliotarchive.org policies