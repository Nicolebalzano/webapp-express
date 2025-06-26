//  `` 
import connection from "./db.js";
import express from "express";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
console.log( `porta in ascolto sulla porta ${port}` )
})
