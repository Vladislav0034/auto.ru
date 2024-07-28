import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  IconButton, 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  MenuDivider, 
  useDisclosure, 
  useColorModeValue, 
  Stack, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logoutThunk } from '../../redux/auth/authActionThunk';
import useAuth from '../hooks/useAuth';


const Links = ['Dashboard', 'Projects', 'Team'];


function Nlink({ to, children, ...props }: { to: string; children: React.ReactNode; onClick?: () => void }): JSX.Element {
  return (
    <BreadcrumbLink
      as={NavLink}
      to={to}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.900'),
      }}
      px={2}
      py={1}
      rounded="md"
      {...props}
    >
      {children}
    </BreadcrumbLink>
  );
}

export default function NavBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { updateUserHandler } = useAuth();
  const [newImage, setNewImage] = useState<string>('');
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(e.target.value);
  };

  const handleImageUpdate = () => {
    if (user.status === 'logged') {
      updateUserHandler({ userId: user.id, newImage });
      onModalClose();
    }
  };
  
  useEffect(() => {
    if (user.status === 'logged') {
      navigate('/');
    }
  }, [user.status, navigate]);

  const logoutHandler = async (): Promise<void> => {
    await dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <Box bg={useColorModeValue('red.500', 'red.900')} px={4} boxShadow="dark-lg">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>{user.status === 'logged' ? user.name : 'гость'}</Box>
          <Breadcrumb as="nav" separator=">">
            <BreadcrumbItem>
              <Nlink to="/">Main Page</Nlink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Nlink to="/account">Account Page</Nlink>
            </BreadcrumbItem>
            {user.status !== 'logged' ? (
              <>
                <BreadcrumbItem>
                  <Nlink to="/signin">SignIn</Nlink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Nlink to="/signup">SignUp</Nlink>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <Nlink to="/" onClick={logoutHandler}>Logout</Nlink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </HStack>
        {user.status === 'logged' && (
          <Flex alignItems="center">
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src={user.image} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={onModalOpen}>Edit photo</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <Nlink key={link} to={`/${link.toLowerCase()}`}>{link}</Nlink>
            ))}
            {user.status !== 'logged' ? (
              <>
                <Nlink to="/signin">SignIn</Nlink>
                <Nlink to="/signup">SignUp</Nlink>
              </>
            ) : (
              <Nlink to="/" onClick={logoutHandler}>Logout</Nlink>
            )}
          </Stack>
        </Box>
      )}
      
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter new image URL"
              value={newImage}
              onChange={handleImageChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleImageUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </Box>
  );
}
