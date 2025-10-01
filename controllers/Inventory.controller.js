import {ProductService} from '../services/Product.service.js';

const addNewProduct = async (req,res) =>{
    try{
        const { name, description, stockQuantity } = req.body;
        if (!name || !description || stockQuantity === undefined) {
            return res.status(400).json({ error: "Name, description, and stockQuantity are required" });
        }

        if (isNaN(stockQuantity) || stockQuantity < 0) {
            return res.status(400).json({ error: "Stock quantity must be a non-negative number" });
        }

        const data = {
            name,
            description,
            stockQuantity, 
        };
        
        const result = await ProductService.addProduct(data);

        let response = {};
        response.message = "Product added Successfully";
        response.result = result
        res.status(201).json(response);
    }
    catch (error){
        console.error("Error creating product : ", error);
        res.status(500).json({ error: error.message });
    }
};

const getAllProducts = async(req,res) => {
    try{
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;
        let response = await ProductService.getAllProducts(page, limit);
        response.message = "Products fetched Successfully";
        res.status(200).json(response);
    }
    catch (error){
        console.error("Error getting all products : ", error);
        res.status(500).json({ error: error.message });
    }
};


const deleteProduct = async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await ProductService.deleteProductById(id);
        if (!result) {
            return res.status(404).json({ message: `Product with id - ${id} not found` });
        }
        let response = {};
        response.message = "Product deleted Successfully";
        response.result = result
        res.status(200).json(response);
    }
    catch(error){
        console.error("Error deleting product : ", error);
        res.status(500).json({ error: error.message })
    }
};

const getProductById = async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await ProductService.getProductById(id);
        
        if (!result) {
            return res.status(404).json({ message: `Product with id - ${id} does not exist` });
        }
        let response = {};
        response.message = "Product details fetched Successfully";
        response.result = result
        res.status(200).json(response);
    }
    catch(error){
        console.error("Error fetching product : ", error);
        res.status(500).json({ error: error.message })
    }
};

const incrementStockQuantity = async(req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const amount = parseInt(req.body.amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number" });
        }
        
        const result = await ProductService.incrementStockQuantity(id,amount);
        if (!result) {
            return res.status(404).json({ error: `Product with id - ${id} not found` });
        }
        let response = {};
        response.message = "Product's stock quantity incremented  Successfully";
        response.result = result
        res.status(200).json(response);
    }
    catch(error){
        if (error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        console.error("Error Incrementing product's stock quantity : ", error);
        res.status(500).json({ error: error.message })
    }
};

const decrementStockQuantity = async(req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const amount = parseInt(req.body.amount);
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number" });
        }
        
        const result = await ProductService.decrementStockQuantity(id,amount);
        if (!result) {
            return res.status(404).json({ error: `Product with id - ${id} not found` });
        }
        let response = {};
        response.message = "Product's stock quantity decremented  Successfully";
        response.result = result
        res.status(200).json(response);
    }
    catch(error){
        console.error("Error decrementing product's stock quantity : ", error);
        res.status(500).json({ error: error.message })
    }
};


const getLowStockProducts = async(req,res) =>{
    try{
        const result = await ProductService.getLowStockProducts();
        let response = {};
        response.message = "Low stocked products fetched Successfully";
        response.result = result
        res.status(200).json(response);
    }
    catch (error){
        console.error("Error fetching low stocked product : ", error);
        res.status(500).json({ error: error.message });
    }
}

export {addNewProduct, getAllProducts, deleteProduct, getProductById, incrementStockQuantity, decrementStockQuantity, getLowStockProducts};