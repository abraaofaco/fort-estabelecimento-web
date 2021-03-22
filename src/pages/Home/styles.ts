import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: var(--orange700);
  }

  button {
    width: unset;
    height: 40px;
    background: var(--green800);

    & + button {
      margin-left: 8px;
    }
  }
`;

export const NoRegistry = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  color: var(--grey500);

  svg {
    font-size: 150px;
  }
`;

export const Establishment = styled.div`
  display: flex;
  flex: row;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey500);
  border-radius: 10px;
  padding: 10px 5px;
  margin-top: 10px;
`;

export const InfoAddress = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--grey700);
`;

export const ActionsAddress = styled.div`
  button {
    background: none;
    border: none;

    svg {
      color: var(--blue700);
    }

    & + button {
      margin-left: 10px;

      svg {
        color: var(--red700);
      }
    }
  }
`;
