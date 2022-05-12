import styled from "styled-components";

export const Grid = styled.div`
  margin: 2vh 1vw 0 1vw;
  max-height: 70vh;
  overflow-y: auto;
`;

export const Row = styled.div`
  display: flex;
  background-color: ${(props) => (props?.key % 2 === 0 ? "#ddd" : "#eee")};
  margin-bottom: 15px;
`;

export const RowHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
  color: #ddd;
  background-color: #343a40;
  position: sticky;
  top: 0;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
  text-align: left;
  padding: 10px;
  border-right: 1px solid #000;
`;

export const IconWrapper = styled.div`
  padding: 5px;
  cursor: pointer;
  margin-right: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
