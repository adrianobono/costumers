import styled from "styled-components";

export const Grid = styled.div``;

export const Row = styled.div`
  display: flex;
  background-color: ${(props) => (props?.key % 2 ? "#ddd" : "#eee")};
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;
