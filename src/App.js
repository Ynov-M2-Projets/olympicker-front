import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Home from "./pages/Home/Home";
import UserContextProvider from "./context/userContext/UserContext";
import Profile from "./pages/profile/Profile";
import Layout from "./components/Layout/Layout";
import Sports from "./pages/Sports/Sports";
import SnackbarContextProvider from "./context/snackbarContext/SnackbarContext";
import LoggedUserOrganizations from "./pages/organizations/LoggedUserOrganizations";
import ViewOrganization from "./pages/organizations/ViewOrganization";
import Events from './pages/Events/Events';
import ViewEvent from './pages/Events/ViewEvent';
import ViewSport from './pages/Sports/ViewSport';
import {ThemeProvider, createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
        secondary: {
            main: '#00acc1',
        },
    },
});

function App() {
  return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <UserContextProvider>
                  <SnackbarContextProvider>
                      <Layout>
                          <Routes>
                              <Route path="/" element={<Home/>} />
                              <Route path="/profile" element={<Profile/>} />
                              <Route path="/my-organizations" element={<LoggedUserOrganizations/>} />
                              <Route path="/organization/:organizationId" element={<ViewOrganization/>} />
                              <Route path="/sports" element={<Sports/>} />
                              <Route path="/sports/:sportId" element={<ViewSport/>} />
                              <Route path="/events" element={<Events/>} />
                              <Route path="/events/:eventId" element={<ViewEvent/>} />
                              <Route path="*" element={<>Not Found</>} />
                          </Routes>
                      </Layout>
                  </SnackbarContextProvider>
              </UserContextProvider>
          </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
