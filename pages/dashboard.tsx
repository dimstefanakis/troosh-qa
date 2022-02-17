import {
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
import { Text, Flex } from "@chakra-ui/layout";
import MyAssignedQuestions from "../src/features/Dashboard/MyAssignedQuestions";
import Invitations from "../src/features/Dashboard/Invitations";
import UpcomingQuestions from "../src/features/Dashboard/UpcomingQuestions";
import ArchivedQuestions from "../src/features/Dashboard/ArchivedQuestions";

function Dashboard() {
  return (
    <>
      <DashboardText />
      <DashboardTabs />
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
      <Text>Question Dashboard</Text>
    </Flex>
  );
}

function DashboardTabs() {
  return (
    <Box marginTop="100px" width="100%" marginLeft="0px">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList paddingX="8px">
          <Tab maxH="50px" fontSize="xl">
            Opportunities
          </Tab>
          <Tab maxH="50px" fontSize="xl">
            Upcoming
          </Tab>
          <Tab maxH="50px" fontSize="xl">
            Archived
          </Tab>
        </TabList>
        <TabPanels width="100%">
          <TabPanel paddingX="15px" paddingTop="10px" width="100%">
            <Invitations />
          </TabPanel>
          <TabPanel paddingX="15px" paddingTop="10px" width="100%">
            <UpcomingQuestions />
          </TabPanel>
          <TabPanel paddingX="15px" paddingTop="10px" width="100%">
            <ArchivedQuestions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Dashboard;
