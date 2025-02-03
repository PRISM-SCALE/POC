import {
  FormProvider as RHFormProvider,
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { ReactNode } from "react";

interface FormProviderProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
}

export const FormProvider = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormProviderProps<T>) => {
  const methods: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <RHFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFormProvider>
  );
};
