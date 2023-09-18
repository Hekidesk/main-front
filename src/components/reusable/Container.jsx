import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  ${props => props.showDownCounter && 'filter: blur(10px);'}
`;

export const ContainerWithoutHeight = styled.div`
  display: grid;
  place-items: center;
`;
