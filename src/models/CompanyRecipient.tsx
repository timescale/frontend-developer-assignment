import { IndividualRecipient } from "./IndividualRecipient";

export interface CompanyRecipient {
  id: number;
  domainName: string;
  recipients: IndividualRecipient[];
}
