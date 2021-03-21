import styled from "styled-components";

export const Container = styled.div`
  > h2 {
    color: #ff9000;
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

export const Addresse = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 5px;
  margin-top: 10px;
`;

export const InfoAddresse = styled.div`
  display: flex;
  flex-direction: column;
  color: #999;
`;

export const ActionsAddresse = styled.div`
  button {
    background: none;
    border: none;

    & + button {
      margin-left: 10px;
    }
  }
`;
