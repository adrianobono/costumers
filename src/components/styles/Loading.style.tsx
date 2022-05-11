import styled, { keyframes } from "styled-components";

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(100vh / 2 - 60px);
`;

const BounceAnimation = () => keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

export const Dot = styled.div`
  background-color: #007bff;
  border-radius: 50%;
  width: 0.35rem;
  height: 0.35rem;
  margin: 0.25rem;
  margin-top: 10px;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
