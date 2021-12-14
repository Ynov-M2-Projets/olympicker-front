import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel, {a11yProps} from "../../utils/tabs";
import {useContext, useEffect, useState} from "react";
import PageContainer from "../../components/Layout/PageContainer";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import {axios, axiosHeaders} from "../../utils/axios-client";
import {UserContext} from "../../context/userContext/UserContext";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import NewOrganizationDialog from "../../components/dialog/organization/NewOrganizationDialog";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function LoggedUserOrganizations(){
    const {user} = useContext(UserContext);
    const [tab, setTab] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [openCreationDialog, setOpenCreationDialog] = useState(false);
    const [organizations, setOrganizations] = useState([]);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if(user){
            axios.get(`/users/${user.id}/organizations`, {...axiosHeaders})
                .then(result => {
                    setOrganizations(result.data);console.log(result.data)
                })
                .catch(console.error)
                .finally(() => {setFetching(false)})
        }
    }, [user])

    const title = (
        <div className="d-flex justify-center">
            <span className="mr-1 my-auto">Mes organisations</span>
            <Tooltip title="Nouvelle organisation" placement="top">
                <IconButton
                    onClick={() => setOpenCreationDialog(true)}
                    color="primary"
                    aria-label="create organisation"
                    component="span"
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </div>
    );

    return (
        <PageContainer title={title} loading={fetching}>
            <Tabs value={tab} onChange={handleChange} aria-label="icon label tabs">
                <Tab icon={<AssignmentIndIcon />} iconPosition="start" label="Je suis créateur" {...a11yProps(0)} />
                <Tab icon={<GroupIcon />} iconPosition="start" label="Je suis membre" {...a11yProps(1)}/>
            </Tabs>
            <TabPanel value={tab} index={0}>
                <OrganizationTable organizations={organizations.filter(org => org.owner.id === user.id)}/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <OrganizationTable organizations={organizations.filter(org => org.owner.id !== user.id)}/>
            </TabPanel>
            <NewOrganizationDialog
                open={openCreationDialog}
                onClose={() => setOpenCreationDialog(false)}
                onActionEnd={(newOrganization) => {
                    setOrganizations(prev => ([...prev, newOrganization]));
                }}
            />
        </PageContainer>
    );
}

function OrganizationTable({organizations = []}){
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Createur</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizations.map(org => (
                        <TableRow
                            hover
                            key={org.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{org.name}</TableCell>
                            <TableCell align="left">
                                {org.description.length > 20 ? org.description.substring(0,20) + '...' : org.description}
                            </TableCell>
                            <TableCell align="left">{org.owner.email ?? ''}</TableCell>
                            <TableCell>
                                <Tooltip title="Voir" placement="top">
                                    <IconButton color="primary" aria-label="see organization" component="span">
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Modifier" placement="top">
                                    <IconButton color="primary" aria-label="edit organization" component="span">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {organizations.length === 0 && <div className="text-center my-2">Aucune données</div>}
        </TableContainer>
    );
}