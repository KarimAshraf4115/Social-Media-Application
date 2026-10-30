import * as zod from "zod";
export const RegisterSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum length must be 3")
      .max(30, "Maximum length must be 30"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid",
      ),
    dateOfBirth: zod
      .string()
      .nonempty("Date is required")
      .refine((date) => {
        const userDate = new Date(date).getFullYear();
        const nowDateYear = new Date().getFullYear();
        return nowDateYear - userDate > 10;
      }, "Age should be more than 10 years"),

    gender: zod.enum(["male", "female"]),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
        `Password does not meet requirements. It must contain:
                  • At least 8 characters
                  • At least one uppercase letter (A-Z)
                  • At least one lowercase letter (a-z)
                  • At least one number (0-9)
                  • At least one special character (e.g., ! @ # $ % ^ & *)).`,
      ),

    rePassword: zod.string().nonempty("conform Password is required"),
  })
  .refine(
    (obj) => {
      if (obj.password === obj.rePassword) {
        return true;
      } else {
        return false;
      }
    },
    {
      path: ["rePassword"],
      error: "Password and Confirm Password aren't matched",
    },
  );

export type RegisterSchemaType = zod.infer<typeof RegisterSchema>;

export const LoginSchema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid",
    ),
  password: zod
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      `Password does not meet requirements. It must contain:
                  • At least 8 characters
                  • At least one uppercase letter (A-Z)
                  • At least one lowercase letter (a-z)
                  • At least one number (0-9)
                  • At least one special character (e.g., ! @ # $ % ^ & *)).`,
    ),
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>;