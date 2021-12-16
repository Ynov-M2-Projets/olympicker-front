import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {axios, axiosHeaders} from "../../utils/axios-client";
import PageContainer from "../../components/Layout/PageContainer";
import {UserContext} from "../../context/userContext/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import OrganizationFormDialog from "../../components/dialog/organization/OrganizationFormDialog";

export default function ViewOrganization() {
    const params = useParams();
    const {user, logining} = useContext(UserContext);
    const [fetching, setFetching] = useState(true);
    const [organization, setOrganization] = useState(null);
    const [members, setMembers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    console.log(organization);

    useEffect(() => {
        async function fetchData(){
            setFetching(true);
            await axios.get(`/orgs/${params.organizationId}`,{...axiosHeaders})
                .then(result => {
                    setOrganization(result.data);
                }).catch(console.error)
            await axios.get(`/orgs/${params.organizationId}/members`,{...axiosHeaders})
                .then(result => {
                    setMembers(result.data);
                }).catch(console.error)
            setFetching(false);
        }
        fetchData();
    },[params])

    const title = () => {
        if(!organization) return <></>;
        return (
            <div className="d-flex justify-center">
                <div className="my-auto">
                    Organisation : {organization.name}
                </div>
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
            </div>
        );
    }

    return (
        <PageContainer title={title()} loading={fetching}>
            {members.length}
        </PageContainer>
    );
}