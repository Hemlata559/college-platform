import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  name?: string | null;
  email: string;
};

export type AuthenticatedRequest = Request & {
  authUser?: AuthUser;
};

const getBearerToken = (authorizationHeader: string | undefined) => {
  if (!authorizationHeader) return null;

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  return token;
};

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getBearerToken(req.headers.authorization);
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ success: false, message: "JWT_SECRET is not configured." });
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Missing authorization token." });
  }

  try {
    req.authUser = jwt.verify(token, jwtSecret) as AuthUser;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};
