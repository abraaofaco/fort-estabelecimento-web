import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --green800: #2e656a;
    --green700: #138646;
    --green500: #6ea06f;
    --green200: #d5f8e7;
    --grey200: #f7f7f7;
    --grey700: #999999;
    --grey500: #cccccc;
    --red200: #fddede;
    --red700: #c53030;
    --blue200: #ebf8ff;
    --blue700: #3172b7;
    --orange700: #ff9000;
    --white: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    color: var(--green500);
    -webkit-font-smoothing: antialiased;
  }

  html, body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  html, body, #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .react-modal-overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items:center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--white);
    padding: 30px;
    position: relative;
    border-radius: 5px;
  }
`;
