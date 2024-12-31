import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const SelectInputController = ({label, name, placeholder, options}: TInputProps) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{label}</label>
          <select
            id={name}
            {...field}
            className={cn("border rounded p-2", fieldState.error && 'border-red-500')}
          >
            {placeholder && (
              <option value="" disabled>
                --{placeholder}--
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
};
