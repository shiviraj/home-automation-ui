import {NextPage} from "next";
import {Button, Stack} from "@mui/material";
import {useUser} from "../../contexts/User";
import UpdatePasswordModal from "../../components/Profile/UpdatePasswordModal";
import {useState} from "react";
import UpdateProfileModal from "../../components/Profile/UpdateProfileModal";
import UserProfileCard from "../../components/Profile/UserProfileCard";

const ProfilePage: NextPage = () => {
  const {user} = useUser()
  const [open, setOpen] = useState({password: false, profile: false})
  return <Stack direction={"row"} justifyContent={"center"} m={2}>
    <UserProfileCard user={user}>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Button variant={"contained"} onClick={() => setOpen({...open, profile: true})}>Edit Profile</Button>
        <Button variant={"contained"} onClick={() => setOpen({...open, password: true})}>Change Password</Button>
      </Stack>
    </UserProfileCard>
    <UpdateProfileModal open={open.profile} onClose={() => setOpen({...open, profile: false})}/>
    <UpdatePasswordModal open={open.password} onClose={() => setOpen({...open, password: false})}/>
  </Stack>
}

export default ProfilePage
