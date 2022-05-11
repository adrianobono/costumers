import React, { useState } from "react";
import { Form, Input, Label } from "../styles/Crud.style";

function EditCrud() {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  return (
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
      <div>
        <Label>
          Name:
          <Input type="text" name="name" />
        </Label>
      </div>
      <div>
        <Label>
          E-mail
          <Input type="email" name="email" />
        </Label>
      </div>

      <div>
        <Label>
          Phone:
          <Input type="phone" name="phone" />
        </Label>
      </div>

      <div>
        <Label>
          Age:
          <Input type="number" min={18} name="age" />
        </Label>
      </div>

      <div>
        <input type="submit" value="Updade" />
      </div>
    </Form>
  );
}

export default EditCrud;
