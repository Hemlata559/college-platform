import express from "express";
import cors from "cors";
import passport from "./auth";
import authRoutes from "./routes/authRoutes";
import collegeRoutes from "./routes/college";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use("/api/colleges", collegeRoutes);

app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Backend running successfully"
  });
});

export default app;