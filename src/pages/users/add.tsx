import {NextPage} from "next";
import {FormControl, InputLabel, MenuItem, Select, Stack, TextField, Theme, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import {useRouter} from "next/router";
import useForm from "../../hooks/useForm";
import {Add} from "@mui/icons-material";
import Username from "../../components/AddUser/Username";
import Password from "../../components/AddUser/Password";
import API from "../../api/API";

const Container = styled('div')(({theme}: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.grey[300]}`,
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1)
}))

const AddUserPage: NextPage = () => {
  const {values, onChange, handleSubmit} = useForm({
    username: "",
    name: "",
    password: "",
    role: "USER"
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [inputErrors, setInputErrors] = useState({usernameError: false, passwordError: false})
  const router = useRouter()

  const handleInputErrors = (key: string) => (isError: boolean) => setInputErrors({...inputErrors, [key]: isError})

  const submitForm = () => {
    setLoading(true)
    API.users.addUser(values)
      .then(() => router.push("/users"))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'80vh'}>
    <Container>
      <Typography variant={'h4'} mb={2}>Add User</Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={2}>
          {error && <Typography variant={"h6"} color={"error"}>Something went wrong, Please try again!!</Typography>}
          <Username username={values.username} onChange={onChange("username")}
                    onError={handleInputErrors("usernameError")}/>
          <TextField label="Name" required value={values.name} onChange={onChange("name")}
                     variant="outlined"/>
          <FormControl fullWidth required>
            <InputLabel id={"select-role"}>Role</InputLabel>
            <Select value={values.role} labelId={"select-role"} label="Role" onChange={onChange("role")}>
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              <MenuItem value={"USER"}>USER</MenuItem>
            </Select>
          </FormControl>
          <Password password={values.password} onChange={onChange("password")}
                    onError={handleInputErrors("passwordError")}/>
          <LoadingButton startIcon={<Add/>} type={"submit"} size={"large"} loading={loading}
                         loadingIndicator="Adding User…" variant="contained"
                         disabled={inputErrors.passwordError || inputErrors.usernameError}
          >
            Add User
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  </Stack>
};

export default AddUserPage;
