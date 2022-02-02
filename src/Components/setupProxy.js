
const proxy = require("http-proxy-middleware");

export default function(app) {
  app.use(
    proxy("/api/collections", {
      target: "https://georgeeliotarchive.org",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    proxy("/api/resources", {
      target: "https://georgeeliotarchive.org",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/users", {
      target: "https://jsonplaceholder.typicode.com",
      secure: false,
      changeOrigin: true
    })
  );
}





