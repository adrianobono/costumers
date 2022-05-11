import { gql } from "@apollo/client";

export const READ_COSTUMERS = gql`
  {
    costumers {
      id
      name
      phone
      email
      age
    }
  }
`;

export const UPDATE_COSTUMERS = gql`
  {
    costumers {
      name
      phone
      email
      age
    }
  }
`;

export const REMOVE_COSTUMER = gql`
  mutation Delete($id: Int) {
    delete(id: $id) {
      id
    }
  }
`;

export const UPDATE_COSTUMER = gql`
  mutation Update(
    $id: Int
    $name: String
    $email: String
    $phone: String
    $age: Int
  ) {
    update(id: $id, name: $name, email: $email, phone: $phone, age: $age) {
      id
      name
      phone
      email
      age
    }
  }
`;
