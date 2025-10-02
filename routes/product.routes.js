import { Router } from "express";
import { addNewProduct, getAllProducts, deleteProduct, getProductById, incrementStockQuantity, decrementStockQuantity, getLowStockProducts, updateProduct } from "../controllers/Inventory.controller.js";

const router = Router();

// @description: get all the products
// @route: GET /products
// @access: public
router.get('/products', getAllProducts);


// @description: get all products which are below their threshold
// @route: GET /products/low-stock
// @access: public
router.get('/products/low-stock', getLowStockProducts);

// @description: fetch a specific product based on given id
// @route: GET /products/:id
// @access: public
router.get('/products/:id', getProductById);

// @description: add a new product
// @route: POST /products
// @access: public
router.post('/products',addNewProduct);

// @description: delete a specific product based on given id
// @route: DELETE /products/:id
// @access: public
router.delete('/products/:id', deleteProduct);

// @description: increase stock quantity of a product based on given id
// @route: PATCH /products/:id/increase
// @access: public
router.patch('/products/:id/increase', incrementStockQuantity);

// @description: decrease stock quantity of a product based on given id 
// @route: PATCH /products/:id/decrease
// @access: public
router.patch('/products/:id/decrease', decrementStockQuantity);


// @description: update product details
// @route: PUT /products/:id
// @access: public
router.put('/products/:id', updateProduct);

export {router};
