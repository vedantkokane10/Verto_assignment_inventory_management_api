import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService{
    static async addProduct(data){
        const result = await prisma.product.create({data});
        return result;
    }

    static async getAllProducts(){
        const result = await prisma.product.findMany();
        return result;
    }


};

export {ProductService};