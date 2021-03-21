import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import MasterPage from "../../components/MasterPage";
import api from "../../services/api";

import {
  Container,
  Establishment,
  Addresse,
  InfoAddresse,
  ActionsAddresse,
} from "./styles";

interface IAddresse {
  id: string;
  establishmentId: string;
  addresse: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

interface IEstablishment {
  id: string;
  name: string;
  addresses: IAddresse[];
}

const Home: React.FC = () => {
  const [establishments, setEstablishments] = useState<IEstablishment[]>([]);

  useEffect(() => {
    api.get("/establishments").then((response) => {
      setEstablishments(response.data);
    });
  }, []);

  return (
    <MasterPage>
      <Container>
        <h2>Estabelecimentos</h2>
        {establishments.map((establishment) => (
          <div key={establishment.id}>
            <Establishment>
              <h4>{establishment.name}</h4>
            </Establishment>
            {establishment.addresses.map((addresse) => (
              <Addresse key={addresse.id}>
                <InfoAddresse>
                  <span>{`${addresse.addresse}, ${addresse.number}, ${addresse.district}`}</span>
                  <span>{`${addresse.city}, ${addresse.state}/${addresse.country}`}</span>
                </InfoAddresse>
                <ActionsAddresse>
                  <button type="button">
                    <RiEditBoxFill size={25} color="#378fbf" />
                  </button>
                  <button type="button">
                    <IoTrashBin size={25} color="#c53030" />
                  </button>
                </ActionsAddresse>
              </Addresse>
            ))}
          </div>
        ))}
      </Container>
    </MasterPage>
  );
};

export default Home;
