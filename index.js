// import "core-js/stable/index.js";
// import "regenerator-runtime/runtime.js";

import Koa from "koa"
import dotenv from 'dotenv'

import { Scaffold, DataTypes } from "bitscaffold";
import { Player, Team } from "./Models.js";

dotenv.config()

const User = {
  name: "User",
  attributes: {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
};

const app = new Koa();

const scaffold = new Scaffold([Player, Team, User], {
  name: "Scaffold Demo",
  prefix: "/api",
  database: {
    dialect: "postgres",
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false
  },
});

app.use(scaffold.middleware.allModels.all);

await scaffold.createDatabase();

app.use(async (ctx) => {
    ctx.body = "Hello From Koa";
});

  app.listen(3000, () => {
    console.log("Started on port 3000");
  });