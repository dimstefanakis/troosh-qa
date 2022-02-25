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
import MetaTab from "../src/features/Settings/Meta";
import ProfileDashboardTab from "../src/features/Settings/Profile";
import AvailabilityTab from "../src/features/Settings/Availability";
import PaymentsTab from "../src/features/Settings/Payments";
import { useRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";

function Settings() {
  return (
    <>
      <SettingsText />
      <TabsBtn />
    </>
  );
}

function SettingsText() {
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
      <Text>Settings</Text>
    </Flex>
  );
}

function TabsBtn() {
  const [isSmallerThan767] = useMediaQuery("(max-width:767px)");
  const router = useRouter();

  const profileClick = () => {
    router.push("/settings?tab=profile");
  };

  const paymentsClick = () => {
    router.push("/settings?tab=payments");
  };

  const availabilityClick = () => {
    router.push("/settings?tab=availability");
  };

  const metaClick = () => {
    router.push("/settings?tab=meta");
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
          marginLeft={isSmallerThan767 ? "0px" : "30px"}
          paddingX="8px"
          paddingRight="60px"
        >
          <Tab maxH="50px" fontSize="xl" onClick={profileClick}>
            Profile
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={paymentsClick}>
            Payments
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={availabilityClick}>
            Availability
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={metaClick}>
            Meta
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
            paddingX="15px"
            paddingTop="10px"
            marginLeft={isSmallerThan767 ? "0px" : "30px"}
            width="100%"
          >
            <PaymentsTab />
          </TabPanel>
          <TabPanel
            paddingX="15px"
            paddingTop="10px"
            marginLeft={isSmallerThan767 ? "0px" : "30px"}
            width="100%"
          >
            <AvailabilityTab />
          </TabPanel>
          <TabPanel
            paddingX="15px"
            paddingTop="10px"
            marginLeft={isSmallerThan767 ? "0px" : "30px"}
            width="100%"
          >
            <MetaTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Settings;
