import styled from "styled-components";

export const Container = styled.div`
  min-height: 380px;
  display: flex;
  flex-direction: column;

  > button {
    background: none;
    border: none;
    align-self: flex-end;
  }

  h2 {
    color: var(--orange700);
    padding-bottom: 20px;
  }

  input {
    background: var(--green200);
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    border: 2px solid var(--green200);
    color: var(--green500);
  }
`;

export const NoRegistry = styled.div`
  margin-top: 20px;
  color: var(--grey500);
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
  color: var(--grey700);
  display: flex;
  flex-direction: column;
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
