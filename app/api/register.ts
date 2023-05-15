import type { NextApiRequest, NextApiResponse } from "next";
import User from "@models/User";
import bcrypt from "bcrypt";
import dbConnect from "@utils/dbConnect";
import { getUser } from "@controllers/Users";

interface ResponseData {
  error?: string;
  message?: string;
}

const validateEmail = (email: string) => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  if (username.length < 4) {
    return { error: "Username must be at least 4 characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Email is not valid" };
  }

  const dbConnection = await dbConnect();
  if (dbConnection) {
    const user = await getUser({ dbConnection, userId: 1000 });
    console.log(user);
  }
};
