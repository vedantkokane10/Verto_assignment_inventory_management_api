import { Router } from "express";
import { addNewProdct } from "../controllers/Inventory.controller.js";


const router = Router();

// router.get('/products');

// router.get('/products/:id');

router.post('/products',addNewProdct);

// router.delete('/products/:id');

// router.put('/products/:id');


export {router};
