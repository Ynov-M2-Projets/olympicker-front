import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Container, Row, Column } from "./HomeStyles";
import { axios } from "../../utils/axios-client";

const Home = () => {
  const [card, setCard] = useState([]);

  const loadList = () => {
    //TODO affiché que les 8 premier event 
    axios
      .get("/events")
      .then((result) => {
        console.log(result.data.content);
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

        setCard(options.reverse().slice(0,8));
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
