import {FieldHelperProps, FieldInputProps, FieldMetaProps, FormikErrors, FormikState, FormikTouched} from "formik";

export const useInputFormikMui = (formik: {
    initialValues: { price: string; description: string; title: string; category: string; stock: string }; initialErrors: FormikErrors<unknown>; initialTouched: FormikTouched<unknown>; initialStatus: any; handleBlur: { (e: React.FocusEvent<any>): void; <T = any>(fieldOrEvent: T): T extends string ? ((e: any) => void) : void }; handleChange: { (e: React.ChangeEvent<any>): void; <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : ((e: (string | React.ChangeEvent<any>)) => void) }; handleReset: (e: any) => void; handleSubmit: (e?: (React.FormEvent<HTMLFormElement> | undefined)) => void; resetForm: (nextState?: (Partial<FormikState<{ price: string; description: string; title: string; category: string; stock: string }>> | undefined)) => void; setErrors: (errors: FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>) => void; setFormikState: (stateOrCb: (FormikState<{ price: string; description: string; title: string; category: string; stock: string }> | ((state: FormikState<{ price: string; description: string; title: string; category: string; stock: string }>) => FormikState<{ price: string; description: string; title: string; category: string; stock: string }>))) => void; setFieldTouched: (field: string, touched?: boolean, shouldValidate?: (boolean | undefined)) => (Promise<FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>> | Promise<void>); setFieldValue: (field: string, value: any, shouldValidate?: (boolean | undefined)) => (Promise<FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>> | Promise<void>); setFieldError: (field: string, value: (string | undefined)) => void; setStatus: (status: any) => void; setSubmitting: (isSubmitting: boolean) => void; setTouched: (touched: FormikTouched<{ price: string; description: string; title: string; category: string; stock: string }>, shouldValidate?: (boolean | undefined)) => (Promise<FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>> | Promise<void>); setValues: (values: React.SetStateAction<{ price: string; description: string; title: string; category: string; stock: string }>, shouldValidate?: (boolean | undefined)) => (Promise<FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>> | Promise<void>); submitForm: () => Promise<any>; validateForm: (values?: { price: string; description: string; title: string; category: string; stock: string }) => Promise<FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>>; validateField: (name: string) => (Promise<void> | Promise<string | undefined>); isValid: boolean; dirty: boolean; unregisterField: (name: string) => void; registerField: (name: string, { validate }: any) => void; getFieldProps: (nameOrOptions: any) => FieldInputProps<any>; getFieldMeta: (name: string) => FieldMetaProps<any>; getFieldHelpers: (name: string) => FieldHelperProps<any>; validateOnBlur: boolean; validateOnChange: boolean; validateOnMount: boolean; values: { price: string; description: string; title: string; category: string; stock: string }; errors: FormikErrors<{ price: string; description: string; title: string; category: string; stock: string }>; touched: FormikTouched<{ price: string; description: string; title: string; category: string; stock: string }>; isSubmitting: boolean; isValidating: boolean; status?: any; submitCount: number
}, inputName: string) => {
    type indexType = keyof FormikTouched<{ price: string; description: string; title: string; category: string; stock: string; }>

    const onChange = formik.handleChange
    const value = formik.values[inputName as indexType]
    const error = formik.touched[inputName as indexType] && Boolean(formik.errors[inputName as indexType])
    const helperText = formik.touched[inputName as indexType] && formik.errors[inputName as indexType]

    return {
        value,
        error,
        onChange,
        helperText,
        type: "text",
        id: inputName,
        fullWidth: true,
        name: inputName,
        label: inputName.charAt(0).toUpperCase() + inputName.slice(1),



}

};