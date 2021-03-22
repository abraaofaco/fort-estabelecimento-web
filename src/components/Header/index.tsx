import React from "react";
import { RiBankFill } from "react-icons/ri";
import { MdSettingsPower } from "react-icons/md";

import { Container, Logo } from "./styles";
import { useAuth } from "../../hooks/auth";

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <header>
        <Logo>
          <RiBankFill size={35} />
          <h3>
            Fort<span>Estabelecimento</span>
          </h3>
        </Logo>
        <span>Olá, {user.name}</span>
        <button type="button" onClick={signOut}>
          <MdSettingsPower size={30} />
        </button>
      </header>
    </Container>
  );
};

export default Header;
