import { z } from "zod";
import loginSchema from "@/lib/schemas/auth/login.schema";

export type LoginDto = z.infer<typeof loginSchema>;
