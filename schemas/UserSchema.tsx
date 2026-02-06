import { colorAvailible } from "@/public/colorAvailible";
import z from "zod";

const ColorSchema = colorAvailible;

const UserSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Tell your name!"),
  text: z.string().trim().min(1, "Write something!"),
  color: z.enum(ColorSchema),
  date: z.string(),
});

export const CreateUserSchema = UserSchema.omit({ id: true });
export const UpdateUserSchema = UserSchema;
export const DeleteUserSchema = UserSchema.pick({ id: true });
