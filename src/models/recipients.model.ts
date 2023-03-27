export interface IDomainData {
  email: string;
  isSelected: boolean;
}

export interface IAvailableRecipient {
  domain: string;
  data: Array<IDomainData>;
}
