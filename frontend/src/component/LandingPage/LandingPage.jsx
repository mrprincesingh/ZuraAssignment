import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  MdSettings,
  MdOutlineNotifications,
  MdAddCircleOutline,
} from "react-icons/md";
import { BiHome } from "react-icons/bi";
import logo from "../../assets/directright.png";
import imglanding from "../../assets/landingimage.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject, postProject } from "../../Redux/projectContext/action";

const LandingPage = () => {
  const project = useSelector((state) => state.projectContext.Project.project);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState("");
  const [showHome, setShowHome] = useState(true);
 
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: isModalOpenUser,
    onOpen: openModalUser,
    onClose: closeModalUser,
  } = useDisclosure();

  const [userInfo, setUserInfo] = useState({
    email: localStorage.getItem("userEmail") || "",
    name: localStorage.getItem("userName") || "",
  });
  const storedName = localStorage.getItem("userName");
  const storedEmail = localStorage.getItem("userEmail");

  const handleSaveButtonClick1 = () => {
    closeModal(); // Close any open modal first
    openModal();
  };

  const saveMedia = async () => {
    try {
      await dispatch(postProject({ projectName: newProject }));
      dispatch(getProject()); // This will refresh the project list
      setNewProject("");
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving media:", error);
      // You might want to handle the error in some way (e.g., show a message to the user)
    }
  };
  

  const mediaWithInitials = project
    ? project.map((item) => {
        const nameInitials = item.projectName
          .split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0))
          .join("");

        return nameInitials;
      })
    : [];
  const colors = [
    "#7E22CE",
    "#F8A01D",
    "#6366F1",
    "#F8A01D",
    "#6366F1",
    "#7E22CE",
  ];

  const combinedData = project
    ? project.map((item, index) => {
        const nameInitials = item.projectName
          .split(" ")
          .slice(0, 2)
          .map((word) => word.charAt(0))
          .join("");

        const backgroundColor = colors[index % colors.length];

        return {
          originalData: item,
          initials: nameInitials,
          backgroundColor: backgroundColor,
        };
      })
    : [];

 
  useEffect(() => {
    // Check if user info is present in localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");

    if (!storedEmail || !storedName) {
      // User info not present, open the modal
      openModalUser();
    }

    dispatch(getProject());
  }, [openModalUser, dispatch]);

  const saveDetail = () => {
    localStorage.setItem("userEmail", userInfo.email);
    localStorage.setItem("userName", userInfo.name);
    closeModalUser();
  };

  return (
    <Box bg="#FFF" width="full">
      {/* Navbar */}

      <Modal isOpen={isModalOpenUser} onClose={closeModalUser}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Email and Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              placeholder="Type here"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <FormLabel mt="3">Name:</FormLabel>
            <Input
              type="text"
              placeholder="Type here"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModalUser} color={"red"} colorScheme="gost">
              Cancel
            </Button>
            <Button onClick={saveDetail} color={"white"} bg="purple">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box w="100%" justifyContent="space-between" display="flex">
        <Flex w="85%" p="4">
          <Box width="52.84px" height="52.84px" flex-shrink="0">
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
        <Flex
          w="15%"
          h="90px"
          gap="3"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Box as={MdSettings} boxSize="54px" flexShrink={0} />
          <Box as={MdOutlineNotifications} boxSize="54px" flexShrink={0} />
        </Flex>
      </Box>

      {storedName && storedEmail && (
        <Box pl="20px">
          <AvatarGroup spacing="1rem">
            <Avatar bg="teal.500" />
            <Box>
              <Text align="left">Name: {storedName}</Text>
              <Text>Email: {storedEmail}</Text>
            </Box>
          </AvatarGroup>
        </Box>
      )}

      {/* Home */}
      {combinedData.length === 0 && (
        <Box
          opacity={showHome ? 1 : 0}
          height={showHome ? "auto" : 0}
          overflow="hidden"
          transition="opacity 0.5s ease, height 0.5s ease"
        >
          <Box w="100%">
            <Box w="35%">
              <Button
                borderRadius="35.323px"
                borderWidth="0.75px"
                borderColor="#999"
                background="#FFF"
                boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 0.75032px 1.50064px 3.75159px 0px rgba(0, 0, 0, 0.06), 3.00127px 6.00254px 6.75286px 0px rgba(0, 0, 0, 0.05), 6.75286px 13.50572px 9.00381px 0px rgba(0, 0, 0, 0.03), 12.00508px 24.01017px 10.50445px 0px rgba(0, 0, 0, 0.01), 18.75794px 36.76557px 12.00508px 0px rgba(0, 0, 0, 0.00)"
                color="#3C3C3C"
                fontFamily="Roboto"
                fontSize="20.999px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
              >
                <BiHome /> Back To Home
              </Button>
            </Box>
          </Box>

          <Box w="100%" p="5" m="auto">
            <Box>
              {" "}
              <Text
                color="#7E22CE"
                fontFamily="Roboto"
                fontSize="43.411px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
              >
                Create a New Project
              </Text>
            </Box>
            <Box w="100%" textAlign="center">
              <img
                src={imglanding}
                alt="imglanding"
                style={{ margin: "auto", width: "300px", height: "200px" }}
              />
            </Box>
            <Box w="85%" m="auto" mt="10px">
              <Text
                color="#838383"
                textAlign="center"
                fontFamily="Roboto"
                fontSize="30px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in
              </Text>
            </Box>
            <Box w="100%" mt="30px" align="center">
              <Button
                width="429.827px"
                height="85.916px"
                flexShrink={0}
                borderRadius="12.89px"
                background="#211935"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ background: "#040404" }} // Adjust the hover color as needed
                onClick={openModal}
              >
                <Flex alignItems="center">
                  <MdAddCircleOutline color="#F8F8F8" size="46px" />
                  <Text
                    color="#F8F8F8"
                    fontFamily="Roboto"
                    fontSize="36.28px"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="normal"
                    marginLeft="4"
                  >
                    Create New Project
                  </Text>
                </Flex>
              </Button>
              <Modal isCentered isOpen={isModalOpen} onClose={closeModal}>
              <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
                <ModalContent>
                  <ModalHeader>Create Project</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormLabel>Enter Project Name:</FormLabel>
                    <Input type="text" placeholder="Type here" value={newProject} onChange={(e) => setNewProject(e.target.value)} />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={closeModal} color={"red"} colorScheme="gost">
                      Cancle
                    </Button>
                    <Button
                      onClick={saveMedia}
                      color={"white"}
                      bg="purple"
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
        </Box>
      )}
      {/*  
 Project */}

      <Box w="100%">
        {" "}
        {combinedData.length > 0 && (
          <>
            <Box w="80%" m="auto">
              <Box w="100%" p="5" justifyContent="space-between" display="flex">
                <Box>
                  {" "}
                  <Text
                    color="#7E22CE"
                    fontFamily="Roboto"
                    fontSize="73.411px"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                  >
                    Project
                  </Text>
                </Box>
                <Button
                  width=" 376.173pxpx"
                  height=" 72.561px"
                  flexShrink={0}
                  borderRadius="8.509px"
                  background="#211935"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  _hover={{ background: "#040404" }}
                  onClick={handleSaveButtonClick1}
                >
                  <Flex alignItems="center">
                    <MdAddCircleOutline color="#F8F8F8" size="46px" />
                    <Text
                      color="#F8F8F8"
                      fontFamily="Roboto"
                      fontSize="30.552px"
                      fontStyle="normal"
                      fontWeight="600"
                      lineHeight="normal"
                    >
                      Create New Project
                    </Text>
                  </Flex>
                </Button>
                <Modal isCentered isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
                  <ModalContent>
                    <ModalHeader>Create Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormLabel>Enter Project Name:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Project Name"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        onClick={closeModal}
                        color={"red"}
                        colorScheme="gost"
                      >
                        Cancle
                      </Button>
                      <Button onClick={saveMedia} color={"white"} bg="purple">
                        Save
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
            <Flex
              w="full"
              flexWrap="wrap"
               gap={100}
              p="10"
            >
              {combinedData.map((item) => (
                <Link to={`/upload/${item.originalData._id}`}>
                  <Box
                    key={item.originalData._id}
                    width="402.021px"
                    height="165.344px"
                    flexShrink={0}
                    mt="50px"
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
                      width="152.021px"
                      height="140.344px"
                      flexShrink={0}
                      borderRadius="18.212px"
                      bg={item.backgroundColor}
                      justifyContent="center"
                      align="center"
                      textAlign="center"
                      pt="20px"
                    >
                      <Text
                        color="#FFF"
                        fontFamily="Roboto"
                        fontSize="77.954px"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                      >
                        {item.initials}
                      </Text>
                    </Box>
                    <Box w="60%" h="110px" m="auto" textAlign="left">
                      <Text
                        color="#7E22CE"
                        fontFamily="Roboto"
                        fontSize="20.354px"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                      >
                        {item.originalData.projectName}
                      </Text>
                      <Text
                        mt="5px"
                        color="#3C3C3C"
                        fontFamily="Roboto"
                        fontSize="15.354px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        {item.originalData.medias.length} Episodes
                      </Text>
                      <Text
                        mt="45px"
                        color="#969696"
                        fontFamily="Roboto"
                        fontSize="15.354px"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Last edited a week ago
                      </Text>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LandingPage;
