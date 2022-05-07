import React from "react";
import START_COSTUMERS from "../../api/costumers";
import { useQuery, gql } from "@apollo/client";

function List() {
  const { loading, error, data } = useQuery(START_COSTUMERS);

  if (loading) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.costumers.map((item: any, index: number) => (
    <div key={index}>
      <p>{item.name}</p>
      <p>{item.phone}</p>
      <p>{item.email}</p>
      <p>{item.age}</p>
    </div>
  ));
}

export default List
