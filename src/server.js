import express from "express";

const app = express();
const port = process.env.PORT() || 4005;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server active on port: ${port}`);
});
