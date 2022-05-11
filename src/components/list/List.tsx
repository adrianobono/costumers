import React, { useState } from "react";
import { READ_COSTUMERS } from "../../api/costumers";
import { useQuery } from "@apollo/client";
import EditCrud from "../edit/Edit";
import DeleteCrud from "../delete/Delete";
import { Grid, Row, RowHeader, Col, IconWrapper } from "../styles/List.style";
import { ReactComponent as AddIcon } from "../../svg/add.svg";
import { ReactComponent as DelIcon } from "../../svg/delete.svg";
import { ReactComponent as EditIcon } from "../../svg/edit.svg";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

interface ICostumer {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
}

function List() {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [client, setClient] = useState({});
  const [content, setContent] = useState(EditCrud());
  const { loading, error, data } = useQuery(READ_COSTUMERS);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      <RowHeader>
        <Col size={3}>Name</Col>
        <Col size={3}>E-mail</Col>
        <Col size={2}>Phone</Col>
        <Col size={1}>Age</Col>
        <Col size={1}>Actions</Col>
      </RowHeader>
      {data.costumers.map((item: ICostumer, index: number) => (
        <Row key={index}>
          <Col size={3}>{item.name}</Col>
          <Col size={3}>{item.email}</Col>
          <Col size={2}>{item.phone}</Col>
          <Col size={1}>{item.age}</Col>
          <Col size={1}>
            <Row>
              <IconWrapper>
                <EditIcon
                  onClick={() => {
                    setIsOpen(true);
                    setAction("upt");
                    setClient(item);
                  }}
                />
              </IconWrapper>
              <IconWrapper>
                <DelIcon
                  onClick={() => {
                    setIsOpen(true);
                    setAction("del");
                    setClient(item);
                    setContent(DeleteCrud());
                  }}
                />
              </IconWrapper>
            </Row>
          </Col>
        </Row>
      ))}
      <Modal
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
        action={action}
        client={client}
      >
        {content}
      </Modal>
    </Grid>
  );
}

export default List;
