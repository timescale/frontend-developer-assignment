import React, { useState, useEffect } from "react";
import SearchBar from "../../atoms/searchBar/SearchBar";
import { Box, Menu, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";

interface AutocompleteProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  dropdownItems: string[];
  handleItemClick: (item: string) => void;
  handleEnterPress: (value: string) => void;
  isValueValid?: (email: string) => boolean;
}

export const Autocomplete = ({
  searchValue,
  setSearchValue,
  dropdownItems,
  handleItemClick,
  handleEnterPress,
  isValueValid,
}: AutocompleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string>("");

  const onEnterKeyPress = () => {
    if (isValueValid && !isValueValid(searchValue)) {
      setError("You must provide a valid email.");
      return;
    } else {
      setError("");
      // Trim white space, if needed
      handleEnterPress(searchValue.replace(/\s/g, ""));
      setSearchValue("");
    }
  };

  useEffect(() => {
    if (searchValue === "") setError("");
  }, [searchValue]);

  return (
    <Box sx={{ position: "relative" }}>
      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        onFocus={() => onOpen()}
        handleEnterPress={onEnterKeyPress}
        error={error}
      />
      {!error && !!dropdownItems.length && (
        <Box sx={{ position: "absolute", bottom: "-4px" }}>
          <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <MenuList>
              {dropdownItems.map((item, index) => (
                <MenuItem key={index} onClick={() => handleItemClick(item)}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Autocomplete;
