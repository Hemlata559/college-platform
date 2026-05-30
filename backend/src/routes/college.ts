import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const colleges = await prisma.college.findMany();
  res.json(colleges);
});

router.get("/recommend", async (req, res) => {
  try {
    const rank = Number(req.query.rank);

    const colleges = await prisma.college.findMany({
      take: 10
    });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recommendations"
    });
  }
});

export default router;