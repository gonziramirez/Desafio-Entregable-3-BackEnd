const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que no se repita el campo "code" y que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("All fields are required");
    }

    if (this.products.find(p => p.code === code)) {
      throw new Error("Code must be unique");
    }

    // Crear un nuevo producto con un ID autoincrementable
    const product = {
      id: this.nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(product);
    this.nextId++;

    // Guardar los productos en el archivo
    this.save();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updates) {
    // Encontrar el producto con el ID especificado
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Actualizar el producto con los cambios especificados
    this.products[productIndex] = { ...this.products[productIndex], ...updates };
    this.save();
  }

  deleteProduct(id) {
    // Encontrar el índice del producto con el ID especificado
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Eliminar el producto del arreglo de productos
    this.products.splice(productIndex, 1);
    this.save();
  }

  save() {
    // Convertir la lista de productos a formato JSON
    const data = JSON.stringify(this.products);
    // Escribir los datos en un archivo
    fs.writeFileSync('products.json', data);
}

load() {
  try {
    // Leer el contenido del archivo
    const data = fs.readFileSync('products.json');
    // Convertir el contenido del archivo a un objeto JSON
    this.products = JSON.parse(data);
    this.nextId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1
  } catch (err) {
    // Si el archivo no existe, simplemente se ignora y se inicializa el arreglo vacío
  }
}
}

module.exports = ProductManager;
