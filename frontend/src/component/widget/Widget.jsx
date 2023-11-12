import {
    Avatar,
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
export const fileUploadCss={
    cursor:"pointer" , marginLeft:"-5%",width:"110%" ,border:"none"  ,height:"100%",
    color:"white",backgroundColor:"#7E22CE"
}
const fileUploadStyle = {
    "&::file-selector-button":fileUploadCss,
}

const Widget = () => {
  const sidebar = useDisclosure();
  const [imagePreview , setImagePreview] = useState("")
  const [image , setImage] = useState("")
  const [formData, setFormData] = useState({
    chatbotName: '',
    welcomeMessage: '',
    inputPlaceholder: '',
    fontSize: '',
    chatHeight: '',
    isChecked: false,
    iconSize: '',
    iconPosition: '',
    distanceFromBottom: '',
    horizontalDistance: '',
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
    console.log('Form Data:', formData);
  };

  const chnageImageHandler =(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = ()=>{
        setImagePreview(reader.result)
        setImage(file)
    }
}
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
            <NavItem1 num={1}>Project</NavItem1>
          </Link>
          <Link to="/widget">
            <NavItem num={2}>Widget Configurations</NavItem>
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

  const ColorPicker = ({label})=>{
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
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
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
  }

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
                    Configurations
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
                  Configurations
                </Text>
              </Box>
            </Box>
            <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab >Display</Tab>
        <Tab>Advanced</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        <FormControl>
  <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">Chatbot Name</FormLabel>
  <Input type='text' />
  <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>


  <FormLabel mt="20px" fontFamily="Roboto" fontWeight="700" lineHeight="normal">Welcome Message</FormLabel>
  <Input type='text' />
  <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>


  <FormLabel  mt="20px" fontFamily="Roboto" fontWeight="700" lineHeight="normal">Input Placeholder</FormLabel>
  <Input type='text' />
  <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
  </FormControl>
        </TabPanel>
        <TabPanel>
            <Box display="flex" justifyContent="space-between" gap="10%" w="90%">
            <ColorPicker label={"Primary Color"} />
            <ColorPicker label={"Font Color"} />
            </Box>
            <Box  display="flex" w="100%"  >
            <Box w="50%">
          <Box display="flex" mt="30px" justifyContent="space-between" gap="10%" w="90%">
            <Box w="100%">
              <FormControl>
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
                  Font Size (in px)
                </FormLabel>
                
                <Input type="text" />
                <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
              </FormControl>
            </Box>
          </Box>
          
        </Box>
        <Box w="50%">
          <Box display="flex" mt="30px" justifyContent="space-between" gap="10%" w="90%">
            <Box w="100%">
              <FormControl>
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
                Chat Height (in % of total screen)
                </FormLabel>
                <Input type="text" />
                <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
              </FormControl>
            </Box>
          </Box>
          
        </Box>
            </Box>

            <Box w="100%" mt="30px" justifyContent="space-between" display="flex">
            <FormControl>
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
                  Show Sources
                </FormLabel>
                <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
              </FormControl>

              <Stack align='center' direction='row'>
  
  <Switch id='isChecked' colorScheme="purple" size='lg' />
</Stack>
            </Box>
            <Box  mt="30px" >
             <Divider   borderColor="gray.500" borderWidth="2px" my="2"/>   
            </Box>
            <Box className="vanish" mt="30px">
              <Box>
                {" "}
                <Text
                  color="#7E22CE"
                  fontFamily="Roboto"
                  fontSize="23.411px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                  align="start"
                >
                  Chat Icon
                </Text>
              </Box>
            </Box> 

            <Box display="flex" w="90%" gap="10%" >
                <Box w="45%">
                <Select placeholder='Select option'>
  <option value='Small (48x48 px)'>Small (48x48 px)</option>
  <option value='large (48x48 px)'>large (48x48 px)</option>
  <option value='extra large (48x48 px)'>extra large (48x48 px)</option>
 
</Select>
                </Box>
                <Box w="45%">
                <Select placeholder='Select option'>
  <option value='Bottom Right'>Bottom Right</option>
  <option value='Bottom left'>Bottom left</option>
  <option value='Bottom top'>Bottom top</option>
  <option value='Bottom bottom'>Bottom bottom</option>
</Select>
                </Box>
            </Box>
            <Box  display="flex" w="100%"  >
            <Box w="50%">
          <Box display="flex" mt="30px" justifyContent="space-between" gap="10%" w="90%">
            <Box w="100%">
              <FormControl>
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
                  Distance from Bottom (in px)
                </FormLabel>
                
                <Input type="text" />
                <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
              </FormControl>
            </Box>
          </Box>
          
        </Box>
        <Box w="50%">
          <Box display="flex" mt="30px" justifyContent="space-between" gap="10%" w="90%">
            <Box w="100%">
              <FormControl>
                <FormLabel fontFamily="Roboto" fontWeight="700" lineHeight="normal">
                Horizontal Distance (in px)
                </FormLabel>
                <Input type="text" />
                <FormHelperText textAlign="left" >We'll never share your detail.</FormHelperText>
              </FormControl>
            </Box>
          </Box>
          
        </Box>
            </Box>

            <Box className="vanish" mt="30px">
              <Box>
                {" "}
                <Text
                  color="#3C3C3Ck"
                  fontFamily="Roboto"
                  fontSize="23.411px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="normal"
                  align="start"
                >
                  Bot Icon
                </Text>
              </Box>
            </Box> 

            <Box display="flex" gap="5%">
            <Box my="4" display={"flex"} justifyContent="center">
                <Avatar src={imagePreview}  size='lg'/>
            </Box>
            <Box my="4">
         <FormLabel  />
            <Input mt="15px" required id="chooseAvatar" accept="image/*"
           css={fileUploadStyle}
           onChange={chnageImageHandler}
            type="file"
            focusBorderColor={"green.200"}
            />
         </Box>
            </Box>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
            
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Widget;
