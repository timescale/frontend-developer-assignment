import React from "react";
import { Box, Card, CardBody, Heading } from "@chakra-ui/react";

interface CardWithLabelProps {
  children: JSX.Element | JSX.Element[] | string;
  label?: string;
}

const CardWithLabel = ({ children, label }: CardWithLabelProps) => {
  return (
    <Card sx={{ minWidth: "600px", minHeight: "400px", padding: "2rem" }}>
      <Box
        sx={{
          border: "1px solid #BDBDBD",
          borderRadius: "4px",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        <Heading
          color={"gray.600"}
          as="h6"
          size="md"
          sx={{
            position: "absolute",
            top: "-1rem",
            left: "1rem",
            backgroundColor: "white",
          }}
        >
          {label}
        </Heading>

        <CardBody>{children}</CardBody>
      </Box>
    </Card>
  );
};

export default CardWithLabel;
