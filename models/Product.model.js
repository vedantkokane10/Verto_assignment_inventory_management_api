import { connection } from "../config/db";

class Product{
    constructor(){
        const query = "create table Products if not exists (name varchar(100), description varchar(100)) "
        connection.execute(query);
    };

    async addNewProduct(data){
        const { name, description, stock_quantity } = data;

    };
};