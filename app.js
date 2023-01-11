const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const manager = new ProductManager();

manager.addProduct('Producto 1', 'Descripcion 1', 10, 'path/to/thumbnail1', 'code1', 10);
manager.addProduct('Producto 2', 'Descripcion 2', 15, 'path/to/thumbnail2', 'code2', 15);
manager.addProduct('Producto 3', 'Descripcion 3', 20, 'path/to/thumbnail3', 'code3', 20);
manager.addProduct('Producto 4', 'Descripcion 4', 25, 'path/to/thumbnail3', 'code4', 25);

app.get('/products', (req, res) => {
    let products = manager.getProducts();
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit)) {
        products = products.slice(0, limit);
    }
    res.json({ products });
});

app.get('/products/:pid', (req, res) => {
    const product = manager.getProductById(parseInt(req.params.pid));
    if (product) {
        res.json({ product });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
})
