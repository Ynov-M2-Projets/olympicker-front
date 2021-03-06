import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => props.onClickFunction(props.id)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.imgPath}
            alt={props.imgTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.titre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.text}
            </Typography>
          </CardContent>
        </CardActionArea>
    </Card>
  );
}
