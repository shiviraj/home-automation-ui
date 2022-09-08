import {Box, Modal, Stack, TextField, Typography} from "@mui/material";
import {style} from "./modalStyle";
import {useEffect, useState} from "react";
import useForm from "../../hooks/useForm";
import {LoadingButton} from "@mui/lab";
import {useUser} from "../../contexts/User";
import Username from "../AddUser/Username";
import API from "../../api/API";

const UpdateProfileModal = ({open, onClose}: { open: boolean, onClose: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState({error: false, text: ""})
  const {user, logout, updateUser} = useUser()
  const {values, handleChange, onChange, handleSubmit} = useForm({
    name: user.name,
    email: user.email,
    username: user.username
  })

  useEffect(() => {
    handleChange({name: user.name, username: user.username, email: user.email})
  }, [open])

  const onSubmit = () => {
    setLoading(true)
    API.users.updateProfile(values)
      .then((res) => {
        setResponse({error: res.error, text: res.message});
        if (values.username !== user.username)
          setTimeout(logout, 2000)
        updateUser({...user, ...values})
      })
      .catch(() => setResponse({error: true, text: "Something went wrong, Please try again!"}))
      .finally(() => setLoading(false))
  }

  return <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant={"h5"}>Update Profile</Typography>
          {response.text &&
            <Typography variant={"h6"} color={response.error ? "error" : "green"}>{response.text}</Typography>}
          <Username username={values.username} onChange={onChange("username")} onError={setError}
                    excludeCurrent={true}/>
          <TextField label="Name" required value={values.name} onChange={onChange("name")} variant="outlined"/>
          <TextField type={"email"} label="Email" required value={values.email} onChange={onChange("email")}
                     variant="outlined"/>
          <LoadingButton type={"submit"} size={"large"} loading={loading} loadingIndicator="Updating..."
                         variant="contained" disabled={error}>
            Update Profile
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  </Modal>
}

export default UpdateProfileModal