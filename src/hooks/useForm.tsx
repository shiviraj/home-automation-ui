import React, {useState} from "react";

const useForm = (defaultValue: Record<string, any>) => {
  const [values, setValues] = useState(defaultValue)

  const onChange = (key: string) => (event: { target: { value: any } }) => {
    setValues({...values, [key]: event.target.value})
  }

  const handleSubmit = (onSubmit: (values: any) => void) => (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSubmit(values)
  }

  return {values, onChange, handleSubmit}
};

export default useForm;