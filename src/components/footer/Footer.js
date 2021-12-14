import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "green",
				textAlign: "center",
				marginTop: "-50px",
                fontSize: "1.5rem"}}>
		Olympicker: site pour la référence sportive
	</h1>
	<Container>
		<Row>
            <Column>
                <Heading>Services</Heading>
                <FooterLink href="#">Compete</FooterLink>
            </Column>
            <Column>
                <Heading>Contact Us</Heading>
                <FooterLink href="#">France</FooterLink>
            </Column>
            <div>
                <Heading>Social Media</Heading>
                <FooterLink href="#">
                    <FacebookIcon/>
                </FooterLink>
                <FooterLink href="#">
                    <InstagramIcon/>
                </FooterLink>
                <FooterLink href="#">
                    <TwitterIcon/>
                </FooterLink>
                <FooterLink href="#">
                    <YouTubeIcon/>
                </FooterLink>
            </div>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
