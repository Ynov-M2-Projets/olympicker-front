import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <div className="mt-auto" style={{backgroundColor: theme.palette.primary}}>
      <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4} className="text-center">
          <div>
            <div>Services</div>
            <div data-href="#">Compete</div>
          </div>
        </Grid>
        <Grid item xs={4} className="text-center">
          <div>
            <div>Contact Us</div>
            <div data-href="#">France</div>
          </div>
        </Grid>
        <Grid item xs={4} className="d-flex justify-center">
          <div className="text-center">
            <div>Social Media</div>
            <div className="d-flex">
              <div data-href="#">
                <FacebookIcon />
              </div>
              <div data-href="#">
                <InstagramIcon />
              </div>
              <div data-href="#">
                <TwitterIcon />
              </div>
              <div data-href="#">
                <YouTubeIcon />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
