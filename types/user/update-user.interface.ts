import z from "zod";
import updateUserSchema from "@/lib/schemas/user/update-user.schema";

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
