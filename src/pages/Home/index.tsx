import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import Button from "../../components/Button";
import {
  EstablishmentAddressModal,
  IResponseEstablishment,
} from "../../components/EstablishmentAddressModal";
import MasterPage from "../../components/MasterPage";
import api from "../../services/api";

import {
  Container,
  Header,
  Establishment,
  Address,
  InfoAddress,
  ActionsAddress,
} from "./styles";

const Home: React.FC = () => {
  const [establishments, setEstablishments] = useState<
    IResponseEstablishment[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get("/establishments").then((response) => {
      setEstablishments(response.data);
    });
  }, []);

  const handleCallbackSaveAddress = useCallback(
    (data: IResponseEstablishment) => {
      let newEstablishments: IResponseEstablishment[];

      const findEstablishment = establishments.find((f) => f.id === data.id);
      if (findEstablishment) {
        newEstablishments = establishments.map((establishment) =>
          establishment.id !== findEstablishment.id
            ? establishment
            : Object.assign(establishment, {
                addresses: [...data.addresses, ...establishment.addresses],
              })
        );
      } else {
        newEstablishments = [data, ...establishments];
      }

      newEstablishments = newEstablishments.filter(
        (f) => f.addresses.length > 0
      );

      setEstablishments(newEstablishments);
      setIsModalOpen(false);
    },
    [establishments]
  );

  return (
    <MasterPage>
      <Container>
        <Header>
          <h2>Estabelecimentos</h2>
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            Cadastrar
          </Button>
        </Header>

        {establishments
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((establishment) => (
            <div key={establishment.id}>
              <Establishment>
                <h4>{establishment.name}</h4>
              </Establishment>
              {establishment.addresses
                .sort((a, b) => a.address.localeCompare(b.address))
                .map((addresse) => (
                  <Address key={addresse.id}>
                    <InfoAddress>
                      <span>{`${addresse.address}, ${addresse.number}, ${addresse.district}`}</span>
                      <span>{`${addresse.city}, ${addresse.state}/${addresse.country}`}</span>
                    </InfoAddress>
                    <ActionsAddress>
                      <button type="button">
                        <RiEditBoxFill size={25} />
                      </button>
                      <button type="button">
                        <IoTrashBin size={25} />
                      </button>
                    </ActionsAddress>
                  </Address>
                ))}
            </div>
          ))}
      </Container>
      <EstablishmentAddressModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSaveCallback={handleCallbackSaveAddress}
      />
    </MasterPage>
  );
};

export default Home;
