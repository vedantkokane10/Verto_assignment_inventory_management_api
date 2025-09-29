import {ProductService} from '../services/Product.service.js';

const addNewProdct = async (req,res) =>{
    try{
        const data = {
            name: req.body.name,
            description: req.body.description,
            stockQuantity: parseInt(req.body.stockQuantity, 10), 
        };
        const result = await ProductService.addProduct(data);
        res.status(201).json({messgae:"Product added Successfully", result});
    }
    catch (error){
        console.error("Error creating product : ", error);
        res.status(400).json({ error: error.message });
    }
};

const getAllProducts = async(req,res) => {
    try{
        const result = await ProductService.getAllProducts();
        res.status(200).json({message:"Products fetched Successfully", result});
    }
    catch (error){
        console.error("Error getting all products : ", error);
        res.status(400).json({ error: error.message });
    }
};


const deleteProduct = async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await ProductService.deleteProductById(id);
        res.status(200).json({message:"Product deleted Successfully", result});
    }
    catch(error){
        console.error("Error deleting product : ", error);
        res.status(400).json({ error: error.message })
    }
};

const getProductById = async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await ProductService.getProductById(id);
        res.status(200).json({message:"Product details fetched Successfully", result});
    }
    catch(error){
        console.error("Error fetching product : ", error);
        res.status(400).json({ error: error.message })
    }
};

const incrementStockQuantity = async(req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const amount = parseInt(req.body.amount);
        const result = await ProductService.incrementStockQuantity(id,amount);
        res.status(200).json({message:"Product's stock quantity incremented  Successfully", result});
    }
    catch(error){
        console.error("Error Incrementing product's stock quantity : ", error);
        res.status(400).json({ error: error.message })
    }
};

const decrementStockQuantity = async(req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const amount = parseInt(req.body.amount);
        const result = await ProductService.decrementStockQuantity(id,amount);
        res.status(200).json({message:"Product's stock quantity decremented  Successfully", result});
    }
    catch(error){
        console.error("Error decrementing product's stock quantity : ", error);
        res.status(400).json({ error: error.message })
    }
};

export {addNewProdct, getAllProducts, deleteProduct, getProductById, incrementStockQuantity, decrementStockQuantity};