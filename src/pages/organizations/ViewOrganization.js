import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {axios, axiosHeaders} from "../../utils/axios-client";
import PageContainer from "../../components/Layout/PageContainer";
import {UserContext} from "../../context/userContext/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import OrganizationFormDialog from "../../components/dialog/organization/OrganizationFormDialog";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventIcon from '@mui/icons-material/Event';
import TabPanel, {a11yProps} from "../../utils/tabs";
import GroupIcon from "@mui/icons-material/Group";
import UsersTable from "../../components/table/UsersTable";
import EventsTable from "../../components/table/EventsTable";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EventFormDialog from "../../components/dialog/event/EventFormDialog";

export default function ViewOrganization() {
    const params = useParams();
    const {user} = useContext(UserContext);
    const [tab, setTab] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [organization, setOrganization] = useState(null);
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [joining, setJoining] = useState(false);
    const [leaving, setLeaving] = useState(false);

    //event
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [menuType, setMenuType] = useState('simple');
    const [openEventDialog, setOpenEventDialog] = useState(false);

    useEffect(() => {
        async function fetchData(){
            setFetching(true);
            await axios.get(`/orgs/${params.organizationId}`,{...axiosHeaders()})
                .then(result => {
                    setOrganization(result.data);
                }).catch(console.error)
            await axios.get(`/orgs/${params.organizationId}/members`,{...axiosHeaders()})
                .then(result => {
                    setMembers(result.data);
                }).catch(console.error)
            await axios.get(`/orgs/${params.organizationId}/events`,{...axiosHeaders()})
                .then(result => {
                    setEvents(result.data);
                }).catch(console.error)
            setFetching(false);
        }
        fetchData();
    },[params, user])

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const onJoinOrganisation = () => {
        setJoining(true);
        axios.put(`/orgs/${organization.id}/add_member/${user.id}`,{},{...axiosHeaders()})
            .then(() => {
                setMembers(prev => [...prev, user]);
            }).catch(console.error).finally(() => setJoining(false))
    }

    const onLeaveOrganisation = () => {
        setLeaving(true);
        axios.put(`/orgs/${organization.id}/remove_member/${user.id}`,{},{...axiosHeaders()})
            .then(() => {
                setMembers(prev => prev.filter(member => member.id !== user.id));
            }).catch(console.error).finally(() => setLeaving(false))
    }

    const isMember = !!user && !!members.find(member => member.id === user.id);
    const isOwner = !!organization && !!user && organization.owner.id === user.id;

    const title = () => {
        if(!organization) return <></>;
        return (
            <div className="d-flex justify-center">
                <div className="my-auto">
                    Organisation : {organization.name}
                </div>
                {(isOwner) && (
                    <div className="my-auto ml-1">
                        <Tooltip title="Modifier l'organisation" placement="top">
                            <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <OrganizationFormDialog
                            organization={organization}
                            open={openDialog}
                            onClose={() => {setOpenDialog(false);}}
                            onActionEnd={(org) => setOrganization(org)}
                        />
                    </div>
                )}
                {(!isMember && !isOwner && user) && (
                    <div className="d-flex justify-center ml-2">
                        <LoadingButton
                            onClick={onJoinOrganisation}
                            loadingPosition="start"
                            loading={joining}
                            disabled={joining}
                            variant="contained"
                            startIcon={<AssignmentReturnIcon/>}
                        >
                            Rejoindre
                        </LoadingButton>
                    </div>
                )}
                {(isMember && !isOwner) && (
                    <div className="d-flex justify-center ml-2">
                        <LoadingButton
                            onClick={onLeaveOrganisation}
                            loadingPosition="start"
                            loading={leaving}
                            disabled={leaving}
                            variant="outlined"
                            startIcon={<CancelPresentationIcon/>}
                        >
                            Quitter
                        </LoadingButton>
                    </div>
                )}
            </div>
        );
    }

    const onSelectMenuItem = (type) => {
        setAnchorMenu(null);
        setMenuType(type);
        setOpenEventDialog(true);
    }

    const onNewEvent = (newEvent) => {
        setEvents(prev => [...prev, newEvent]);
    }
useEffect(() => console.log(events), [events])
    const eventMenu = (
        <div className="d-flex justify-center mb-1">
            <Button
                aria-controls="menu-event-type"
                aria-haspopup="true"
                variant="contained"
                startIcon={<KeyboardArrowDownIcon/>}
                aria-expanded={!!anchorMenu ? 'true' : undefined}
                onClick={(e) => setAnchorMenu(e.currentTarget)}
            >
                Nouvel évènement
            </Button>
            <Menu
                id="menu-event-type"
                anchorEl={anchorMenu}
                open={!!anchorMenu}
                onClose={() => setAnchorMenu(null)}
            >
                <MenuItem onClick={() => onSelectMenuItem('simple')}>Simple</MenuItem>
                <MenuItem onClick={() => onSelectMenuItem('stage')}>Etapes</MenuItem>
            </Menu>
            <EventFormDialog
                open={openEventDialog}
                type={menuType}
                onClose={() => setOpenEventDialog(false)}
                onActionEnd={onNewEvent}
                orgId={organization ? organization.id : null}
            />
        </div>
    );

    return (
        <PageContainer title={title()} loading={fetching}>
            {organization && (
                <>
                    <div className="py-2">
                        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={4} sm={2} md={2} className="font-bold">
                                Créateur
                            </Grid>
                            <Grid item xs={4} sm={6} md={10}>
                                {organization.owner.email}
                            </Grid>
                            <Grid item xs={4} sm={2} md={2} className="font-bold">
                                Description
                            </Grid>
                            <Grid item xs={4} sm={6} md={10}>
                                {organization.description}
                            </Grid>
                        </Grid>
                    </div>
                    <Divider/>
                    <Tabs value={tab} onChange={handleChange} aria-label="icon label tabs">
                        <Tab icon={<GroupIcon />} iconPosition="start" label="Membres" {...a11yProps(0)} />
                        <Tab icon={<EventIcon />} iconPosition="start" label="Evènements" {...a11yProps(1)}/>
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <UsersTable users={members}/>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        {isOwner && eventMenu}
                        <EventsTable events={events}/>
                    </TabPanel>
                </>
            )}
        </PageContainer>
    );
}