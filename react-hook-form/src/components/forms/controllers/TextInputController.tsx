import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";


type TControllerProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
}

export const TextInputController = ({label, name, placeholder, type = 'text'}: TControllerProps) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            id={name}
            {...field}
            className={cn("border rounded p-2", fieldState.error && 'border-red-500')}
            placeholder={placeholder}
          />
          {fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
};
