import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { axios, axiosHeaders } from "../../utils/axios-client";
import PageContainer from "../../components/Layout/PageContainer";
import { UserContext } from "../../context/userContext/UserContext";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel, { a11yProps } from "../../utils/tabs";
import GroupIcon from "@mui/icons-material/Group";
import ParticipatingTable from "../../components/table/ParticipatingTable";
import LoadingButton from "@mui/lab/LoadingButton";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export default function ViewEvent() {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      await axios
        .get(`/events/${params.eventId}`, { ...axiosHeaders })
        .then((result) => {
          setEvent(result.data);
        })
        .catch(console.error);
      await axios.get(`/events/${params.eventId}/participants`,{...axiosHeaders})
          .then(result => {
              setMembers(result.data);
          }).catch(console.error)
      setFetching(false);
    }
    fetchData();
  }, [params, user]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const onJoinEvent = () => {
    setJoining(true);
    axios
      .get(`/events/${event.id}/join`, { ...axiosHeaders })
      .then(() => {
        setMembers((prev) => [...prev, user]);
      })
      .catch(console.error)
      .finally(() => setJoining(false));
  };

  const onLeaveEvent = () => {
    setLeaving(true);
    axios
      .get(`/events/${event.id}/leave`, { ...axiosHeaders })
      .then(() => {
        setMembers((prev) => prev.filter((member) => member.id !== user.id));
      })
      .catch(console.error)
      .finally(() => setLeaving(false));
  };
  const isMember = !!user && !!members.find((member) => member.id === user.id);

  const title = () => {
    if (!event) return <></>;
    return (
      <div className="d-flex justify-center">
        <div className="my-auto">Evénement : {event.name}</div>
        {!isMember && user && (
          <div className="d-flex justify-center ml-2">
            <LoadingButton
              onClick={onJoinEvent}
              loadingPosition="start"
              loading={joining}
              disabled={joining}
              variant="contained"
              startIcon={<AssignmentReturnIcon />}
            >
              Rejoindre
            </LoadingButton>
          </div>
        )}
        {isMember && (
          <div className="d-flex justify-center ml-2">
            <LoadingButton
              onClick={onLeaveEvent}
              loadingPosition="start"
              loading={leaving}
              disabled={leaving}
              variant="outlined"
              startIcon={<CancelPresentationIcon />}
            >
              Quitter
            </LoadingButton>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageContainer title={title()} loading={fetching}>
      {event && (
        <>
          <div className="py-2">
            <Grid
              container
              spacing={{ xs: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={2} md={2} className="font-bold">
                Créateur
              </Grid>
              <Grid item xs={4} sm={6} md={10}>
                {event.organization.name}
              </Grid>
              <Grid item xs={4} sm={2} md={2} className="font-bold">
                Description
              </Grid>
              <Grid item xs={4} sm={6} md={10}>
                {event.description}
              </Grid>
              <Grid item xs={4} sm={2} md={2} className="font-bold">
                Sport
              </Grid>
              <Grid item xs={4} sm={6} md={10}>
                {event.sport.name}
              </Grid>
            </Grid>
          </div>
          <Divider />
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="icon label tabs"
          >
            <Tab
              icon={<GroupIcon />}
              iconPosition="start"
              label="Participant"
              {...a11yProps(0)}
            />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <ParticipatingTable users={members} />
          </TabPanel>
        </>
      )}
    </PageContainer>
  );
}
