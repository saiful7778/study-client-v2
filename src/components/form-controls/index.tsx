import {
  FormProvider,
  FieldValues,
  FieldPath,
  ControllerProps,
  Controller,
} from "react-hook-form";
import { FC, createContext } from "react";

const FormMain = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const InputFieldMain: FC = ({ label, ...props }) => {
  return (
    <InputField
      {...props}
      render={({ field }) => (
        <>
          <FormLabel>Last name</FormLabel>
          <FormControl>
            <Input
              placeholder="Last name"
              type="text"
              {...field}
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </>
      )}
    />
  );
};

const Form = Object.assign(FormMain, {
  input: InputFieldMain,
});

export default Form;
