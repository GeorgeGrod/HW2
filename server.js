import express from "express";

const app = express();
const PORT = 8000;
const HOST = 'localhost'

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        category: "electronics"
    },
    {
        id: 2,
        name: "Phone",
        price: 800,
        category: "electronics"
    },
    {
        id: 3,
        name: "Chair",
        price: 150,
        category: "furniture"
    },
    {
        id: 4,
        name: "Table",
        price: 300,
        category: "furniture"
    },
    {
        id: 5,
        name: "Headphones",
        price: 100,
        category: "electronics"
    }
];

app.get("/products", (req, res) => {
    const { category, take } = req.query;

    let product = [...products];

    if (category) {
        product = product.filter(product => product.category === category);
    }

    if (!take) {
        return res.status(200).json(product);
    }

    const numTake = Number(take);

    if (!Number.isInteger(numTake)) {
        return res.status(400).json({
            message: "The take must be an integer"
        });
    }

    product = product.slice(0, numTake);

    return res.status(200).json(product);
});


app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Id must be an integer"
        });
    }

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json(product);
});


app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});

