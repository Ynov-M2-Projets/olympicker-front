import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext/UserContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SettingsIcon from '@mui/icons-material/Settings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TabPanel, {a11yProps} from "../../utils/tabs";
import ProfileGeneralForm from "./ProfileGeneralForm";

export default function Profile(){
    const {user, logining} = useContext(UserContext);
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    if(logining) return <>Chargement...</>;
    if(!user) return <></>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="div">
                Profil de {user.email}
            </Typography>
            <Tabs value={tab} onChange={handleChange} aria-label="icon label tabs">
                <Tab icon={<SettingsIcon />} iconPosition="start" label="Général" {...a11yProps(0)} />
                <Tab icon={<VpnKeyIcon />} iconPosition="start" label="Sécurité" {...a11yProps(1)}/>
            </Tabs>
            <TabPanel value={tab} index={0}>
                <ProfileGeneralForm/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                Item Two
            </TabPanel>
        </Container>
    );
}