import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext/UserContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SettingsIcon from '@mui/icons-material/Settings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TabPanel, {a11yProps} from "../../utils/tabs";
import ProfileGeneralForm from "./ProfileGeneralForm";
import ProfileSecurityForm from "./ProfileSecurityForm";
import PageContainer from "../../components/Layout/PageContainer";

export default function Profile(){
    const {user, logining} = useContext(UserContext);
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    if(logining) return <>Chargement du profil...</>;
    if(!user) return <></>;

    return (
        <PageContainer title="Mon profil">
            <Tabs value={tab} onChange={handleChange} aria-label="icon label tabs">
                <Tab icon={<SettingsIcon />} iconPosition="start" label="Général" {...a11yProps(0)} />
                <Tab icon={<VpnKeyIcon />} iconPosition="start" label="Sécurité" {...a11yProps(1)}/>
            </Tabs>
            <TabPanel value={tab} index={0}>
                <ProfileGeneralForm/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <ProfileSecurityForm/>
            </TabPanel>
        </PageContainer>
    );
}