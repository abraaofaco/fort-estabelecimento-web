import styled from "styled-components";

export const Container = styled.div`
  max-height: calc(100% + 55px);
  background: var(--grey200);
`;

export const Body = styled.div`
  width: 100%;
  min-height: calc(100% - 90px);
  max-width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  background: var(--white);
  border: 1px solid var(--grey500);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
`;
