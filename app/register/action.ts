import { z } from "zod";
import { hash } from "bcryptjs";
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";
export const RegisterUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {

  try{



  const newUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string(),
  });

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }
  const hashPassword = await hash(password, 10);
  await db.insert(users).values({
    email,
    password:hashPassword,
  });
}
catch (e:any){
  return {
    error:true,
    message:"Ann error occurred"
  }
}
};
