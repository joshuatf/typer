import { useState } from 'react';

enum Statuses {
  Ready = 'ready',
  Started = 'started',
  Complete = 'complete',
}

export const Layout: React.FC = () => {
  const [status] = useState<Statuses>(Statuses.Ready);

  if (status === Statuses.Ready) {
    return <>ready</>;
  }

  if (status === Statuses.Started) {
    return <>started</>;
  }

  if (status === Statuses.Complete) {
    return <>stats</>;
  }

  return null;
};

