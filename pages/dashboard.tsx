import {
  Flex,
  Image,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Button,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";
import PrimaryButton from "../src/flat/PrimaryButton";
import SecondaryButton from "../src/flat/SecondaryButton";
import { useRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";


function Dashboard() {
  return (
    <>
      <DashboardText />
      <TabsBtn />
    </>
  );
}

function DashboardText() {
  return (
    <Flex
      fontSize="3xl"
      maxWidth="400px"
      height="25%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      fontWeight="600"
    >
      Dashboard
    </Flex>
  );
}

function TabsBtn() {
    const [isSmallerThan767]=useMediaQuery("(max-width:767px)")
  const router = useRouter();

  const invClick = () => {
    router.push("/dashboard?tab=invitation");
  };


    const profClick = () => {
      router.push("/dashboard?tab=profile");
    };

   

  return (
    <Box marginTop="100px" width="100%" marginLeft="50px">
      <Tabs
        variant="soft-rounded"
        color="#AAF0D1"
        colorScheme="green"
        orientation={isSmallerThan767 ? "horizontal" : "vertical"}
      >
        <TabList
          aria-orientation="vertical"
          marginRight="60px"
          marginLeft="30px"
        >
          <Tab maxH="50px" fontSize="l" onClick={profClick}>
            Profile
          </Tab>
          <Tab maxH="50px" fontSize="l" onClick={invClick}>
            Invitations
          </Tab>
        </TabList>
        <TabPanels
          color="black"
          borderLeft={
            isSmallerThan767 ? "0px solid #999999" : "2px solid #999999"
          }
          width="100%"
        >
          <TabPanel
            marginLeft={isSmallerThan767 ? "20px" : "30px"}
            width="100%"
          >
            <ProfTab />
          </TabPanel>
          <TabPanel
            marginLeft={isSmallerThan767 ? "20px" : "30px"}
            width="100%"
          >
            <InvTab />
            <InvTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function InvTab() {
  return (
    <>
      <Flex>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
          orci metus. Vestibulum sit amet odio in metus sagittis blandit.
          Aliquam vehicula tortor vitae odio varius finibus.
        </Box>
      </Flex>
      <Flex marginTop="10px">
        <Text color="#999999">For 12/12/2022 6:00PM</Text>
      </Flex>
      <Flex marginTop="20px" marginBottom="40px">
        <PrimaryButton borderRadius="26" fontSize="l" m="0" marginTop="10px">
          Accept
        </PrimaryButton>
        <SecondaryButton
          borderRadius="26"
          fontSize="l"
          m="0"
          marginLeft="1"
          marginTop="10px"
        >
          Decline
        </SecondaryButton>
      </Flex>
    </>
  );
}

function ProfTab() {
  return (
    <Flex>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci
      metus. Vestibulum sit amet odio in metus sagittis blandit. Aliquam
      vehicula tortor vitae odio varius finibus.2
    </Flex>
  );
}

export default Dashboard;
