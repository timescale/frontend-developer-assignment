import React, { useState, useEffect } from "react";
import DefaultPageLayout from "../../organisms/defaultPageLayout/DefaultPageLayout";
import CardWithLabel from "../../atoms/cardWithLabel/CardWithLabel";
import { HomeContainer } from "./styles";
import { useGetRecipientsQuery } from "../../../api/RecipientsApi";
import EmailSelectList from "../../molecules/emailSelectList/EmailSelectList";
import { IndividualRecipient } from "../../../models/IndividualRecipient";
import { CompanyRecipient } from "../../../models/CompanyRecipient";
import Autocomplete from "../../molecules/autocomplete/Autocomplete";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const recipientData: IndividualRecipient[] = useGetRecipientsQuery();
  const [searchValue, setSearchValue] = useState<string>("");
  const [companyDomains, setCompanyDomains] = useState<string[]>([]);
  const [recipientList, setRecipientList] =
    useState<IndividualRecipient[]>(recipientData);
  const [companyRecipients, setCompanyRecipients] = useState<
    CompanyRecipient[]
  >([]);
  const [individualRecipients, setIndividualRecipients] = useState<
    IndividualRecipient[]
  >([]);

  const setGroupedRecipientLists = () => {
    const companyRecipients = [];
    if (companyDomains)
      companyDomains.forEach((domain, index) => {
        // Find all recipients that belong to company domains
        const matchingRecipients = recipientList.filter(
          (recipient: IndividualRecipient) => recipient.email.includes(domain),
        );

        companyRecipients.push({
          id: index + 1, // todo: should use an actual ID
          domainName: domain,
          recipients: matchingRecipients,
        });
      });

    const filteredIndividualRecipients = recipientList.filter(
      (recipient: { email: string | string[] }) =>
        // Group recipients that did not have a company domain
        !companyDomains?.some((domain) => recipient.email.includes(domain)),
    );

    setIndividualRecipients(filteredIndividualRecipients.flat());
    setCompanyRecipients(companyRecipients);
  };

  useEffect(() => {
    setGroupedRecipientLists();
  }, [companyDomains, recipientList]);

  const extractCompanyDomains = () => {
    // Gather all possible domains
    const fullDomainList = recipientList.map(
      (recipient) =>
        // Regex to find the domain and subdomain after an '@'
        recipient.email.match(/(?<=@)[^.]+(?=\.).*/)[0],
    );

    // Eliminate domains where there wasn't two or more
    const filteredDomains = fullDomainList.filter((domain, index) =>
      fullDomainList.includes(domain, index + 1),
    );

    // Remove repeated domains and return
    return Array.from(new Set(filteredDomains));
  };

  useEffect(() => {
    const filteredDomains = extractCompanyDomains();
    setCompanyDomains(filteredDomains);
  }, [recipientList]);

  const handleAutocompleteItemClick = (item: string) => {
    const updatedRecipientList = [...recipientList];
    const updateIndex = updatedRecipientList.findIndex((x) => x.email === item);
    updatedRecipientList[updateIndex].isSelected = true;

    setRecipientList(updatedRecipientList);
  };

  const handleCreateEmail = (email: string) =>
    setRecipientList((prevState) => [
      ...prevState,
      { email, isSelected: true },
    ]);

  return (
    <DefaultPageLayout>
      <HomeContainer>
        <CardWithLabel label="Available recipients">
          <Autocomplete
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            dropdownItems={recipientData
              ?.filter((recipient) => !recipient.isSelected)
              .map((recipient) => recipient.email)}
            handleItemClick={handleAutocompleteItemClick}
            handleEnterPress={handleCreateEmail}
            isValueValid={(email: string) => /(?<=@)[^.]+(?=\.).*/.test(email)}
          />
          <Box
            sx={{
              marginY: "calc(4rem - 40px)",
            }}
          />
          <EmailSelectList
            companyRecipients={companyRecipients}
            individualRecipients={individualRecipients}
            setCompanyRecipients={setCompanyRecipients}
            setIndividualRecipients={setIndividualRecipients}
            polarity={false}
          />
        </CardWithLabel>

        <CardWithLabel label="Selected recipients">
          <Box mt={"4rem"} />
          <EmailSelectList
            companyRecipients={companyRecipients}
            individualRecipients={individualRecipients}
            setCompanyRecipients={setCompanyRecipients}
            setIndividualRecipients={setIndividualRecipients}
            polarity={true}
          />
        </CardWithLabel>
      </HomeContainer>
    </DefaultPageLayout>
  );
};

export default Home;
