import React, { useEffect, useState } from "react";
import { Container, Row, Column } from "./SportsStyles";
import { axios } from "../../utils/axios-client";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

const Sports = () => {
  const [card, setCard] = useState([]);

  const navigate = useNavigate();

  const loadList = () => {
    axios
      .get("/sports")
      .then((result) => {
        const options = [];
        result.data.forEach((element) => {
          options.push(
            <Column key={`sport-${element.id}`}>
              <Card
                titre={element.name}
                text={element.description}
                imgTitle="green iguana"
                imgPath="/logo192.png"
                id={element.id}
                onClickFunction={(index) => onViewSport(index)}
              ></Card>
            </Column>
          );
        });
        setCard(options);
      })
      .catch(console.error);
  };

  const onViewSport = (sport) => {
    navigate(`/sports/${sport}`);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div style={{ marginBottom: "3%" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3 rem",
        }}
      >
        Liste des sports
      </h1>
      <Container>
        <Row>{card}</Row>
      </Container>
    </div>
  );
};
export default Sports;
