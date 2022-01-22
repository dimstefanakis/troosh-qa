import React from "react";
import { Flex, Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

function ResultsSkeleton() {
  return (
    <AnimatePresence>
      <motion.div
        style={{ width: "100%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(3)].map((e, i) => {
          return (
            <React.Fragment key={i}>
              <ResultSkeleton />
            </React.Fragment>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

function ResultSkeleton() {
  return (
    <Flex w="100%" mb={10} p={3}>
      <SkeletonCircle size="70" endColor="#dce5ed" />
      <Stack ml="20px" flexFlow="column" flex={1} spacing={3}>
        <Skeleton height="20px" w="200px" endColor="#dce5ed" />
        <Skeleton height="30px" w="120px" endColor="#dce5ed" />
        <SkeletonText
          noOfLines={4}
          spacing="1"
          w="100%"
          skeletonHeight="5"
          endColor="#dce5ed"
        />
      </Stack>
    </Flex>
  );
}

export default ResultsSkeleton;
