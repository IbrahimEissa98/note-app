import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod
    .string()
    .nonempty("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name must be at most 20 characters")
    .regex(
      /^([A-Za-z']+([ ]?[A-Za-z]+)*){5,20}$/,
      "Invalid characters at Name"
    ),
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    ),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    ),
  age: zod
    .string()
    .nonempty("Age is required")
    .refine((data) => data >= 18, "the age must be +18"),
  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "the phone is not valid"),
});

export const loginSchema = zod.object({
  email: zod
    .email()
    .nonempty("Email is required")
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    ),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password is not valid"
    ),
});
