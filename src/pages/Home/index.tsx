import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { FaRegSadTear } from "react-icons/fa";
import Button from "../../components/Button";
import {
  EstablishmentAddressModal,
  IEstablishmentAddressFormData,
  IResponseEstablishment,
} from "../../components/EstablishmentAddressModal";
import MasterPage from "../../components/MasterPage";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

import {
  Container,
  Header,
  Establishment,
  Address,
  InfoAddress,
  ActionsAddress,
  NoRegistry,
} from "./styles";
import SearchEstablishmentAddressModal from "../../components/SearchEstablishmentAddressModal";

const Home: React.FC = () => {
  const [establishments, setEstablishments] = useState<
    IResponseEstablishment[]
  >([]);

  const { addToast } = useToast();

  const [
    searchEstablishmentAddressModalOpen,
    setSearchEstablishmentAddressModalOpen,
  ] = useState(false);

  const [
    establishmentAddressModalOpen,
    setEstablishmentAddressModalOpen,
  ] = useState(false);

  const [
    selectAddress,
    setSelectAddress,
  ] = useState<IEstablishmentAddressFormData | null>(null);

  useEffect(() => {
    api.get("/establishments").then((response) => {
      setEstablishments(response.data);
    });
  }, []);

  const newStateInsertAddress = useCallback(
    (data: IResponseEstablishment) => {
      let newEstablishments: IResponseEstablishment[];

      const findEstablishment = establishments.find((f) => f.id === data.id);
      if (!findEstablishment) {
        newEstablishments = [data, ...establishments];
      } else {
        newEstablishments = establishments.map((establishment) =>
          establishment.id !== findEstablishment.id
            ? establishment
            : {
                ...establishment,
                addresses: [...data.addresses, ...establishment.addresses],
              }
        );
      }

      return newEstablishments;
    },
    [establishments]
  );

  const changeAddressOnly = useCallback(
    (data: IResponseEstablishment): IResponseEstablishment[] => {
      const newEstablishments = establishments.map((establishment) => {
        if (establishment.id !== selectAddress?.establishmentId)
          return establishment;

        const addresses = establishment.addresses.map((address) =>
          address.id === selectAddress.id ? data.addresses[0] : address
        );

        return { ...establishment, addresses };
      });

      return newEstablishments;
    },
    [establishments, selectAddress]
  );

  const changeWithMovingExistingEstablishment = useCallback(
    (data: IResponseEstablishment): IResponseEstablishment[] => {
      const newEstablishments = establishments.map((establishment) => {
        if (establishment.id === data.id) {
          return {
            ...establishment,
            addresses: [...data.addresses, ...establishment.addresses],
          };
        }

        if (establishment.id === selectAddress?.establishmentId) {
          const addresses = establishment.addresses.filter(
            (f) => f.id !== selectAddress.id
          );

          return { ...establishment, addresses };
        }

        return establishment;
      });

      return newEstablishments;
    },
    [establishments, selectAddress]
  );

  const changeAdressWithRegistrationEstablishment = useCallback(
    (data: IResponseEstablishment): IResponseEstablishment[] => {
      const newEstablishments = establishments.map((establishment) => {
        if (establishment.id === selectAddress?.establishmentId) {
          const addresses = establishment.addresses.filter(
            (f) => f.id !== selectAddress.id
          );

          return { ...establishment, addresses };
        }

        return establishment;
      });

      return [...newEstablishments, data];
    },
    [establishments, selectAddress]
  );

  const newStateUpdateAddress = useCallback(
    (data: IResponseEstablishment): IResponseEstablishment[] => {
      if (data.id === selectAddress?.establishmentId)
        return changeAddressOnly(data);

      const findEstablishment = establishments.find(
        (establishment) => establishment.id === data.id
      );

      if (findEstablishment) return changeWithMovingExistingEstablishment(data);

      return changeAdressWithRegistrationEstablishment(data);
    },
    [
      establishments,
      selectAddress,
      changeAddressOnly,
      changeWithMovingExistingEstablishment,
      changeAdressWithRegistrationEstablishment,
    ]
  );

  const handleCallbackSaveAddress = useCallback(
    (data: IResponseEstablishment) => {
      let newEstablishments: IResponseEstablishment[] = selectAddress
        ? newStateUpdateAddress(data)
        : newStateInsertAddress(data);

      newEstablishments = newEstablishments.filter(
        (f) => f.addresses.length > 0
      );

      setEstablishments(newEstablishments);
      setSelectAddress(null);
      setEstablishmentAddressModalOpen(false);
    },
    [selectAddress, newStateUpdateAddress, newStateInsertAddress]
  );

  const handleUpdateAddress = useCallback(
    (data: IEstablishmentAddressFormData) => {
      setSelectAddress(data);
      setEstablishmentAddressModalOpen(true);
    },
    []
  );

  const handleDeleteAddress = useCallback(
    async (addressId: string) => {
      try {
        await api.delete(`/establishments/${addressId}`);

        const newEstablishments = establishments
          .map((establishment) => {
            const addresses = establishment.addresses.filter(
              (a) => a.id !== addressId
            );

            return Object.assign(establishment, { addresses });
          })
          .filter((f) => f.addresses.length > 0);

        setEstablishments(newEstablishments);
      } catch (error) {
        addToast({
          type: "error",
          title: "Erro no cadastro",
          description:
            "Ocorreu um erro ao remover o endereço, tente novamente.",
        });
      }
    },
    [establishments, addToast]
  );

  return (
    <MasterPage>
      <Container>
        <Header>
          <h2>Estabelecimentos</h2>
          <div>
            <Button
              type="button"
              onClick={() => setEstablishmentAddressModalOpen(true)}
            >
              Cadastrar
            </Button>
            <Button
              type="button"
              onClick={() => setSearchEstablishmentAddressModalOpen(true)}
            >
              Pesquisar
            </Button>
          </div>
        </Header>

        {establishments.length === 0 && (
          <NoRegistry>
            <FaRegSadTear />
            <h1>Sem Registro</h1>
          </NoRegistry>
        )}

        {establishments
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((establishment) => (
            <div key={establishment.id}>
              <Establishment>
                <h4>{establishment.name}</h4>
              </Establishment>
              {establishment.addresses
                .sort((a, b) => a.address.localeCompare(b.address))
                .map((address) => (
                  <Address key={address.id}>
                    <InfoAddress>
                      <span>
                        {`${address.address}, ${address.number || "s/n"}, ${
                          address.district
                        }, ${address.city}`}
                      </span>
                      <span>{`${address.state}/${address.country}`}</span>
                    </InfoAddress>
                    <ActionsAddress>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateAddress({
                            name: establishment.name,
                            ...address,
                          })
                        }
                      >
                        <RiEditBoxFill size={25} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <IoTrashBin size={25} />
                      </button>
                    </ActionsAddress>
                  </Address>
                ))}
            </div>
          ))}
      </Container>
      <EstablishmentAddressModal
        isOpen={establishmentAddressModalOpen}
        onRequestClose={() => {
          setSelectAddress(null);
          setEstablishmentAddressModalOpen(false);
        }}
        onSaveCallback={handleCallbackSaveAddress}
        formData={selectAddress}
      />
      <SearchEstablishmentAddressModal
        isOpen={searchEstablishmentAddressModalOpen}
        onRequestClose={() => {
          setSearchEstablishmentAddressModalOpen(false);
        }}
      />
    </MasterPage>
  );
};

export default Home;
