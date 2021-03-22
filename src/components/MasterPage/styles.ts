import styled from "styled-components";

export const Container = styled.div`
  background: var(--grey200);
`;

export const Body = styled.div`
  width: 100%;
  min-height: calc(100% - 95px);
  max-width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  background: var(--white);
  border: 1px solid var(--grey500);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  top: -40px;
`;
