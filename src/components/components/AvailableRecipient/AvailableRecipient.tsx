import { FC, ReactElement } from 'react';
import { useLayoutContext } from '../../hooks/useLayoutContext';

const AvailableRecipient: FC = (): ReactElement => {
  const { data } = useLayoutContext();

  return (
    <div>
      {data.availableRecipients?.map((recipient) => (recipient.domain))}
    </div>
  )
};

export default AvailableRecipient;
