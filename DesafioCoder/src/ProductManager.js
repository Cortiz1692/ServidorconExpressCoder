const fs = require('fs');

class ProductManager {


  constructor(path) {
    this.path = path;
  }


  addProduct(product) {
    const products = this.getProducts();
    const newProduct = { ...product, id: this.generateId() };
    products.push(newProduct);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(product => String(product.id) === String(id));
  
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    return product;
  }
  

  updateProduct(updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(product => product.id !== id);
    this.saveProducts(products);
  }

  generateId() {
    const products = this.getProducts();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');
  }
}

module.exports = ProductManager;
// Instancia de "ProductManager"
// const productManager = new ProductManager('products.json');

// Llamar a "getProducts" recién creada la instancia
// const emptyProducts = productManager.getProducts();
// console.log(emptyProducts); // []

// Llamar al método "addProduct" con los campos especificados
// const newProduct = {
//   title: 'Papas Fritas',
//   description: 'Lays',
//   price: 200,
//   thumbnail: 's/i',
//   code: 'a11',
//   stock: 1580};
// productManager.addProduct(newProduct);


// // Llamar al método "getProducts" nuevamente
// const products = productManager.getProducts();
//  console.log(products);

// // Llamar al método "getProductById" con el id del producto recién agregado
// const lastProduct = products[products.length - 1]; // Obtener el último producto del arreglo

// if (lastProduct) {
//   const productId = lastProduct.id; // Obtener el ID del último producto
//   const productById = productManager.getProductById(productId);
//   console.log(productById);
// } else {
//   console.log('No se encontraron productos en el arreglo.');
// }

// // Llamar al método "updateProduct" para cambiar un campo del producto
// const productId = 5; 
// const productById = productManager.getProductById(productId);

// if (productById) {
//   const updatedProduct = {
//     ...productById,
//     title: 'Nuevo algodon', // Reemplaza "Nuevo título" con el nuevo valor del campo que deseas cambiar
//   };
//   productManager.updateProduct(updatedProduct);
//   console.log(updatedProduct);
// } else {
//   console.log('El producto con el ID especificado no existe.');
// }

// // Obtener los productos después de la actualización
// const productsAfterUpdate = productManager.getProducts();
// console.log(productsAfterUpdate);

// // Llamar al método "deleteProduct" para eliminar el producto
  // const productId = 4; 
  // productManager.deleteProduct(productId);

// // Obtener los productos después de la eliminación
// const productsAfterDeletion = productManager.getProducts();
// console.log(productsAfterDeletion);




