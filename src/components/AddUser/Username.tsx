import {TextField} from '@mui/material';
import {useEffect, useState} from "react";
import API from "../../api/API";
import {useUser} from "../../contexts/User";

type UsernameInterface = { username: string, onChange: (event: any) => void, onError: (error: boolean) => void, excludeCurrent: boolean };

const Username = ({username, onChange, onError, excludeCurrent = false}: UsernameInterface) => {
  const [available, setAvailable] = useState(true)
  const {user} = useUser()

  useEffect(() => {
    if (username.trim())
      API.users.isUsernameAvailable(username.trim())
        .then(({status}: { status: boolean }) => {
          setAvailable(excludeCurrent ? username === user.username || status : status)
          onError(!(excludeCurrent ? username === user.username || status : status))
        })
  }, [username])

  return <TextField label="Username" required value={username} onChange={onChange}
                    variant="outlined" error={!available} helperText={!available && "username is already taken!"}/>
};

export default Username;