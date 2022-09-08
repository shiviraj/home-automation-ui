import {Box, Modal, Stack, TextField, Typography} from "@mui/material";
import {style} from "./modalStyle";
import {LoadingButton} from "@mui/lab";
import useForm from "../../hooks/useForm";
import {useEffect, useState} from "react";
import Password from "../AddUser/Password";
import password from "../AddUser/Password";
import API from "../../api/API";

const UpdatePasswordModal = ({open, onClose}: { open: boolean, onClose: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState({error: false, text: ""})
  const {values, handleChange, onChange, handleSubmit} = useForm({oldPassword: "", password: ""})

  useEffect(() => {
    handleChange({oldPassword: "", password: ""})
  }, [open])

  const onSubmit = () => {
    setLoading(true)
    API.users.updatePassword(values)
      .then((res) => setResponse({error: res.error, text: res.message}))
      .catch(() => setResponse({error: true, text: "Something went wrong, Please try again!"}))
      .finally(() => setLoading(false))
  }

  return <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant={"h5"}>Change Password</Typography>
          {response.text &&
            <Typography variant={"h6"} color={response.error ? "error" : "green"}>{response.text}</Typography>}
          <TextField label="Old Password" type={"password"} required value={values.oldPassword}
                     onChange={onChange("oldPassword")} variant="outlined"/>
          <Password password={values.password} onChange={onChange("password")} onError={setError}/>
          <LoadingButton
            type={"submit"}
            size={"large"}
            loading={loading}
            loadingIndicator="Updating..."
            variant="contained"
            disabled={error}
          >
            Update Password
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  </Modal>
}

export default UpdatePasswordModal