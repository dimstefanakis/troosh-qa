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
import InvitationTab from "../src/features/Dashboard/Invitations";
import MyAssignedQuestionsTab from "../src/features/Dashboard/MyAssignedQuestions";
import PrimaryButton from "../src/flat/PrimaryButton";
import SecondaryButton from "../src/flat/SecondaryButton";
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

  const invClick = () => {
    router.push("/settings?tab=invitation");
  };

  const profClick = () => {
    router.push("/settings?tab=profile");
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
          marginLeft={isSmallerThan767 ? "0px" : "30px"}
          paddingX="8px"
        >
          <Tab maxH="50px" fontSize="xl" onClick={profClick}>
            Profile
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={profClick}>
            Availability
          </Tab>
          <Tab maxH="50px" fontSize="xl" onClick={profClick}>
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
