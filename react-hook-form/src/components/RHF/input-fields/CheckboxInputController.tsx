import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
}

export const CheckboxInputController = ({label, name}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id={name}
              {...field}
              checked={field.value}
              className={cn(
                "w-4 h-4",
                fieldState.error && "border-red-500"
              )}
            />
            {label}
          </label>
          {fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
};
