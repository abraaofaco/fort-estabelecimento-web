import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    color: #6ea06f;
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
`;
