import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CompanyRecipient } from "../../../models/CompanyRecipient";
import { IndividualRecipient } from "../../../models/IndividualRecipient";
import { StyledAccordionItem } from "./styles";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface SelectedRecipientListProps {
  companyRecipients: CompanyRecipient[];
  individualRecipients: IndividualRecipient[];
  setCompanyRecipients: (companies: CompanyRecipient[]) => void;
  setIndividualRecipients: (recipients: IndividualRecipient[]) => void;
}

const SelectedRecipientList = ({
  companyRecipients,
  individualRecipients,
  setCompanyRecipients,
  setIndividualRecipients,
}: SelectedRecipientListProps) => {
  const [accordionIndex, setAccordionIndex] = useState<number>(-1);
  const [showCompanyRecipients, setShowCompanyRecipients] =
    useState<boolean>(true);
  const [showIndividualRecipients, setShowIndividualRecipients] =
    useState<boolean>(true);

  const handleIndividualRecipientClick = (recipient: IndividualRecipient) => {
    const updatedRecipientList = [...individualRecipients];
    const updateIndex = updatedRecipientList.indexOf(recipient);
    updatedRecipientList[updateIndex].isSelected =
      !updatedRecipientList[updateIndex].isSelected;

    setIndividualRecipients(updatedRecipientList);
  };

  const handleCompanyRecipientClick = (company: CompanyRecipient) => {
    const updatedCompanies: CompanyRecipient[] = [...companyRecipients];
    const updateIndex = updatedCompanies.indexOf(company);
    updatedCompanies[updateIndex]?.recipients?.map((recipient) => {
      const updatedRecipient = recipient;
      updatedRecipient.isSelected = false;
      return updatedRecipient;
    });
    setCompanyRecipients(updatedCompanies);
  };

  const handleCompanyIndividualRecipientClick = (
    company: CompanyRecipient,
    recipient: IndividualRecipient,
  ) => {
    const updatedCompanies: CompanyRecipient[] = [...companyRecipients];
    const updateCompanyIndex = updatedCompanies.indexOf(company);
    const updateRecipientIndex =
      updatedCompanies[updateCompanyIndex]?.recipients.indexOf(recipient);

    updatedCompanies[updateCompanyIndex].recipients[
      updateRecipientIndex
    ].isSelected = false;

    setCompanyRecipients(updatedCompanies);
  };

  const handleAccordionClick = (index: number) => {
    if (accordionIndex === index) setAccordionIndex(-1);
    else setAccordionIndex(index);
  };

  return (
    <Box>
      <StyledAccordionItem
        size={"xl"}
        sx={{ width: "100%" }}
        variant={"ghost"}
        leftIcon={
          !showCompanyRecipients ? (
            <ChevronDownIcon
              color={"gray.600"}
              sx={{ height: "1.5rem", width: "1.5rem" }}
            />
          ) : (
            <ChevronUpIcon
              color={"gray.600"}
              sx={{ height: "1.5rem", width: "1.5rem" }}
            />
          )
        }
        onClick={() => setShowCompanyRecipients(!showCompanyRecipients)}
      >
        company recipients
      </StyledAccordionItem>
      <Accordion index={accordionIndex}>
        {showCompanyRecipients &&
          companyRecipients
            .filter((company) =>
              company.recipients.some(
                (recipient) => recipient.isSelected === true,
              ),
            )
            .map((company, companyIndex) => (
              <AccordionItem key={companyIndex}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "1rem",
                  }}
                >
                  <IconButton variant={""} aria-label={"accordion-button"}>
                    <AccordionIcon
                      color={"gray.600"}
                      onClick={() => handleAccordionClick(companyIndex)}
                    />
                  </IconButton>
                  <AccordionButton
                    data-cy={`${company.domainName}-selected`}
                    onClick={() => handleCompanyRecipientClick(company)}
                  >
                    <Text>{company.domainName}</Text>
                  </AccordionButton>
                </Box>
                <AccordionPanel
                  pb={4}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {company.recipients
                    .filter((recipient) => recipient.isSelected === true)
                    .map((recipient, index) => (
                      <StyledAccordionItem
                        key={index}
                        variant="ghost"
                        sx={{
                          width: "calc(100%)",
                          marginLeft: "40px",
                        }}
                        data-cy={`${recipient.email}-selected`}
                        onClick={() =>
                          handleCompanyIndividualRecipientClick(
                            company,
                            recipient,
                          )
                        }
                      >
                        {recipient.isSelected === true && recipient.email}
                      </StyledAccordionItem>
                    ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
        <StyledAccordionItem
          size={"xl"}
          sx={{ width: "100%" }}
          variant={"ghost"}
          leftIcon={
            !showIndividualRecipients ? (
              <ChevronDownIcon
                color={"gray.600"}
                sx={{ height: "1.5rem", width: "1.5rem" }}
              />
            ) : (
              <ChevronUpIcon
                color={"gray.600"}
                sx={{ height: "1.5rem", width: "1.5rem" }}
              />
            )
          }
          onClick={() => setShowIndividualRecipients(!showIndividualRecipients)}
        >
          email recipients
        </StyledAccordionItem>
        {showIndividualRecipients &&
          individualRecipients
            .filter((recipient) => recipient.isSelected === true)
            .map((individual, index) => (
              <StyledAccordionItem
                key={index}
                sx={{
                  width: "calc(100% - 40px)",
                  marginLeft: "calc(1rem + 40px)",
                }}
                variant="ghost"
                onClick={() => handleIndividualRecipientClick(individual)}
                data-cy={`${individual.email}-selected`}
              >
                {individual.isSelected === true && individual.email}
              </StyledAccordionItem>
            ))}
      </Accordion>
    </Box>
  );
};

export default SelectedRecipientList;
