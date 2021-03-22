import styled, { css } from "styled-components";
import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--green200);
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid var(--green200);
  color: var(--green500);
  display: flex;
  align-items: center;
  margin-top: 8px;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--red700);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--orange700);
      border-color: var(--orange700);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--orange700);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--green500);
    overflow: hidden;

    &::placeholder {
      color: var(--green500);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
    color: var(--red700);
  }

  span {
    background: var(--red700);
    color: var(--white);

    &::before {
      border-color: var(--red700) transparent;
    }
  }
`;
