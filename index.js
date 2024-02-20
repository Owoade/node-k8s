import express from "express";
import { Sequelize } from "sequelize";
import { createClient } from "redis";
import { config } from "dotenv";

config()

const app = express();

const redis_client = createClient({ url: 'redis://redis:6379' })

const sequelize = new Sequelize(process.env.POSTGRES_URL,{
    dialect: "postgres",
    dialectOptions: {},
});

app.get('/health', (req,res) => res.json({
    message: "The server is running"
}));

const PORT = process.env.PORT ?? 5000;

app.listen( PORT ?? 5000, async ()=>{
    await redis_client.connect();
    await sequelize.authenticate();
    console.log(`Server is running on ${PORT}`)
})

