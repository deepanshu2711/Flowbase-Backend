import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../config/db";
import { AppError } from "../../utils/appError";

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const signInUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, "jwt_secret", {
    expiresIn: "7d",
  });

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};
