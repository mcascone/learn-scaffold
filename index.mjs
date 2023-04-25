import Koa from "koa";
import path from "path";
import { Scaffold, DataTypes } from "bitscaffold";

const User = {
  name: "User",
  attributes: {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
};

const app = new Koa();
const scaffold = new Scaffold([User], {
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