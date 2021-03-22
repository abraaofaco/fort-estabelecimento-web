import React from "react";
import Header from "../Header";

import { Container, Body } from "./styles";

const MasterPage: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
    </Container>
  );
};

export default MasterPage;
