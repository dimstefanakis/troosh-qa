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
import ProfileDashboardTab from "../src/features/Dashboard/Profile";
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
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const router = useRouter();

  const invClick = () => {
    router.push("/dashboard?tab=invitation");
  };

  const profClick = () => {
    router.push("/dashboard?tab=profile");
  };

  return (
    <Box marginTop="100px" width="100%" marginLeft="0px">
      <Tabs
        variant="soft-rounded"
        color="#AAF0D1"
        colorScheme="green"
        orientation={isSmallerThan767 ? "horizontal" : "vertical"}
      >
        <TabList
          aria-orientation="vertical"
          marginRight="60px"
          marginLeft={isSmallerThan767?"0px":"30px"}
          paddingX="8px"
        >
          <Tab maxH="50px" fontSize="xl" onClick={profClick}>
            Profile
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={invClick}>
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
            paddingX="15px"
            paddingTop="10px"
            marginLeft={isSmallerThan767 ? "0px" : "30px"}
            width="100%"
          >
            <ProfileDashboardTab />
          </TabPanel>
          <TabPanel
            paddingTop="10px"
            paddingX="15px"
            marginLeft={isSmallerThan767 ? "0px" : "30px"}
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
      <Flex >
        <Box fontWeight="600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
          orci metus. Vestibulum sit amet odio in metus sagittis blandit.
          Aliquam vehicula tortor vitae odio varius finibus.
        </Box>
      </Flex>
      <Flex marginTop="10px">
        <Text color="#999999" fontWeight="600">
          For 12/12/2022 6:00PM
        </Text>
      </Flex>
      <Flex marginTop="20px" marginBottom="40px">
        <PrimaryButton
          borderRadius="26"
          fontSize="l"
          m="0"
          marginTop="10px"
          fontWeight="600"
        >
          Accept
        </PrimaryButton>
        <SecondaryButton
          borderRadius="26"
          fontSize="l"
          m="0"
          marginLeft="1"
          marginTop="10px"
          fontWeight="600"
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
      <Box fontWeight="600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id orci
        metus. Vestibulum sit amet odio in metus sagittis blandit. Aliquam
        vehicula tortor vitae odio varius finibus.2
      </Box>
    </Flex>
  );
}

export default Dashboard;
