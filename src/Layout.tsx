import { useState } from 'react';
import { Timer } from './components/Timer';

enum Statuses {
  Ready = 'ready',
  Started = 'started',
  Complete = 'complete',
}

const GAME_TIME = 60;

export const Layout: React.FC = () => {
  const [status, setStatus] = useState<Statuses>(Statuses.Ready);

  if (status === Statuses.Ready) {
    return <>ready</>;
  }

  if (status === Statuses.Started) {
    return <>
        <Timer
			onComplete={ () => setStatus(Statuses.Complete) }
			seconds={ GAME_TIME }
		/>
    </>;
  }

  if (status === Statuses.Complete) {
    return <>stats</>;
  }

  return null;
};

