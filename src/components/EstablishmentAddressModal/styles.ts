import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: var(--orange700);
    padding-bottom: 20px;
  }

  > button {
    background: none;
    border: none;
    align-self: flex-end;
  }
`;

export const GroupH = styled.div`
  display: flex;
  flex-direction: row;
`;
