import React from "react";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  onFocus?: () => void;
  handleEnterPress?: () => void;
  error?: string;
}

const SearchBar = ({
  value,
  setValue,
  onFocus,
  handleEnterPress,
  error,
}: SearchBarProps) => {
  return (
    <InputGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "20rem",
      }}
      onFocus={onFocus}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={"gray.600"} />
      </InputLeftElement>
      <Input
        id={"search-bar"}
        data-cy={"search-bar"}
        sx={{ borderColor: "#BDBDBD", borderRadius: "2rem" }}
        type="email"
        placeholder="search"
        value={value}
        isInvalid={error !== ""}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnterPress();
          }
        }}
      />
      {error !== "" && (
        <Text color={"#eb6161"} mt={1} ml={2} fontSize="xs">
          {error}
        </Text>
      )}
    </InputGroup>
  );
};

export default SearchBar;
