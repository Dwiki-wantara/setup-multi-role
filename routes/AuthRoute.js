import express  from "express";
import { Login, LoginKembali, Logout } from "../controllers/Auth.js";

const router = express.Router();

router.get('/loginkembali', LoginKembali);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;