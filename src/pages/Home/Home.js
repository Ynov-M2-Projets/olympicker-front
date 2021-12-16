import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Container, Row, Column } from "./HomeStyles";
import { axios } from "../../utils/axios-client";

const Home = () => {
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
              />
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
        Découvrir l'univers du sport
      </h1>
      <Container>
        <Row>{card}</Row>
      </Container>
    </div>
  );
};
export default Home;
