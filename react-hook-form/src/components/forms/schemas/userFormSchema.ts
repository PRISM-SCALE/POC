import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const userFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    age: z.string().min(1, "Age is required"),
    country: z.string().min(1, "Country is required"),
    gender: z.string().min(1, "Gender is required"),
    terms: z.boolean().refine((val) => val === true, {message: "You must accept the terms"}),
    avatar: z
      .custom<FileList>()
      .refine((files) => files?.length > 0, "Image is required.")
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max fle size is 5MB.")
  });

export type TUserFormValues = z.infer<typeof userFormSchema>;
