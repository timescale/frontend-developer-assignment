import { IAvailableRecipient, IDomainData } from '../../models/recipients.model';
import { getAvailableRecipient } from '../helpers';

const mockedData: IDomainData[] = [
  {
    email: "first@domainOne.com",
    isSelected: false,
  },
  {
    email: "second@domainOne.com",
    isSelected: true,
  },
  {
    email: "thired@domainTwo.com",
    isSelected: false,
  }
];

describe('getAvailableRecipient', () => {
  it('should return an array of recipients', () => {
    const availableRecipients: IAvailableRecipient[] = getAvailableRecipient(mockedData);
    const expectedResult: IAvailableRecipient[] = [
      {
        domain: 'domainOne.com',
        data: [
          {
            email: 'first@domainOne.com',
            isSelected: false,
          },
          {
            email: 'second@domainOne.com',
            isSelected: true,
          }
        ],
      },
      {
        domain: 'domainTwo.com',
        data: [
          {
            email: "thired@domainTwo.com",
            isSelected: false,
          },
        ],
      }
    ];
  
    expect(availableRecipients).toEqual(expectedResult);
  });
});
