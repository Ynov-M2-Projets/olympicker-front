import {Link, useParams} from "react-router-dom";
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
import {displayDate} from "../../utils/date";
import DateRangeIcon from '@mui/icons-material/DateRange';
import StagesTable from "../../components/table/StagesTable";
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import StageFormDialog from "../../components/dialog/event/StageFormDialog";
import Rankings from "../../components/table/Rankings";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export default function ViewEvent() {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [openStageFormDialog, setOpenStageFormDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      await axios
        .get(`/events/${params.eventId}`, { ...axiosHeaders() })
        .then((result) => {
          setEvent(result.data);
        })
        .catch(console.error);
      await axios.get(`/events/${params.eventId}/participants`,{...axiosHeaders()})
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
      .get(`/events/${event.id}/join`, { ...axiosHeaders() })
      .then(() => {
        setMembers((prev) => [...prev, user]);
      })
      .catch(console.error)
      .finally(() => setJoining(false));
  };

  const onLeaveEvent = () => {
    setLeaving(true);
    axios
      .get(`/events/${event.id}/leave`, { ...axiosHeaders() })
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

  console.log(event);
  const isStageEvent = event && event.type === "STAGE";

  const handleNewStage = (newEvent) => {
      setEvent(newEvent);
  }

  const addStageButton = (
      <div className="d-flex justify-center mb-1">
          <Button variant="contained" onClick={() => setOpenStageFormDialog(true)}>Nouvelle étape</Button>
          <StageFormDialog
              open={openStageFormDialog}
              onClose={() => setOpenStageFormDialog(false)}
              eventId={event ? event.id : null}
              onSuccess={handleNewStage}
          />
      </div>
  );

  return (
    <PageContainer title={title()} loading={fetching}>
      {event && (
        <>
          <div className="py-2">
            <EventTypeView event={event}/>
          </div>
          <Divider />
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="icon label tabs"
          >
            <Tab icon={<GroupIcon />} iconPosition="start" label="Participant" {...a11yProps(0)}/>
              {isStageEvent ? <Tab icon={<DateRangeIcon />} iconPosition="start" label="Etapes" {...a11yProps(1)}/>
              : <Tab icon={<MilitaryTechIcon />} iconPosition="start" label="Classement" {...a11yProps(1)}/> }
          </Tabs>
          <TabPanel value={tab} index={0}>
            <ParticipatingTable users={members} />
          </TabPanel>
            <TabPanel value={tab} index={1}>
                {isStageEvent ? (
                    <>
                        {(event && user && user.id === event.organization.owner.id) && addStageButton}
                        <StagesTable stages={event.stages} type={event.type}/>
                    </>
                ) : (
                    <Rankings stage={event.stage}/>
                )}
            </TabPanel>
        </>
      )}
    </PageContainer>
  );
}

function EventTypeView({event}) {
  let dates;
  if(event.type === 'SIMPLE') dates = <SimpleEventViewDates event={event}/>;
  else dates = <StageEventViewDates event={event}/>
  return (
      <Grid
          container
          spacing={{ xs: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={2} md={2} className="font-bold">
          Organisation
        </Grid>
        <Grid item xs={4} sm={6} md={10}>
          <Link to={`/organization/${event.organization.id}`}>{event.organization.name}</Link>
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
        {dates}
      </Grid>
  );
}

function StageEventViewDates({event}){
  return (
      <>
        <Grid item xs={4} sm={2} md={2} className="font-bold">
          Date(s)
        </Grid>
        <Grid item xs={4} sm={6} md={10} className="d-flex">
            <div className="my-auto mr-1">
                du {event.startDate ? displayDate(event.startDate) : 'Indéfini'}{' '}
                au {event.endDate ? displayDate(event.endDate) : 'Indéfini'}
            </div>
            {(!event.startDate && !event.endDate) && (
                <Tooltip title="Renseignez des étapes pour définir les dates" placement="top">
                    <HelpIcon/>
                </Tooltip>
            )}
        </Grid>
      </>
  );
}

function SimpleEventViewDates({event}){
  return (
      <>
        <Grid item xs={4} sm={2} md={2} className="font-bold">
          Date
        </Grid>
        <Grid item xs={4} sm={6} md={10}>
          le {displayDate(event.stage.date) ?? 'Indéfini'}
        </Grid>
      </>
  );
}
