import {NextPage} from "next";
import {useEffect, useState} from "react";
import {User} from "../../contexts/User";
import {Button, Stack} from "@mui/material";
import API from "../../api/API";
import {Add} from "@mui/icons-material";
import Link from "next/link";
import UserProfileCard from "../../components/Profile/UserProfileCard";

const UsersPage: NextPage = () => {
  const [users, setUsers] = useState([] as Array<User>)

  useEffect(() => {
    API.users.getUsers()
      .then((allUsers) => setUsers(allUsers))
  }, [])

  return <Stack>
    <Stack direction={"row"} justifyContent={"right"} m={1}>
      <Link href={"/users/add"}>
        <div>
          <Button startIcon={<Add/>} variant={"contained"}>Add User</Button>
        </div>
      </Link>
    </Stack>
    <Stack spacing={2} direction={"row"} justifyContent={"center"} flexWrap={"wrap"}>
      {users.map((user: User) => <UserProfileCard user={user} key={user.username}></UserProfileCard>)}
    </Stack>
  </Stack>;
}

export default UsersPage;