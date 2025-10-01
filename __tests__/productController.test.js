// __tests__/productController.test.js
import request from "supertest";
import app from "../server.js";

describe("Product Controller", () => {
  let createdProductId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Test Product", description: "Test Desc", stockQuantity: 10 });
    createdProductId = res.body.result.id;
  });

  afterAll(async () => {
    await request(app).delete(`/products/${createdProductId}`);
  });

  test("POST /products - create product", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Another Product", description: "Desc", stockQuantity: 5 });
    expect(res.statusCode).toBe(201);
    expect(res.body.result).toHaveProperty("id");
    await request(app).delete(`/products/${res.body.result.id}`);
  });

  test("POST /products - fail if fields missing", async () => {
    const res = await request(app).post("/products").send({ name: "Invalid" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /products - fetch all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result");
  });

  test("PATCH /products/:id/increase - increase stock", async () => {
    const res = await request(app)
      .patch(`/products/${createdProductId}/increase`)
      .send({ amount: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toHaveProperty("stockQuantity");
  });

  test("PATCH /products/:id/decrease - decrease stock", async () => {
    const res = await request(app)
      .patch(`/products/${createdProductId}/decrease`)
      .send({ amount: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toHaveProperty("stockQuantity");
  });

  test("GET /products/low-stock - fetch low stock", async () => {
    const res = await request(app).get("/products/low-stock");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result");
  });

  test("DELETE /products/:id - delete product", async () => {
    const res = await request(app).delete(`/products/${createdProductId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("result");
  });
});
