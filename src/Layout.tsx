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
    return <>
        <h1>Typer</h1>
		<button className='button' onClick={ () => setStatus(Statuses.Started) }>Start</button>
	</>;
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

