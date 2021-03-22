import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { AxiosResponse } from "axios";
import React, { useCallback, useRef } from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationErrors";
import Button from "../Button";
import Input from "../Input";

import { Container, GroupH } from "./styles";

interface IEstablishmentAddressModalProps {
  isOpen: boolean;
  formData?: IEstablishmentAddressFormData | null;
  onRequestClose: () => void;
  onSaveCallback: (data: IResponseEstablishment) => void;
}

interface IEstablishmentAddressFormData {
  id: string;
  name: string;
  establishmentId: string;
  address: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
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

const EstablishmentAddressModal: React.FC<IEstablishmentAddressModalProps> = ({
  isOpen,
  formData,
  onRequestClose,
  onSaveCallback,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IEstablishmentAddressFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório").max(150),
          address: Yup.string().required("Endereço é obrigatório").max(300),
          number: Yup.string().max(10),
          district: Yup.string().required("Bairro é obrigatório").max(100),
          city: Yup.string().required("Cidade é obrigatória").max(100),
          state: Yup.string().required("Estado é obrigatório").max(100),
          country: Yup.string().required("País é obrigatório").max(100),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let result: AxiosResponse;
        if (formData) {
          result = await api.put(`/establishments/${formData.id}`, data);
        } else {
          result = await api.post("/establishments", data);
        }

        onSaveCallback(result.data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: "error",
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao tentar salvar os dados.",
        });
      }
    },
    [addToast, onSaveCallback, formData]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <Form
          initialData={{ ...formData }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h2>Informe os dados</h2>

          <Input name="name" placeholder="Estabelecimento" />

          <GroupH>
            <Input name="address" placeholder="Endereço" />
            <Input
              name="number"
              containerStyle={{ width: 100, marginLeft: 8 }}
              placeholder="Número"
            />
          </GroupH>

          <GroupH>
            <Input name="district" placeholder="Bairro" />
            <Input
              name="city"
              containerStyle={{ marginLeft: 8 }}
              placeholder="Cidade"
            />
          </GroupH>

          <GroupH>
            <Input name="state" placeholder="Estado" />
            <Input
              name="country"
              containerStyle={{ marginLeft: 8 }}
              placeholder="País"
            />
          </GroupH>

          <Button type="submit">Salvar</Button>
        </Form>
      </Container>
    </Modal>
  );
};

export { EstablishmentAddressModal };
export type { IResponseEstablishment, IEstablishmentAddressFormData };
