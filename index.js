import express  from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js"
import ProductRoute from "./routes/ProductRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import db from "./config/Database.js"
dotenv.config(); // mengambil dari .env
import SequelizeStore  from "connect-session-sequelize";

const app = express();

// untuk menyimpan session di database agar setiap restar tidak hilang sesionnya
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
})

// untuk eksekusi query membuat table database
// (async() =>{
//     await db.sync();
// })();

// untuk eksekusi query membuat table session di database
// store.sync();

app.use(
    session({
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 2
        },
        store: store,
        saveUninitialized: true,
        resave: false,
        secret: 'secretValue'
    })
)

// middleware
app.use(cors({
    credentials: true, // agar menerima request frontend dan cookie
    oringin: 'http://localhost:3000' //domain yang dizinkan
}))

app.use(express.json())
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);



const PORT = 5000
app.listen(PORT, () => {
    console.log(`Example app listening on port 5000`)
})