import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  ${props => props.blurBackground && 'filter: blur(7px);'}
`;

export const ContainerWithoutHeight = styled.div`
  display: grid;
  place-items: center;
`;
