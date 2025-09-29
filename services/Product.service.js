import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService{
    static async addProduct(data){
        const result = await prisma.Product.create({data});
        return result;
    }

    static async getAllProducts(){
        const result = await prisma.Product.findMany();
        return result;
    }


    static async getProductById(productId){
        const result = await prisma.Product.findUnique({where: {id:productId}});
        if(!result){
            return new Error(`Product with id - ${productId} not found in database`);
        }
        return result;
    }

    static async deleteProductById(productId){
        const result = await prisma.Product.delete({where: {id:productId}});
        return result;
    }

    static async incrementStockQuantity(productId, amount){
        const result = await prisma.Product.update({
            where:{id:productId},
            data:{stockQuantity:{increment:amount}}
        })

        return result;
    }

    static async decrementStockQuantity(productId, amount){
        const product = await prisma.Product.findUnique({
            where:{id:productId}
        });

        if(!product){
            throw new Error(`Product with id - ${productId} now found in the database`);
        }
        console.log(product.stockQuantity);
        if(amount > product.stockQuantity){
            throw new Error(`insufficient stock is available for Product with id - ${productId}`);
        }
        const result = await prisma.Product.update({
            where:{id:productId},
            data:{stockQuantity:{decrement:amount}}
        });

        return result;
    }

    static async getLowStockProducts() {
        // return prisma.Product.findMany({
        //     where: { stockQuantity: { lte: prisma.Product.fields.lowStockThreshold } }
        // });

        return prisma.$queryRaw`SELECT * FROM Product WHERE stockQuantity <= lowStockThreshold;`;
    }
};

export {ProductService};