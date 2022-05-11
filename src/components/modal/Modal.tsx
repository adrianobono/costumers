import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./ReactPortal";
import "./modalStyles.css";
import { Grid, Row, RowHeader, Col, IconWrapper } from "../styles/List.style";
import { ReactComponent as AddIcon } from "../../svg/add.svg";
import { keyboardKey } from "@testing-library/user-event";
import {
  REMOVE_COSTUMER,
  UPDATE_COSTUMER,
  READ_COSTUMERS,
} from "../../api/costumers";
import { useMutation } from "@apollo/client";
import { Form, Input, Label } from "../styles/Crud.style";
import { json } from "stream/consumers";

function Modal({ children, isOpen, handleClose, client, action }) {
  const [costumer, setCostumer] = useState(client);
  const [delCostumer, { loading: deleting, error: deleteError }] =
    useMutation(REMOVE_COSTUMER);

  const [updateCostumer, { loading: updating, error: updateError }] =
    useMutation(UPDATE_COSTUMER);

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

  const updateData = () => {
    const fechData = client.readQuery({
      query: READ_COSTUMERS,
    });
  };
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
          <button onClick={handleClose} className="close-btn">
            Close
          </button>

          <div className="modal-content">
            {action === "del" ? children : ""}

            {action === "upt" && costumer && Object.keys(costumer).length > 0 && (
              <Form
                onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    name: { value: string };
                    email: { value: string };
                    phone: { value: string };
                    age: { value: number };
                  };
                }}
              >
                <Label>
                  Name:
                  <Input
                    type="text"
                    name="name"
                    placeholder={client.name}
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
                      placeholder={client.email}
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
                      placeholder={client.phone}
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
                      placeholder={client.age}
                      onChange={(e) => {
                        setCostumer({
                          ...costumer,
                          ["age"]:
                            e.target.value.length > 0
                              ? e.target.value
                              : client.age,
                        });
                      }}
                    />
                  </Label>
                </div>

                <div>
                  {JSON.stringify(client) !== JSON.stringify(costumer) && (
                    <button
                      onClick={() =>
                        updateCostumer({
                          variables: {
                            id: costumer.id,
                            name: costumer.name,
                            email: costumer.email,
                            phone: costumer.phone,
                            age: costumer.age,
                          },
                        })
                      }
                    >
                    
                      Update
                    </button>
                  )}
                </div>
              </Form>
            )}

            {action === "del" && (
              <div>
                <button
                  onClick={() =>
                    delCostumer({
                      variables: { id: client.id },
                    })
                  }
                >
                  Ok
                </button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
export default Modal;
