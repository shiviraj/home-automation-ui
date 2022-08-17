import {NextPage} from "next";
import {Stack, TextField, Theme, Typography} from "@mui/material";
import useForm from "../hooks/useForm";
import {styled} from "@mui/styles";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import API from "../api/API";
import {setStorage} from "../utils/storage";
import {AUTH, TITLE} from "../config/constant";
import {useRouter} from "next/router";

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

const LoginPage: NextPage = () => {
  const {values, onChange, handleSubmit} = useForm({username: "", password: ""})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const submitForm = () => {
    setLoading(true)
    API.users.login(values as Document)
      .then((data: { token: string }) => {
        setStorage(AUTH, data)
        setError(false)
        return router.push("/")
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => setLoading(false))
  }

  return <Stack spacing={2} justifyContent={'center'} direction={'row'} height={'80vh'}>
    <Container>
      <Typography variant={'h4'} mb={2}>{TITLE} Log In</Typography>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={2}>
          {error && <Typography variant={"h6"} color={"error"}>Something went wrong, Please try again!!</Typography>}
          <TextField label="Username" required value={values.username} onChange={onChange("username")}
                     variant="outlined"/>
          <TextField label="Password" required value={values.password} onChange={onChange("password")}
                     variant="outlined"/>
          <LoadingButton
            type={"submit"}
            size={"large"}
            loading={loading}
            loadingIndicator="Logging in…"
            variant="contained"
          >
            Log in
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  </Stack>
};

export default LoginPage;
