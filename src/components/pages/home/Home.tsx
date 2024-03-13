import React, { useState, useEffect } from "react";
import DefaultPageLayout from "../../organisms/defaultPageLayout/DefaultPageLayout";
import CardWithLabel from "../../atoms/cardWithLabel/CardWithLabel";
import { HomeContainer } from "./styles";
import { useGetRecipientsQuery } from "../../../api/RecipientsApi";
import AvailableRecipientList from "../../molecules/availableRecipientList/AvailableRecipientList";
import { IndividualRecipient } from "../../../models/IndividualRecipient";
import { CompanyRecipient } from "../../../models/CompanyRecipient";
import Autocomplete from "../../molecules/autocomplete/Autocomplete";
import { Box } from "@chakra-ui/react";
import SelectedRecipientList from "../../molecules/selectedRecipientList/SelectedRecipientList";

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

  useEffect(() => {
    const setGroupedRecipientLists = () => {
      const companyRecipients = [];
      if (companyDomains)
        companyDomains.forEach((domain, index) => {
          // Find all recipients that belong to company domains
          const matchingRecipients = recipientList.filter(
            (recipient: IndividualRecipient) =>
              recipient.email.includes(domain),
          );

          companyRecipients.push({
            id: index + 1,
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

    setGroupedRecipientLists();
  }, [companyDomains, recipientList]);

  useEffect(() => {
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
      { email, isSelected: false },
    ]);

  return (
    <DefaultPageLayout>
      <HomeContainer>
        <CardWithLabel label="Available recipients">
          <Autocomplete
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            dropdownItems={recipientList
              ?.filter(
                (recipient) =>
                  !recipient.isSelected &&
                  recipient.email.includes(searchValue),
              )
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
          <AvailableRecipientList
            companyRecipients={companyRecipients}
            individualRecipients={individualRecipients}
            setCompanyRecipients={setCompanyRecipients}
            setIndividualRecipients={setIndividualRecipients}
          />
        </CardWithLabel>

        <CardWithLabel label="Selected recipients">
          <Box mt={"1rem"} />
          <SelectedRecipientList
            companyRecipients={companyRecipients}
            individualRecipients={individualRecipients}
            setCompanyRecipients={setCompanyRecipients}
            setIndividualRecipients={setIndividualRecipients}
          />
        </CardWithLabel>
      </HomeContainer>
    </DefaultPageLayout>
  );
};

export default Home;
