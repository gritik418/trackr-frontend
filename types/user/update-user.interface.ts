import z from "zod";
import updateUserSchema from "@/lib/validations/user/update-user.schema";

export type UpdateUserDto = z.infer<typeof updateUserSchema>
