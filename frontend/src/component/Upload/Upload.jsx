import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMedia,
  editMedia,
  getMedia,
  postMedia,
} from "../../Redux/uploadContext/action";
import { Link, useParams } from "react-router-dom";
import youtube from "../../assets/youtube.png";
import spotify from "../../assets/spotify.png";

import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/directright.png";
import { AiFillSetting } from "react-icons/ai";
import { BiEdit, BiHome, BiSearch } from "react-icons/bi";
import { MdOutlineNotifications, MdSettings } from "react-icons/md";
import { useState } from "react";

const Upload = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.MediaContext.Media.media);
  const sidebar = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editable, setEditable] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpload = async () => {
    try {
      await dispatch(postMedia({ name, description, projectId: id }));

      await dispatch(getMedia(id));
    } catch (error) {
      console.error("Error uploading media:", error);
    }

    onClose();
    setName("");
    setDescription("");
  };

  const handleDelete = async (mediaId) => {
    try {
      await dispatch(deleteMedia({ mediaId, projectId: id }));

      await dispatch(getMedia(id));
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  const handleEditClick = () => {
    setEditable(true);
    setEditedDescription(""); // Set the initial value to the current description
  };

  const handleSaveClick = async (itemId) => {
    console.log(editedDescription);
    // Handle saving the edited description (you might want to send it to the server here)
    try {
      await dispatch(editMedia(itemId, editedDescription));
      await dispatch(getMedia(id));
      setEditable(false);
      setShow(false);
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const handleEiditEdit = () => {
    setShow(true);
  };

  const NavItem = (props) => {
    const { num, children, ...rest } = props;

    return (
      <Flex
        border="1px solid black"
        align="center"
        gap="3"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="white"
        bg="#7E22CE"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        borderRadius="30px"
        {...rest}
      >
        <Box
          border="1px solid black"
          pr="2"
          pl="2"
          bg="black"
          borderRadius="20px"
        >
          {num}
        </Box>{" "}
        {children}
      </Flex>
    );
  };

  const NavItem1 = (props) => {
    const { icon, num, children, ...rest } = props;
    return (
      <Flex
        align="center"
        gap="3"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="black"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        borderRadius="30px"
        {...rest}
      >
        <Box
          border="1px solid GRAY"
          pr="2"
          pl="2"
          bg="GRAY"
          borderRadius="20px"
        >
          {num}
        </Box>
        <Box>
          {icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: "gray.300",
              }}
              as={icon}
            />
          )}
        </Box>
        {children}
      </Flex>
    );
  };

  const NavItem2 = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        gap="3"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="black"
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        borderRadius="30px"
        {...rest}
      >
        <Box>{icon && <Icon mr="4" boxSize="6" as={icon} />}</Box>
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#F3E8FF"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="377px"
      {...props}
    >
      <Link to="/">
        <Flex px="4" py="5" align="center">
          <Flex w="100%">
            <Box width="50.84px" height="50.84px" flex-shrink="0">
              <img src={logo} alt="logo" />
            </Box>
            <Box>
              <Text
                fontFamily="Plus Jakarta Sans"
                fontSize="37.743px"
                fontStyle="normal"
                fontWeight="800"
                lineHeight="normal"
                color="#7E22CE"
              >
                LAMA.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Link>
      <Box w="100%" mb="20px" pl="30px">
        <Text
          fontFamily="Roboto"
          fontSize="20px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="20px"
          letterSpacing="0.1px"
          color="var(--m-3-sys-light-on-surface-variant, black)"
          textAlign="left"
        >
          Podcast Upload Flow
        </Text>
      </Box>

      <Box justifyContent="space-between" h="575px">
        <Box>
          <Link to="/">
            <NavItem num={1}>Project</NavItem>
          </Link>
          <Link to="/widget">
            <NavItem1 num={2}>Widget Configurations</NavItem1>
          </Link>

          <NavItem1 num={3}>Deployment</NavItem1>
          <NavItem1 num={4}>Pricing</NavItem1>
        </Box>

        <Box mt="360px">
          {" "}
          <Link to="/setting"><NavItem2 icon={AiFillSetting}>Setting</NavItem2></Link>
          
        </Box>
      </Box>
    </Box>
  );
  useEffect(() => {
    dispatch(getMedia(id));
  }, [dispatch]);

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Box as="section" bg="#FFF" minH="100vh">
        <SidebarContent
          display={{
            base: "none",
            md: "unset",
          }}
        />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box
          ml={{
            base: 0,
            md: 60,
          }}
          transition=".3s ease"
        >
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="89.70%"
            ml="130px"
            px="10"
            bg="white"
            mt="40px"
            borderColor="blackAlpha.300"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{
                base: "inline-flex",
                md: "none",
              }}
              onClick={sidebar.onOpen}
              size="sm"
            />
            <Box
              w="full"
              h="full"
              display="flex"
              justifyContent="space-between"
            >
              <Box display="flex">
                <Icon mr="4" boxSize="10" color="#7E22CE" as={BiHome} />
                <Box display="flex">
                  <Text fontSize="30px" color="gray" fontFamily="Roboto">
                    / Sample Project /{" "}
                  </Text>{" "}
                  <Text
                    ml="1"
                    fontSize="30px"
                    fontFamily="Roboto"
                    color="#7E22CE"
                  >
                    Upload
                  </Text>
                </Box>
              </Box>

              <Flex
                w="15%"
                gap="3"
                justifyContent="center"
                alignItems="flex-end"
              >
                <Box as={MdSettings} boxSize="54px" flexShrink={0} />
                <Box
                  as={MdOutlineNotifications}
                  boxSize="54px"
                  flexShrink={0}
                />
              </Flex>
            </Box>
          </Flex>

          <Box w="89.70%" px="10" mt="40px" ml="130px">
            {/* Main Content */}
            {!show ? (
              <Box className="vanish">
                <Box>
                  {" "}
                  <Text
                    color="#7E22CE"
                    fontFamily="Roboto"
                    fontSize="43.411px"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="normal"
                    align="start"
                  >
                    Upload
                  </Text>
                </Box>

                <Flex w="100%" flexWrap="wrap" p="10" display="flex" gap="20">
                  <Box
                    // key={item.originalData._id}

                    width="250.021px"
                    height="85.344px"
                    flexShrink={0}
                    borderRadius="26.17px"
                    border="1.19px solid #999"
                    background="#FFF"
                    boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1.18953px 2.37906px 5.94764px 0px rgba(0, 0, 0, 0.06), 4.75811px 9.51622px 10.70575px 0px rgba(0, 0, 0, 0.05), 10.70575px 21.41151px 14.27434px 0px rgba(0, 0, 0, 0.03), 19.03245px 38.0649px 16.65339px 0px rgba(0, 0, 0, 0.01), 29.7382px 58.28688px 19.03245px 0px rgba(0, 0, 0, 0.00)"
                    display="flex"
                    gap="5"
                    p="3"
                    cursor="pointer"
                  >
                    <Box w="60.432px" h="59.502px" flexShrink={0} bg="DA0000">
                      <Box>
                        <img src={youtube} alt="youtube" />
                      </Box>
                    </Box>
                    <Box mt="6px">
                      <Text
                        align="left"
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        Upload
                      </Text>
                      <Text
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        Youtube Video
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    // key={item.originalData._id}

                    width="250.021px"
                    height="85.344px"
                    flexShrink={0}
                    borderRadius="26.17px"
                    border="1.19px solid #999"
                    background="#FFF"
                    boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1.18953px 2.37906px 5.94764px 0px rgba(0, 0, 0, 0.06), 4.75811px 9.51622px 10.70575px 0px rgba(0, 0, 0, 0.05), 10.70575px 21.41151px 14.27434px 0px rgba(0, 0, 0, 0.03), 19.03245px 38.0649px 16.65339px 0px rgba(0, 0, 0, 0.01), 29.7382px 58.28688px 19.03245px 0px rgba(0, 0, 0, 0.00)"
                    display="flex"
                    gap="5"
                    p="3"
                    cursor="pointer"
                  >
                    <Box w="60.432px" h="59.502px" flexShrink={0} bg="DA0000">
                      <Box>
                        <img src={spotify} alt="youtube" />
                      </Box>
                    </Box>
                    <Box mt="6px">
                      <Text
                        align="left"
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        Upload
                      </Text>
                      <Text
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        spotify Music
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    // key={item.originalData._id}
                    onClick={onOpen}
                    width="250.021px"
                    height="85.344px"
                    flexShrink={0}
                    borderRadius="26.17px"
                    border="1.19px solid #999"
                    background="#FFF"
                    boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1.18953px 2.37906px 5.94764px 0px rgba(0, 0, 0, 0.06), 4.75811px 9.51622px 10.70575px 0px rgba(0, 0, 0, 0.05), 10.70575px 21.41151px 14.27434px 0px rgba(0, 0, 0, 0.03), 19.03245px 38.0649px 16.65339px 0px rgba(0, 0, 0, 0.01), 29.7382px 58.28688px 19.03245px 0px rgba(0, 0, 0, 0.00)"
                    display="flex"
                    gap="5"
                    p="3"
                    cursor="pointer"
                  >
                    <Box
                      w="60.432px"
                      h="59.502px"
                      bg="gray"
                      flexShrink={0}
                      borderRadius="30px"
                    ></Box>
                    <Box mt="6px">
                      <Text
                        align="left"
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        Upload Media
                      </Text>
                      <Text
                        fontSize="15px"
                        fontFamily="Roboto"
                        fontWeight="600"
                      >
                        or Textfile
                      </Text>
                    </Box>
                  </Box>
                </Flex>

                <Box w="100%" mt="10px">
                  {data && data.length === 0 && (
                    <Box>
                      <Heading>or</Heading>
                      <Button
                        mt="20px"
                        onClick={onOpen}
                        colorScheme="purple"
                        borderRadius="30px"
                        w="300px"
                        h="200px"
                      >
                        <Heading>Upload File</Heading>
                      </Button>
                    </Box>
                  )}
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader display="flex"></ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <FormLabel mt="20px">Description</FormLabel>
                        <Textarea
                          type="text"
                          size="md"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button bg="black" color="white" onClick={handleUpload}>
                          Upload
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>

                <Box w="100%" mt="50px" p="10">
                  {data && data.length > 0 ? (
                    <TableContainer
                      border="1px solid #999"
                      bg="#fff"
                      borderRadius="22px"
                      boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1px 2px 5px 0px rgba(0, 0, 0, 0.06), 4px 8px 9px 0px rgba(0, 0, 0, 0.05), 9px 18px 12px 0px rgba(0, 0, 0, 0.03), 16px 32px 14px 0px rgba(0, 0, 0, 0.01), 25px 49px 16px 0px rgba(0, 0, 0, 0.00)"
                    >
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>upload Date & Time</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        {data.map((item) => (
                          <Tbody key={item._id}>
                            <Tr>
                              <Td>{item.name}</Td>
                              <Td>{formatDate(item.createdAt)}</Td>
                              <Td>{item.status}</Td>
                              <Td display="flex">
                                <Button
                                  bg="#ffff"
                                  variant="outline"
                                  onClick={handleEiditEdit}
                                >
                                  Edit
                                </Button>
                                <Button
                                  bg="#ffff"
                                  onClick={() => handleDelete(item._id)}
                                  color="red"
                                  variant="outline"
                                >
                                  Delete
                                </Button>
                              </Td>
                            </Tr>
                          </Tbody>
                        ))}
                      </Table>
                    </TableContainer>
                  ) : null}
                </Box>
              </Box>
            ) : null}
            {show ? (
              <Box>
                {data &&
                  data.map((item) => (
                    <Box
                      class="editmanager"
                      w="100%"
                      borderRadius="20px"
                      h="508px"
                      border="1px solid black"
                      p="5"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        w="100%"
                      >
                        {editable ? (
                          <Button
                            borderRadius="113.9"
                            bg="#3C3C3C"
                            color="white"
                            gap="2"
                            onClick={() => handleSaveClick(item._id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            borderRadius="113.9"
                            bg="#3C3C3C"
                            color="white"
                            gap="2"
                            onClick={handleEditClick}
                          >
                            <Icon as={BiEdit} />
                            Edit Button
                          </Button>
                        )}
                        <Box borderRadius="30px">
                          <Icon
                            boxSize="10"
                            color="#7E22CE"
                            as={BiSearch}
                          ></Icon>
                        </Box>
                      </Box>

                      <Box key={item.id} w="100%">
                        <Textarea
                          size="lg"
                          defaultValue={item.description}
                          readOnly={!editable}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            ) : null}
            +
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Upload;
