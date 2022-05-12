import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./ReactPortal";
import "./modalStyles.css";
import { keyboardKey } from "@testing-library/user-event";
import {
  ADD_COSTUMERS,
  UPDATE_COSTUMER,
  READ_COSTUMERS,
  REMOVE_COSTUMER,
} from "../../api/costumers";
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Form, Input, Label } from "../styles/Crud.style";

function Modal({ children, isOpen, handleClose, client, action }) {
  const clientApollo = new ApolloClient({
    // uri: "http://localhost:4000/api",
    uri: "https://104.236.104.169:4000/api",
    cache: new InMemoryCache(),
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  const [costumer, setCostumer] = useState(client);

  const [delCostumer, { loading: deleting, error: deleteError }] = useMutation(
    REMOVE_COSTUMER,
    {
      update(cache, { data }) {
        const costum: any = cache.readQuery({
          query: READ_COSTUMERS,
        });
        cache.writeQuery({
          query: READ_COSTUMERS,
          data: {
            costumers: costum.costumers.filter(
              (costumer: any) => costumer.id !== client.id
            ),
          },
        });
      },
    }
  );

  const [updateCostumer, { loading: updating, error: updateError }] =
    useMutation(UPDATE_COSTUMER, {
      update(cache, { data }) {
        const costum: any = cache.readQuery({
          query: READ_COSTUMERS,
        });

        cache.writeQuery({
          query: READ_COSTUMERS,
          data: {
            costumers: costum,
          },
        });
      },
    });

  const [addCostumer, { loading: adding, error: addError }] = useMutation(
    ADD_COSTUMERS,
    {
      update(cache, { data }) {
        const costum: any = cache.readQuery({
          query: ADD_COSTUMERS,
        });

        cache.writeQuery({
          query: ADD_COSTUMERS,
          data: {
            costumers: data.addCostumer,
            ...costum,
          },
        });
      },
    }
  );

  const nodeRef = useRef(null);
  useEffect(() => {
    setCostumer(client);
  }, [client]);

  useEffect(() => {
    const closeOnEscapeKey = (e: keyboardKey) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal-header">
            <button onClick={handleClose} className="close-btn">
              X
            </button>
          </div>
          <div className="modal-content">
            {action === "del" ? children : ""}

            {action !== "del" && costumer && Object.keys(costumer).length > 0 && (
              <Form ref={formRef}>
                <Label>
                  Name:
                  <Input
                    type="text"
                    name="name"
                    value={costumer.name}
                    onChange={(e) => {
                      setCostumer({
                        ...costumer,
                        ["name"]:
                          e.target.value.length > 0
                            ? e.target.value
                            : client.name,
                      });
                    }}
                  />
                </Label>

                <div>
                  <Label>
                    E-mail
                    <Input
                      type="email"
                      name="email"
                      value={costumer.email}
                      onChange={(e) => {
                        setCostumer({
                          ...costumer,
                          ["email"]:
                            e.target.value.length > 0
                              ? e.target.value
                              : client.email,
                        });
                      }}
                    />
                  </Label>
                </div>

                <div>
                  <Label>
                    Phone:
                    <Input
                      type="phone"
                      name="phone"
                      value={costumer.phone}
                      onChange={(e) => {
                        setCostumer({
                          ...costumer,
                          ["phone"]:
                            e.target.value.length > 0
                              ? e.target.value
                              : client.phone,
                        });
                      }}
                    />
                  </Label>
                </div>

                <div>
                  <Label>
                    Age:
                    <Input
                      type="number"
                      min={18}
                      name="age"
                      value={costumer.age}
                      onChange={(e) => {
                        setCostumer({
                          ...costumer,
                          ["age"]:
                            e.target.value.length > 0
                              ? Number(e.target.value)
                              : client.age,
                        });
                      }}
                    />
                  </Label>
                </div>

                <div>
                  {JSON.stringify(client) !== JSON.stringify(costumer) && (
                    <div className="modal-footer">
                      {action === "upt" && (
                        <button
                          className="act-btn"
                          onClick={() => {
                            updateCostumer({
                              variables: {
                                id: costumer.id,
                                name: costumer.name,
                                email: costumer.email,
                                phone: costumer.phone,
                                age: costumer.age,
                              },
                            });
                          }}
                        >
                          Update
                        </button>
                      )}

                      {action === "add" && (
                        <button
                          className="act-btn"
                          onClick={() => {
                            addCostumer({
                              variables: {
                                name: costumer.name,
                                email: costumer.email,
                                phone: costumer.phone,
                                age: costumer.age,
                              },
                            });
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </Form>
            )}

            {action === "del" && (
              <div className="modal-footer">
                <button
                  className="act-btn"
                  onClick={() => {
                    delCostumer({
                      variables: { id: client.id },
                    });
                  }}
                >
                  Ok
                </button>
                <button className="act-btn" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modal;
