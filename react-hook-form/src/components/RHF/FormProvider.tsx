import { FormProvider as RHFormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInputController } from "./input-fields/TextInputController";
import { SelectInputController } from "./input-fields/SelectInputController";
import { RadioInputController } from "./input-fields/RadioInputController";
import { CheckboxInputController } from "./input-fields/CheckboxInputController";
import { FileInputController } from "./input-fields/FileInputController";


const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;



const FormProvider = () => {

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      country: "",
      gender: "",
      terms: false,
      avatar: undefined,
    },
  });

  const handleForm = (data: FormValues) => {
    console.log(data);
    alert(JSON.stringify(data, null, 3))
  };

  return (
    <RHFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleForm)} className="grid gap-4 max-w-md mx-auto text-sm">
        <FileInputController
          name="avatar"
          label="Choose your avatar"
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />
        <TextInputController name="name" label="Name" />
        <TextInputController name="age" label="Age" type="number" />
        <SelectInputController
          name="country"
          label="Country"
          placeholder="Select country"
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
          ]}
        />
        <RadioInputController
          name="gender"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />
        <CheckboxInputController
          name="terms"
          label="I accept the terms and conditions"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </RHFormProvider>
  );
};

export default FormProvider;
