import React, { useState } from 'react';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import type { AutoDataType } from '../../types/AutoTypes';

type PropsType = {
  AutosSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AutoForm({ AutosSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const wrappedAutosSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    AutosSubmitHandler(e);
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} colorScheme="red" mt={15} mb={8}>Добавить автомобиль</Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новый автомобиль</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box onSubmit={wrappedAutosSubmitHandler} as="form" mt={3}>
              <Stack spacing={3}>
                <Input name="modelCar" placeholder="модель" size="md" />
                <Input name="yearCar" placeholder="год выпуска" size="md" />
                <Input name="mileage" placeholder="пробег" size="md" />
                <Input name="image" placeholder="image" size="md" />
                <Input name="cost" placeholder="цена" size="md" />
                <Input name="description" placeholder="описание" size="md" />
                <Button type="submit" colorScheme="red">
                  Добавить Задачу
                </Button>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={closeModal}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}