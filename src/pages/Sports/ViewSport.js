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
import EventsTable from "../../components/table/EventsTable";

export default function ViewSport() {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [sport, setSport] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      await axios
        .get(`/sports/${params.sportId}`, { ...axiosHeaders() })
        .then((result) => {
          setSport(result.data);
        })
        .catch(console.error);
        await axios.get(`/sports/${params.sportId}/events`,{...axiosHeaders()})
            .then(result => {
                setEvents(result.data);
            }).catch(console.error)
      setFetching(false);
    }
    fetchData();
  }, [params, user]);

  const handleChange = (sport, newValue) => {
    setTab(newValue);
  };

  const title = () => {
    if (!sport) return <></>;
    return (
      <div className="d-flex justify-center">
        <div className="my-auto">Sport : {sport.name}</div>
      </div>
    );
  };

  return (
    <PageContainer title={title()} loading={fetching}>
      {sport && (
        <>
          <div className="py-2">
            <Grid
              container
              spacing={{ xs: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={2} md={2} className="font-bold">
                Description
              </Grid>
              <Grid item xs={4} sm={6} md={10}>
                {sport.description}
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
              label="Evénement"
              {...a11yProps(0)}
            />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <EventsTable events={events} displaySport={false} />
          </TabPanel>
        </>
      )}
    </PageContainer>
  );
}
