import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/directright.png";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { MdOutlineNotifications, MdSettings } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "white",
  backgroundColor: "#7E22CE",
};
const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const Setting = () => {
  const sidebar = useDisclosure();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    chatbotName: "",
    welcomeMessage: "",
    inputPlaceholder: "",
    fontSize: "",
    chatHeight: "",
    isChecked: false,
    iconSize: "",
    iconPosition: "",
    distanceFromBottom: "",
    horizontalDistance: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isChecked: e.target.checked,
    }));
  };

  const handleFormSubmit = () => {
    console.log("Form Data:", formData);
  };

  const chnageImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const NavItem = (props) => {
    const { icon, num, children, ...rest } = props;

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
        <Box>{icon && <Icon mr="2" boxSize="5" color="black" as={icon} />}</Box>
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
            <NavItem1 num={1}>Project</NavItem1>
          </Link>
          <Link to="/widget">
            <NavItem1 num={2}>Widget Configurations</NavItem1>
          </Link>

          <NavItem1 num={3}>Deployment</NavItem1>
          <NavItem1 num={4}>Pricing</NavItem1>
        </Box>

        <Box mt="360px">
          {" "}
          <Link to="/setting">
            <NavItem icon={AiFillSetting}>Setting</NavItem>
          </Link>
        </Box>
      </Box>
    </Box>
  );

  const ColorPicker = ({ label }) => {
    const [color, setColor] = useState("#7E22CE");

    const handleColorChange = (event) => {
      const newColor = event.target.value;
      setColor(newColor);
    };
    return (
      <Box w="50%">
        <Box display="flex" gap="10%" w="100%">
          <Box w="80%">
            <FormControl>
              <FormLabel
                fontFamily="Roboto"
                fontWeight="700"
                lineHeight="normal"
              >
                {label}
              </FormLabel>
              <Input type="text" onChange={handleColorChange} value={color} />
            </FormControl>
          </Box>
          <Box w="10%">
            <FormControl>
              <Input type="text" mt="28px" style={{ backgroundColor: color }} />
            </FormControl>
          </Box>
        </Box>
      </Box>
    );
  };
  const storedUsername = localStorage.getItem("userName");
  const storedUseremail = localStorage.getItem("userEmail");

  // Use stored values or set default values if not present
  const [username, setUsername] = useState(storedUsername || "");
  const [useremail, setUseremail] = useState(storedUseremail || "");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUseremailChange = (e) => {
    setUseremail(e.target.value);
  };

  // Update local storage when the username or useremail changes
  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("useremail", useremail);
  }, [username, useremail]);
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
                  <Text
                    ml="1"
                    fontSize="30px"
                    fontFamily="Roboto"
                    color="#7E22CE"
                  >
                    / Account Setting
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
                  Account Settings
                </Text>
              </Box>
            </Box>
            <Box display="flex" mt="50px" gap="10%">
              <Box>
                <Avatar size="2xl" bg="teal.500" />
              </Box>
              <Box>
                {" "}
                <FormControl>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </FormControl>
              </Box>
              <Box>
                {" "}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={useremail}
                    onChange={handleUseremailChange}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box className="vanish" mt="30px">
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
                  Subscriptions
                </Text>
              </Box>
            </Box>

            <Box
            mt="30px"
              w="100%"
              h="124px"
              bg="linear-gradient(90deg, #7E22CE 0.95%, #460281 99.9%)"
              b=" 0.719px solid #7E22CE"
              borderRadius="16px"
              boxShadow= "0px 0px 0px 0px rgba(0, 0, 0, 0.06), 0.71942px 1.43885px 3.59712px 0px rgba(0, 0, 0, 0.06), 2.8777px 5.7554px 6.47482px 0px rgba(0, 0, 0, 0.05), 6.47482px 12.94964px 8.63309px 0px rgba(0, 0, 0, 0.03), 11.51079px 23.02158px 10.07194px 0px rgba(0, 0, 0, 0.01), 17.98561px 35.2518px 11.51079px 0px rgba(0, 0, 0, 0.00)"
              display="flex"
              justifyContent="center"
            
           pt="7"
           px="10"
             textAlign="center"
            >
                <Box w="100%" justifyContent="space-between" display="flex" >
                <Box   display="flex" gap="1">
                <Text color="white"  mt="5px" fontSize="30px" >You are currently on the  </Text>
                <Heading as='u' color="white">Ques AI Basic Plan!</Heading>
                </Box>
           
                <Button  bg="white">Upgrade</Button>
                </Box>
            </Box>
            <Box w="100%" p="5" textAlign="left" mt="30px" >
            <Text color="red" fontWeight="700" as="u">cancle Subscription</Text>
            </Box>
            
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Setting;
