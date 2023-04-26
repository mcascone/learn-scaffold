import Koa from "koa";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Scaffold, DataTypes } from "bitscaffold";
import { Player, Team } from "./Models.js";

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
  db: {
    dialect: "sqlite",
    storage: new URL("example.sqlite", import.meta.url),
  },
});

app.use(scaffold.middleware.allModels.all);

app.use(async (ctx) => {
  ctx.body = "Hello From Koa";
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});