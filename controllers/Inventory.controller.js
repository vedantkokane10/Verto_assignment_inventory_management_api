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
        console.error("Error creating product:", error);
        res.status(400).json({ error: error.message });
    }
};

export {addNewProdct};