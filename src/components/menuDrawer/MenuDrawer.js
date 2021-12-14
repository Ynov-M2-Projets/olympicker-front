import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {useContext} from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import {UserContext} from "../../context/userContext/UserContext";
import { Link } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const mainLinks = [
    {text: 'Accueil', link: '/', icon: <HomeIcon/>},
    {text: 'Sports', link: '/sports', icon: <SportsHandballIcon/>},
    {text: 'Evénements', link: '/events', icon: <AccountTreeIcon/>},
];

export default function MenuDrawer({open, toggleCallback}){
    const {user, logout} = useContext(UserContext);

    const toggleDrawer = (value) => () => {
        toggleCallback(value);
    };

    return (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {mainLinks.map(link => (
                        <ListItem key={link.text} button component={Link} to={link.link}>
                            <ListItemIcon>{link.icon}</ListItemIcon>
                            <ListItemText primary={link.text} />
                        </ListItem>
                    ))}
                </List>
                {user && (
                    <>
                        <Divider />
                        <List>
                            <ListItem button component={Link} to="/profile">
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Profil" />
                            </ListItem>
                            <ListItem button onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Déconnexion" />
                            </ListItem>
                        </List>
                    </>
                )}
            </Box>
        </SwipeableDrawer>
    );
}