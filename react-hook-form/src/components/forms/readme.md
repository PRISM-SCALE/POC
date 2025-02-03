### Advanced Form Management
3. Use `FormProvider` for complex forms with nested components
   - `FormProvider` allows you to share form context across nested components
   - Useful when you need to split form fields across multiple components
   - See [FormProvider Documentation](https://react-hook-form.com/docs/formprovider) for implementation details
   - See [useFormContext Documentation](https://react-hook-form.com/docs/useformcontext) for accessing form context in child components


### RHF Form Provider Usage

```tsx

import { FormProvider } from "./FormProvider";
import { userFormSchema, TUserFormValues } from "./schemas";
import { TextInputController } from "./controllers";
import { SelectInputController } from "./controllers";
import { RadioInputController } from "./controllers";
import { CheckboxInputController } from "./controllers";
import { FileInputController } from "./controllers";

const defaultValues: TUserFormValues = {
  name: "",
  age: "",
  country: "",
  gender: "",
  terms: false,
  avatar: new DataTransfer().files // Returns an empty FileList
};


const handleUserFormSubmit = (data: TUserFormValues) => {
  console.log("User Form Data:", data);
};

const UserForm = () => {
  return (
    <FormProvider
      schema={userFormSchema}
      defaultValues={defaultValues}
      onSubmit={handleUserFormSubmit}
    >
      <FileInputController
        name="avatar"
        label="Choose your avatar"
        accept="image/jpeg,image/png"
      />
      <TextInputController name="name" label="Name" />
      <TextInputController name="age" label="Age" type="number" />
      <SelectInputController
        name="country"
        label="Country"
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
      <button type="submit">submit</button>
    </FormProvider>
  );
};

export default UserForm;

```