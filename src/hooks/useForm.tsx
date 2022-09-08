import React, {useState} from "react";

const useForm = <S extends Record<string, any>>(defaultValue: S) => {
  const [values, setValues] = useState(defaultValue)

  const onChange = (key: string) => (event: { target: { value: any } }) => {
    setValues({...values, [key]: event.target.value})
  }

  const handleSubmit = (onSubmit: (values: S) => void) => (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSubmit(values)
  }

  return {values, onChange, handleSubmit, handleChange: setValues}
};

export default useForm;