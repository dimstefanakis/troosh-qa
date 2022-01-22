import React from "react";
import { Flex, Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let widths = [...Array(8)].map((e, i) => randomIntFromInterval(25, 70));

function MentorProfileSkeleton() {
  return (
    <AnimatePresence>
      <motion.div
        style={{ width: "100%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <Flex flexFlow="column" w="100%">
          <Flex w="100%" mb="120px">
            <SkeletonCircle size="100" endColor="#dce5ed" mr="20px" />
            <Flex flexFlow="column" flex={1}>
              <Skeleton height="30px" w="200px" endColor="#dce5ed" />
              <SkeletonText
                mt={2}
                noOfLines={3}
                spacing="1"
                flex={1}
                skeletonHeight="5"
                endColor="#dce5ed"
              />
            </Flex>
          </Flex>
          <Skeleton height="25px" w="100px" endColor="#dce5ed" />
          <Skeleton
            mt="16px"
            height="40px"
            w="150px"
            endColor="#dce5ed"
            borderRadius="20px"
          />
          <Skeleton height="25px" w="200px" endColor="#dce5ed" mt="30px" />
          <Flex flexFlow="row wrap" mt="16px" justifyContent="space-between">
            {[...Array(8)].map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <Skeleton
                    mb="16px"
                    height="40px"
                    w={`${widths[i]}%`}
                    endColor="#dce5ed"
                    borderRadius="20px"
                  />
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
}

export default MentorProfileSkeleton;
