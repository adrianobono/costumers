import React from "react";
import START_COSTUMERS from "../../api/costumers";
import { useQuery, gql } from "@apollo/client";
import { Grid, Row, Col } from "../styles/List.style";

function List() {
  const { loading, error, data } = useQuery(START_COSTUMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      <Row>
        <Col size={2}>Nome</Col>
        <Col size={2}>E-mail</Col>
        <Col size={2}>Telefone</Col>
        <Col size={3}>Idade</Col>
        <Col size={2}>Ações</Col>
      </Row>
      {data.costumers.map((item: any, index: number) => (
        <Row key={index}>
          <Col size={2}>{item.name}</Col>
          <Col size={2}>{item.email}</Col>
          <Col size={2}>{item.phone}</Col>
          <Col size={3}>{item.age}</Col>
          <Col size={2}>Ações</Col>
        </Row>
      ))}
    </Grid>
  );
}

export default List;
