import React, { createContext, useEffect, useState } from "react";
import { Container, Row, Column } from "./SportsStyles";
import { axios } from "../../utils/axios-client";
import Card from "../../components/card/Card";

const Sports = () => {
  const [card, setCard] = useState([]);

  const loadList = () => {
    axios
      .get("/events")
      .then((result) => {
        const options = [];
        result.data.forEach((element) => {
          options.push(
            <Column>
              <Card
                titre={element.name}
                text={element.description}
                imgTitle="green iguana"
                imgPath="/logo192.png"
              ></Card>
            </Column>
          );
        });
        setCard(options);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadList();
  }, []);
  return (
    <div style={{marginBottom: "3%"}}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3 rem",
        }}
      >
        List des sports
      </h1>
      <Container>
        <Row>{card}</Row>
      </Container>
    </div>
  );
};
export default Sports;
