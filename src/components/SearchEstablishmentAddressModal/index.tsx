import React, { useEffect } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

import { useState } from "react";
import { Container, Establishment, Address, NoRegistry } from "./styles";
import api from "../../services/api";

interface IEstablishmentAddressModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface IAddresse {
  id: string;
  establishmentId: string;
  address: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

interface IResponseEstablishment {
  id: string;
  name: string;
  addresses: IAddresse[];
}

const SearchEstablishmentAddressModal: React.FC<IEstablishmentAddressModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [establishments, setEstablishments] = useState<
    IResponseEstablishment[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // TODO: Incluir debounce depois
    if (searchQuery.length > 0)
      api
        .get("/establishments/search", {
          params: {
            query: searchQuery,
          },
        })
        .then((response) => {
          setEstablishments(response.data);
        });
  }, [searchQuery]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <button type="button" onClick={onRequestClose}>
          <AiOutlineClose />
        </button>
        <h2>Pesquisar</h2>
        <input
          type="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          placeholder="Informe o endereço"
        />
        {establishments.length === 0 && searchQuery.length > 0 && (
          <NoRegistry>Nenhuma registro localizado</NoRegistry>
        )}

        {establishments
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((establishment) => (
            <div key={establishment.id}>
              <Establishment>
                <h5>{establishment.name}</h5>
              </Establishment>
              {establishment.addresses
                .sort((a, b) => a.address.localeCompare(b.address))
                .map((address) => (
                  <Address key={address.id}>
                    <span>
                      {`${address.address}, ${address.number || "s/n"}, ${
                        address.district
                      }, ${address.city}`}
                    </span>
                    <span>{`${address.state}/${address.country}`}</span>
                  </Address>
                ))}
            </div>
          ))}
      </Container>
    </Modal>
  );
};

export default SearchEstablishmentAddressModal;
