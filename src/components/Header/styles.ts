import styled from "styled-components";

export const Container = styled.div`
  background: var(--green200);
  padding: 30px 30px 70px 30px;
  color: var(--green700);
  header {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: none;
      border: none;
      cursor: pointer;

      svg {
        color: var(--green700);
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    margin-left: 5px;
    font-family: "Fredoka One", cursive;

    span {
      color: var(--orange700);
    }
  }
`;
