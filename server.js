import express from "express";

const app = express();
app.use(express.json());

const HOST = "localhost";
const PORT = 8000;

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 1500,
    category: "Electronics",
    image: "",
  },
  {
    id: 2,
    name: "bed",
    price: 10000,
    category: "furniture",
    image: "",
  },
];

async function addProduct(product, fail = false) {
  return new Promise((resolve, reject) => {
    if (fail) {
      reject(new Error("Failed to save product"));
      return;
    }

    products = [...products, product];

    resolve(product);
  });
}

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/products", async (req, res) => {
  const { name, price, category, image = "" } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    price <= 0 ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    return res.status(422).json({
      message: "Invalid product data",
    });
  }

  const productExists = products.some(
    (product) => product.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (productExists) {
    return res.status(409).json({
      message: "This name is already taken",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name: name.trim(),
    price: price,
    category: category.trim(),
    image: image,
  };

  try {
    const result = await addProduct(
      newProduct,
      req.query.fail === "true"
    );

    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});