import * as recipientsData from "../assets/recipientsData.json";
import { IndividualRecipient } from "../models/IndividualRecipient";

export const useGetRecipientsQuery: () => IndividualRecipient[] = () =>
  Array.from<IndividualRecipient>(recipientsData);
