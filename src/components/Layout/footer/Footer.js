import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid from "@mui/material/Grid";
import {makeStyles, createStyles} from "@mui/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        marginTop: 'auto',
        paddingTop: '0.5em',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      },
      linkHover: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'inherit',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          color: theme.palette.secondary.main
        }
      }
    }),
);

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4} className="text-center">
          <div>
            <div className="font-bold mb-1">Services</div>
            <a className={classes.linkHover} href="#">Compete</a>
          </div>
        </Grid>
        <Grid item xs={4} className="text-center">
          <div>
            <div className="font-bold mb-1">Contact Us</div>
            <a className={classes.linkHover} href="#">France</a>
          </div>
        </Grid>
        <Grid item xs={4} className="d-flex justify-center">
          <div className="text-center">
            <div className="font-bold mb-1">Social Media</div>
            <div className="d-flex">
              <a className={classes.linkHover} href="#">
                <FacebookIcon />
              </a>
              <a className={classes.linkHover} href="#">
                <InstagramIcon />
              </a>
              <a className={classes.linkHover} href="#">
                <TwitterIcon />
              </a>
              <a className={classes.linkHover} href="#">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
