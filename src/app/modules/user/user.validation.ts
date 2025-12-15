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

// Improvement commit 10

// Improvement commit 37

// Improvement commit 45

// Improvement commit 91

// Improvement commit 107

// Improvement commit 131

// Improvement commit 150

// Improvement commit 195

// Improvement commit 208

// Improvement commit 215

// Improvement commit 221
