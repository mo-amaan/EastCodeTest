import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(err.message);
    res.sendStatus(505);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(user);

    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(505);
  }
});

export default router;
