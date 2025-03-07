const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { stringify } = require("querystring");
const port = 8080;

const server = http.createServer((req, res) => {
  cors()(req, res, () => {
    res.writeHead(200, { "Content-Type": "text/plain" });

    if (req.method === "GET" && req.url === "/product") {
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          res.end(err);
        } else {
          res.end(data);
        }
      });
    } else if (req.method === "POST" && req.url === "/Addproduct") {
      let str = "";

      req.on("data", (chunk) => {
        str += chunk;
      });

      req.on("end", () => {
        console.log(str);

        const productData = JSON.parse(str);

        fs.readFile("./db.json", "utf-8", (err, data) => {
          if (err) {
            res.end(err);
          } else {
            const newdata = JSON.parse(data);
            newdata.products.push({ ...productData, id: Date.now() });

            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
              if (err) {
                res.end("Error saving data");
              } else {
                res.end("Product added successfully");
              }
            });
          }
        });
      });
    } else if (
      req.method === "DELETE" &&
      req.url.startsWith("/deleteproduct/")
    ) {
      const newid = req.url.split("/")[2];
      console.log(newid);

      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          res.end(err);
        } else {
          const upddatproduct = JSON.parse(data);
          const filterdata = upddatproduct.products.filter(
            (el) => el.id != newid
          );
          console.log(filterdata);

          fs.writeFile(
            "./db.json",
            JSON.stringify({ products: filterdata }),
            (err) => {
              if (err) {
                res.end(err);
              } else {
                console.log("data delete");
                res.end("your product delete");
              }
            }
          );
        }
      });
    } else if (req.method === "GET" && req.url.startsWith("/discription/")) {
      const newid = req.url.split("/")[2];
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          const { products } = JSON.parse(data);
          const filteridata = products.filter((el) => el.id == newid);
          res.end(JSON.stringify(filteridata[0] || {}));
        }
      });
    } else if (req.method === "PUT" && req.url.startsWith("/updateproduct/")) {
      const id = req.url.split("/")[2];
      let str = "";

      req.on("data", (chunk) => {
        str += chunk;
      });

      req.on("end", () => {
        const updatedProduct = JSON.parse(str);

        fs.readFile("./db.json", "utf-8", (err, data) => {
          if (err) {
            res.end(JSON.stringify({ error: "Error reading database" }));
          } else {
            const db = JSON.parse(data);
            const productIndex = db.products.findIndex((p) => p.id == id);

            if (productIndex === -1) {
              res.end(JSON.stringify({ error: "Product not found" }));
            } else {
              db.products[productIndex] = {
                ...db.products[productIndex],
                ...updatedProduct,
              };

              fs.writeFile("./db.json", JSON.stringify(db), (err) => {
                if (err) {
                  res.end(JSON.stringify({ error: "Error updating product" }));
                } else {
                  res.end(JSON.stringify({ message: "Product updated successfully" }));
                }
              });
            }
          }
        });
      });
    } else {
      res.end("Endpoint not matched");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
