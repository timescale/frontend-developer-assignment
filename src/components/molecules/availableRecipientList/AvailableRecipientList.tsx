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

interface AvailableRecipientListProps {
  companyRecipients: CompanyRecipient[];
  individualRecipients: IndividualRecipient[];
  setCompanyRecipients: (companies: CompanyRecipient[]) => void;
  setIndividualRecipients: (recipients: IndividualRecipient[]) => void;
}

const AvailableRecipientList = ({
  companyRecipients,
  individualRecipients,
  setCompanyRecipients,
  setIndividualRecipients,
}: AvailableRecipientListProps) => {
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
      updatedRecipient.isSelected = true;
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
    ].isSelected = true;

    setCompanyRecipients(updatedCompanies);
  };

  const handleAccordionClick = (index: number) => {
    if (accordionIndex === index) setAccordionIndex(-1);
    else setAccordionIndex(index);
  };

  return (
    <Box>
      <Accordion index={accordionIndex}>
        {companyRecipients
          .filter((company) =>
            company.recipients.some(
              (recipient) => recipient.isSelected === false,
            ),
          )
          .map((company, companyIndex) => (
            <AccordionItem key={companyIndex}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton variant={""} aria-label={"accordion-button"}>
                  <AccordionIcon
                    color={"gray.600"}
                    onClick={() => handleAccordionClick(companyIndex)}
                  />
                </IconButton>
                <AccordionButton
                  data-cy={`${company.domainName}-not-selected`}
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
                  .filter((recipient) => recipient.isSelected === false)
                  .map((recipient, index) => (
                    <StyledAccordionItem
                      key={index}
                      variant="ghost"
                      sx={{
                        width: "calc(100%)",
                        marginLeft: "40px",
                      }}
                      data-cy={`${recipient.email}-not-selected`}
                      onClick={() =>
                        handleCompanyIndividualRecipientClick(
                          company,
                          recipient,
                        )
                      }
                    >
                      {recipient.isSelected === false && recipient.email}
                    </StyledAccordionItem>
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        {individualRecipients
          .filter((recipient) => recipient.isSelected === false)
          .map((individual, index) => (
            <StyledAccordionItem
              key={index}
              sx={{
                width: "calc(100% - 40px)",
                marginLeft: "40px",
              }}
              variant="ghost"
              onClick={() => handleIndividualRecipientClick(individual)}
              data-cy={`${individual.email}-not-selected`}
            >
              {individual.isSelected === false && individual.email}
            </StyledAccordionItem>
          ))}
      </Accordion>
    </Box>
  );
};

export default AvailableRecipientList;
