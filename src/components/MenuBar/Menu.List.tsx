const menuListUser: Array<{ label: string, link: string }> = [
  {link: '/', label: 'Home'},
  {link: '/tasks', label: "Tasks"},
  {link: '/profile', label: 'Profile'},
];

const menuListAdmin: Array<{ label: string, link: string }> = [
  {link: '/', label: "Home"},
  {link: '/users', label: "Users"},
  {link: '/tasks', label: "Tasks"},
  {link: '/profile', label: "Profile"}
]

const getMenuList = (role: "ADMIN" | "USER"): Array<{ label: string, link: string }> => {
  return role === "ADMIN" ? menuListAdmin : menuListUser;
}

export default getMenuList;