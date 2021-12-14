import * as React from "react";
import { FooterLink, Heading } from "./FooterStyles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: "10%",
}));

const Footer = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary" sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Container maxWidth="md">
          <h1
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Olympicker: site pour la référence sportive
          </h1>
          <Toolbar>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <Item>
                  <Heading>Services</Heading>
                  <FooterLink href="#">Compete</FooterLink>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Heading>Contact Us</Heading>
                  <FooterLink href="#">France</FooterLink>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <div>
                    <Heading>Social Media</Heading>
                    <FooterLink href="#">
                      <FacebookIcon />
                    </FooterLink>
                    <FooterLink href="#">
                      <InstagramIcon />
                    </FooterLink>
                    <FooterLink href="#">
                      <TwitterIcon />
                    </FooterLink>
                    <FooterLink href="#">
                      <YouTubeIcon />
                    </FooterLink>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Footer;
