import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const RadioInputController = ({label, name, options}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label className="mb-2">{label}</label>
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  className={cn(
                    "w-4 h-4",
                    fieldState.error && "border-red-500"
                  )}
                />
                {option.label}
              </label>
            ))}
          </div>
          {fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
};
