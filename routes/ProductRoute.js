import express  from "express";
import { getProducts , getProductById, createProduct, UpdateProduct, deleteProduct } from "../controllers/Product.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', UpdateProduct);
router.delete('/product/:id', deleteProduct);

export default router;