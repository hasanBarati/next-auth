"use server";

import { passwordSchema } from "@/validation/passwordSchema";
import { z } from "zod";

export const loginWithcredential = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
  });
  const loginValidation = loginSchema.safeParse({ email, password });

  if(!loginValidation.success){
    return{
        error:true,
        message:loginValidation.error?.issues[0]?.message??"An error occurred"
    }
  }
};
