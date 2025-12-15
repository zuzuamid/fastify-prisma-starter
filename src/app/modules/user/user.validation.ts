import { z } from "zod";

const createUser = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  user: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email("Invalid email format!"),
    role: z.string({
      required_error: "Role is required!",
    }),
  }),
});

export const userValidation = {
  createUser,
};
