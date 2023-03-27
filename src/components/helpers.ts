import { IDomainData, IAvailableRecipient } from '../models/recipients.model';

export const getAvailableRecipient = (users: IDomainData[]): IAvailableRecipient[] => {
  const groupedUsers = users.reduce((acc, user) => {
    const domain = user.email.split('@')[1];
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(user);
    return acc;
  }, {});

  return Object.keys(groupedUsers).map(domain => ({
    domain,
    data: groupedUsers[domain]
  }));
};
