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
    /* const [editName, setEditName] = useState(task.name);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editDeadlines, setEditDeadlines] = useState(task.deadlines);
    const [editImage, setEditImage] = useState(task.image);
    const [editStatus, setEditStatus] = useState(task.status);*/

  
    /* const handleSave = () => {
      editHandler({ id: task.id, data: { name: editName, description: editDescription, deadlines: editDeadlines, status: editStatus, image: editImage } });
      onClose();
    }; */
  
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
            <Text>{auto.description}</Text>
            <Text>{auto.cost}</Text>
            <Text color="blue.600" fontSize="2xl">
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
                    //value={editName}
                    //onChange={(e) => setEditName(e.target.value)}
                    placeholder="Редактировать задачу"
                  />
                  <Input
                   // value={editImage}
                    //onChange={(e) => setEditImage(e.target.value)}
                    placeholder="Редактировать URL изображения"
                  />
                  <Input
                    //value={editStatus.toString()}
                   // onChange={(e) => setEditStatus(e.target.value)}
                    placeholder="Редактировать статус"
                  />
                  <Input
                   // value={editDescription.toString()}
                    //onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Редактировать описание задачи"
                  />
                  <Input
                   // value={editDeadlines.toString()}
                   // onChange={(e) => setEditDeadlines(e.target.value)}
                    placeholder="Редактировать dealine"
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} /* onClick={handleSave} */ >
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
            <Button /* onClick={() => deleteHandler(auto.id)} */ variant="outline" colorScheme="red">
              Удалить
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }


