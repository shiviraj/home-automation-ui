import {TextField} from '@mui/material';
import {useEffect, useState} from "react";

type PasswordInterface = { password: string, onChange: (event: any) => void, onError: (error: boolean) => void };

const Password = ({password, onChange, onError}: PasswordInterface) => {
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    const error = (password !== confirmPassword && confirmPassword !== "") || (confirmPassword.length > 0 && confirmPassword.trim().length < 6)
    setError(error)
    onError(error)
  }, [password, confirmPassword])

  return <>
    <TextField label="Password" required value={password} onChange={onChange} variant="outlined" type={"password"}
               error={password.length !== 0 && password.length < 6}
               helperText={password.length !== 0 && password.length < 6 && "Password length should be greater than 6"}
    />
    <TextField label="Confirm Password" required value={confirmPassword} type={"password"}
               onChange={(event) => setConfirmPassword(event.target.value)}
               variant="outlined" error={error} helperText={error && "Password is not matched"}/>
  </>
};

export default Password;