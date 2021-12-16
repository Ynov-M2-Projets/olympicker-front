import React, { useEffect, useState } from "react";
import { Container, Row, Column } from "./EventsStyles";
import { axios } from "../../utils/axios-client";
import Card from "../../components/card/Card";
import { TextField } from "@mui/material";

const Events = () => {
  const [card, setCard] = useState([]);
  const [cardFilter, setcardFilter] = useState([]);

  const loadList = () => {
    axios
      .get("/events")
      .then((result) => {
        const options = [];
        result.data.content.forEach((element) => {
          options.push(
            <Column>
              <Card
                titre={element.name}
                text={element.description}
                imgTitle="green iguana"
                imgPath="/logo192.png"
              />
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

      var valueUp = value.toUpperCase();
      var name = elementCard.titre.toUpperCase();
      var desc = elementCard.text.toUpperCase();
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
        List des événements
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
