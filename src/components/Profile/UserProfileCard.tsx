import {PropsWithChildren} from "react";
import {User} from "../../contexts/User";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const UserProfileCard = ({children, user}: PropsWithChildren<{ user: User }>) => {
  return <Card sx={{maxWidth: 345}}>
    <CardMedia
      component="img"
      height="320"
      image={"/user.png"}
      alt={user.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">{user.name}</Typography>
      <Typography variant="body2" color="text.secondary"><b>Username:</b> {user.username}</Typography>
      <Typography variant="body2" color="text.secondary"><b>Name:</b> {user.name}</Typography>
      <Typography variant="body2" color="text.secondary"><b>Email:</b> {user.email}</Typography>
      <Typography variant="body2" color="text.secondary"><b>Role:</b> {user.role}</Typography>
    </CardContent>
    <CardActions>
      {children}
    </CardActions>
  </Card>
}

export default UserProfileCard