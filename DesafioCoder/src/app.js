const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('products.json');

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    let products;

    if (limit) {
      products = await productManager.getProducts();
      products = products.slice(0, limit);
    } else {
      products = await productManager.getProducts();
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;

  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Iniciar el servidor

  app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
  });

