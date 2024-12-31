import { cn } from "@/lib/utils";
import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
  accept?: string;
}

export const FileInputController = ({label, name, accept}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{label}</label>
          <input
            type="file"
            id={name}
            {...field}
            value={value?.fileName}
            onChange={(e) => {
                onChange(e.target.files);
              }}
            className={cn(
              "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600",
              fieldState.error && 'text-red-500'
            )}
            accept={accept}
          />
          {fieldState.error && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
};
