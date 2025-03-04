import express from "express";
import auMiddleware from "./middlewares/auMiddleware.js";
import auRoutes from "./routes/auRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
const app = express();
const port = process.env.PORT || 4005;

app.use(express.json());

app.use("/auth", auRoutes);
app.use("/todos", auMiddleware, todoRoutes);

app.listen(port, () => {
  console.log(`Server active on port: ${port}`);
});
