import React from "react";
import { Flex, Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function SkeletonLoader() {
  return (
    <Flex flexFlow="column">
      {[...Array(3)].map((e, i) => {
        return (
          <React.Fragment key={i}>
            <Skeleton height="100px" w="100%" endColor="#dce5ed" mb={3}/>
          </React.Fragment>
        );
      })}
    </Flex>
  );
}

export default SkeletonLoader;
