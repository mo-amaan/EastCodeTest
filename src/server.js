import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import auRoutes from "./routes/auRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import auMiddleware from "./middlewares/auMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", auRoutes);
app.use("/todos", auMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
