import {
    Card,
    CardBody,
    Stack,
    Heading,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    Image,
    Text,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import type { EditAutoType, AutoType } from '../../types/AutoTypes';
  
  type AutoCardTypes = {
    auto: AutoType;
    deleteHandler: (id: AutoType['id']) => void;
    editHandler: (obj: EditAutoType) => void;
  };
  
  export default function AutoCard({ auto, deleteHandler, editHandler }: AutoCardTypes): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
     const [editmodelCar, setEditmodelCar] = useState(auto.modelCar);
    const [edityearCar, setEdityearCar] = useState(auto.yearCar);
    const [editmileage, setEditmileage] = useState(auto.mileage);
    const [editimage, setEditimage] = useState(auto.image);
    const [editcost, setEditcost] = useState(auto.cost);
    const [editdescription, setEditdescription] = useState(auto.description);

  
     const handleSave = () => {
      editHandler({ id: auto.id, data: { 
        modelCar: editmodelCar, yearCar: edityearCar, mileage: editmileage, image: editimage, cost: editcost, description: editdescription } });
      onClose();
    }; 
  
    return (
      <Card maxW="sm" backgroundColor="rgba(212, 207, 207, 0.5)">
        <CardBody>
          <Stack mt="6" spacing="3">
          <Image src={auto.image} alt="Todo Image" 
          objectFit="cover"
          height="200px"
          width="100%"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg" />
            <Heading size="md">{auto.modelCar}</Heading>
            <Text>{auto.yearCar}</Text>
            <Text>{auto.mileage}</Text>
            <Text>{auto.cost}</Text>
            <Text color="blue.600" fontSize="1xl">
              {auto.description} 
            </Text>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Редактировать</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={3}>
                  <Input
                    value={editmodelCar}
                    onChange={(e) => setEditmodelCar(e.target.value)}
                    placeholder="Измените модель"
                  />
                  <Input
                    value={editimage}
                    onChange={(e) => setEditimage(e.target.value)}
                    placeholder="Измените фото"
                  />
                  <Input
                    value={edityearCar}
                    onChange={(e) => setEdityearCar(e.target.value)}
                    placeholder="Измените год"
                  />
                  <Input
                    value={editdescription.toString()}
                    onChange={(e) => setEditdescription(e.target.value)}
                    placeholder="Добавте описание"
                  />
                  <Input
                    value={editcost.toString()}
                    onChange={(e) => setEditcost(e.target.value)}
                    placeholder="Измените цену"
                  />
                   <Input
                    value={editmileage.toString()}
                    onChange={(e) => setEditmileage(e.target.value)}
                    placeholder="Измените пробег"
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3}  onClick={handleSave}  >
                  ОК
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Отмена
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
          <Button onClick={onOpen} variant="outline" colorScheme="gray">
              Редактировать
            </Button>
            <Button  onClick={() => deleteHandler(auto.id)}  variant="outline" colorScheme="red">
              Удалить
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }


