import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character"
    )
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character"
    ),
});

export const addTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),

  status: yup
    .string()
    .required("Status is required")
    .oneOf(["In progress", "Completed", "Deferred", "Open"], "Invalid status"),

  priority: yup
    .string()
    .required("Priority is required")
    .oneOf(["High", "Medium", "Low"], "Invalid priority"),

  due_date: yup
    .date()
    .nullable()
    .min(new Date(), "Due date must be today or later"),
});

export const updateTaskSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters"),

  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),

  status: yup
    .string()
    .oneOf(["In progress", "Completed", "Deferred", "Open"], "Invalid status"),

  priority: yup
    .string()
    .oneOf(["High", "Medium", "Low"], "Invalid priority"),

  due_date: yup
    .date()
    .nullable()
    .min(new Date(), "Due date must be today or later"),
});
