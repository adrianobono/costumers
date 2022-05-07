import { gql } from "@apollo/client";

const START_COSTUMERS = gql`
  {
    costumers {
      name
      phone
      email
      age
    }
  }
`;

const UPDATE_COSTUMERS = gql`
  {
    costumers {
      name
      phone
      email
      age
    }
  }
`;

export default START_COSTUMERS;
