import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Container, Row, Column } from "./HomeStyles";
import { axios } from "../../utils/axios-client";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [card, setCard] = useState([]);

  const navigate = useNavigate();

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
              />
            </Column>
          );
        });

        setCard(options.reverse().slice(0,8));
      })
      .catch(console.error);
  };

  const onViewEvent = (eve) => {
    navigate(`/events/${eve}`);
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
