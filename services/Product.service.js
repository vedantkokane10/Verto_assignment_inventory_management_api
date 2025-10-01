import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService{
    static async addProduct(data){
        const result = await prisma.Product.create({data});
        return result;
    }

    static async getAllProducts(page, limit){
        let startingIndex = (page-1) * limit;
        let endIndex = page * limit;

        let size = await prisma.Product.count();

        const result = await prisma.Product.findMany({
            skip:startingIndex,
            take:limit,
            orderBy:{id:"asc"}
        })
        let response = {};
        response.result = result;
        if(startingIndex > 0){
            response.previous = {
                page:page-1,
                limit:limit
            }
        }
        if(endIndex < size){
            response.next = {
                page:page+1,
                limit:limit
            }
        }
        return response;
    }


    static async getProductById(productId){
        const result = await prisma.Product.findUnique({where: {id:productId}});
        if(!result){
            throw new Error(`Product with id - ${productId} not found in database`);
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
            //throw new Error(`Product with id - ${productId} now found in the database`);
            return null;
        }
        console.log(product.stockQuantity);
        if(amount > product.stockQuantity){
            //throw new Error(`insufficient stock is available for Product with id - ${productId}`);
            return null;
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