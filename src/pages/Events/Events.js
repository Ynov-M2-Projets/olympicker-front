import React, { useEffect, useState } from "react";
import { Container, Row, Column } from "./EventsStyles";
import { axios } from "../../utils/axios-client";
import Card from "../../components/card/Card";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [card, setCard] = useState([]);
  const [cardFilter, setcardFilter] = useState([]);

  const navigate = useNavigate();

  const onViewEvent = (eve) => {
    navigate(`/events/${eve}`);
  };

  const loadList = () => {
    axios
      .get("/events")
      .then((result) => {
        const options = [];
        result.data.content.forEach((element) => {
          options.push(
            <Column key={`event-${element.id}`}>
              <Card
                titre={element.name}
                text={element.description}
                imgTitle="green iguana"
                imgPath="/logo192.png"
                id={element.id}
                onClickFunction={(index) => onViewEvent(index)}
              ></Card>
            </Column>
          );
        });
        setCard(options.reverse());
        setcardFilter(options);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadList();
  }, []);

  const eventSearch = (value) => {
    const options = [];
    cardFilter.forEach((element) => {
      const elementCard = element.props.children.props;

      const valueUp = value.toUpperCase();
      const name = elementCard.titre.toUpperCase();
      const desc = elementCard.text.toUpperCase();
      if (name.indexOf(valueUp) > -1 || desc.indexOf(valueUp) > -1) {
        options.push(element);
      }
    });
    setCard([]);
    setCard(options);
  };

  return (
    <div style={{ marginBottom: "3%" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3 rem",
        }}
      >
        Liste des événements
      </h1>
      <TextField
        id="event-search"
        label="Recherche"
        type="search"
        variant="standard"
        onChange={(e) => {
          eventSearch(e.target.value);
        }}
        style={{
          marginBottom: "2%",
          marginLeft: "43%",
        }}
      />
      <Container>
        <Row>{card}</Row>
      </Container>
    </div>
  );
};
export default Events;
