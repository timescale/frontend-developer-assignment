import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CompanyRecipient } from "../../../models/CompanyRecipient";
import { IndividualRecipient } from "../../../models/IndividualRecipient";
import { StyledAccordionItem } from "./styles";

interface SelectListProps {
  companyRecipients: CompanyRecipient[];
  individualRecipients: IndividualRecipient[];
  setCompanyRecipients: (companies: CompanyRecipient[]) => void;
  setIndividualRecipients: (recipients: IndividualRecipient[]) => void;
  polarity: boolean;
}

const EmailSelectList = ({
  companyRecipients,
  individualRecipients,
  setCompanyRecipients,
  setIndividualRecipients,
  polarity,
}: SelectListProps) => {
  const [accordionIndex, setAccordionIndex] = useState<number>(-1);

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
      updatedRecipient.isSelected = !polarity;
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
    ].isSelected = !polarity;

    setCompanyRecipients(updatedCompanies);
  };

  console.log("accordion", accordionIndex);

  return (
    <Box sx={{ border: "1px solid black" }}>
      <Accordion index={accordionIndex}>
        {companyRecipients.map((company, companyIndex) => (
          // todo: ideally, these map would use a unique ID and not an index
          <AccordionItem key={companyIndex}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton variant={""} aria-label={"accordion-button"}>
                <AccordionIcon
                  onClick={() => setAccordionIndex(companyIndex)}
                />
              </IconButton>
              <AccordionButton
                onClick={() => handleCompanyRecipientClick(company)}
              >
                <Text key={companyIndex} data-cy={company.domainName}>
                  {company.domainName}
                </Text>
              </AccordionButton>
            </Box>
            <AccordionPanel
              pb={4}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {company.recipients
                .filter((recipient) => recipient.isSelected === polarity)
                .map((recipient, index) => (
                  <StyledAccordionItem
                    variant="ghost"
                    sx={{
                      width: "calc(100%)",
                      marginLeft: "40px",
                    }}
                    data-cy={`${recipient.email}-${polarity ? "selected" : "not-selected"}`}
                    onClick={() =>
                      handleCompanyIndividualRecipientClick(company, recipient)
                    }
                  >
                    {recipient.isSelected === polarity && recipient.email}
                  </StyledAccordionItem>
                ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
        {individualRecipients
          .filter((recipient) => recipient.isSelected === polarity)
          .map((individual, index) => (
            <StyledAccordionItem
              sx={{
                width: "calc(100% - 40px)",
                marginLeft: "40px",
              }}
              variant="ghost"
              onClick={() => handleIndividualRecipientClick(individual)}
              data-cy={`${individual.email}_${polarity ? "selected" : "not_selected"}`}
            >
              {individual.isSelected === polarity && individual.email}
            </StyledAccordionItem>
          ))}
      </Accordion>
    </Box>
  );
};

export default EmailSelectList;
