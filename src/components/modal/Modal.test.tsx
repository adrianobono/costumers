import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

const Modal = ({ onClose, children }) => {
  const el = document.createElement("div");

  modalRoot.appendChild(el);

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

test("modal com conteudo children o botao de sair", () => {
  const handleClose = jest.fn();

  const { getByText } = render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>
  );

  expect(getByText("test")).toBeTruthy();

  fireEvent.click(getByText(/close/i));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
