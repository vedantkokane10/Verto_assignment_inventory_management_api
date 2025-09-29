import { Router } from "express";
import { addNewProdct, getAllProducts, deleteProduct, getProductById, incrementStockQuantity, decrementStockQuantity } from "../controllers/Inventory.controller.js";

const router = Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProductById);

router.post('/products',addNewProdct);

router.delete('/products/:id', deleteProduct);

router.patch('/products/:id/increase', incrementStockQuantity);

router.patch('/products/:id/decrease', decrementStockQuantity);

export {router};
