import React from "react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/layout";
import SkeletonLoader from "../Invitations/SkeletonLoader";
import { MyAssignedQuestionsProps } from "./interface";

function MyAssignedQuestions({ type, query }: MyAssignedQuestionsProps) {
  if (query.isLoading) {
    return <SkeletonLoader />;
  } else {
    return (
      <Flex flexFlow="column" width="100%">
        {query.data.map((question: any) => {
          let deliveryDate = new Date(
            question.answer_needed_now
              ? question.created
              : question.initial_delivery_time
          );
          let deliveryByDate = new Date();
          const dateNoTime =
            ("0" + deliveryDate.getDate()).slice(-2) +
            "-" +
            ("0" + (deliveryDate.getMonth() + 1)).slice(-2) +
            "-" +
            deliveryDate.getFullYear();
          const deliveryFormatted =
            ("0" + deliveryDate.getHours()).slice(-2) +
            ":" +
            ("0" + deliveryDate.getMinutes()).slice(-2);
          const deliveryByFormatted =
            ("0" + deliveryDate.getHours()).slice(-2) +
            ":" +
            ("0" + deliveryDate.getMinutes()).slice(-2);

          return (
            <React.Fragment key={question.id}>
              <Flex flexFlow="column" mb={10}>
                <Text fontWeight="600" fontSize="lg">
                  {question.body}
                </Text>
                {type === "archived" ? (
                  <ChakraLink color="teal.500" target="_blank" marginTop="10px">
                    Delivered at{" "}
                    <Text as="b">{dateNoTime + " " + deliveryFormatted}</Text>
                  </ChakraLink>
                ) : (
                  question.zoom_link && (
                    <Link href={question.zoom_link} passHref>
                      <ChakraLink
                        color="teal.500"
                        href={question.zoom_link}
                        target="_blank"
                        marginTop="10px"
                      >
                        Zoom link (starts{" "}
                        <Text as="b">
                          {dateNoTime + " " + deliveryFormatted + "-"}
                        </Text>
                        )
                      </ChakraLink>
                    </Link>
                  )
                )}
                {/* <Flex marginTop="10px">
                  <Text color="#999999" fontWeight="600" fontSize="sm">
                    Zoom call at <Text as="b">{deliveryFormatted}</Text>
                  </Text>
                </Flex> */}
              </Flex>
            </React.Fragment>
          );
        })}
      </Flex>
    );
  }
}

export default MyAssignedQuestions;
