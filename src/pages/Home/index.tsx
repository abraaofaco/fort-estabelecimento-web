import React from "react";
import Header from "../../components/Header";
import MasterPage from "../../components/MasterPage";

import { Container } from "./styles";

const Home: React.FC = () => {
  return (
    <MasterPage>
      <Container>
        <h2>Estabelecimentos</h2>
      </Container>
    </MasterPage>
  );
};

export default Home;
