import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";

import cors from "cors";
import pg from "pg";
dotenv.config();
const app = express();

const port = 3000;
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port: 5432,
});
db.connect();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({ origin:  "*" }));
app.use(express.static("public"));
app.get("/notes" , async(req , res)=>{
    try {
        const result = await db.query("SELECT * FROM notes"); 
        console.log(result)
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("database error!");
    }
   

});
app.post("/notes" , async(req , res)=>{
   const {title , content} = req.body;
   try {
    const result = await db.query("INSERT INTO notes(title , content) VALUES($1 , $2) RETURNING *",
    [title , content]);
    res.json(result.rows[0]);
   } catch (error) {
    console.log(error)
    res.sendStatus(500).send("Error inserting data!");
   }

});
app.delete("/notes/:id" , async(req , res)=>{
    try {
        const id = req.params.id;
        await db.query("DELETE FROM notes WHERE id = $1" , [id]);
        res.json({message: "the item deleted from database!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error!"})
        
    }

});
app.put("/notes/:id" , async(req , res)=>{
    console.log(req.body);
    console.log(req.params.id)
    try {
         const { title, content } = req.body;
        const id=req.params.id;
        await db.query("UPDATE notes SET title = $1 , content = $2 WHERE id = $3" , [title , content , id]);
        res.json({message: "updated successfully!"})
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({error : "error updating data!"});
    }
})
app.listen(port , "0.0.0.0", ()=>{
console.log(`this app is running on ${port}`);
});
