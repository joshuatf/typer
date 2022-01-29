import { useState, useEffect } from 'react';
import { getWordsFromRemaining } from './utils';
import { Timer } from './components/Timer';
import { wordBank } from './assets/wordBank';

enum Statuses {
  Ready = 'ready',
  Started = 'started',
  Complete = 'complete',
}

const UPCOMING_WORDS_SHOWN_COUNT = 3;
const GAME_TIME = 60;

export const Layout: React.FC = () => {
  const [status, setStatus] = useState<Statuses>(Statuses.Ready);
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(wordBank);

  useEffect( () => {
    const wordsNeededCount = UPCOMING_WORDS_SHOWN_COUNT - visibleWords.length;
    const [newWords, remaining] = getWordsFromRemaining( wordsNeededCount, remainingWords );
    setVisibleWords( [ ...visibleWords, ...newWords ] );
    setRemainingWords( remaining );
  }, [ visibleWords.length ] );

  const currentWord = visibleWords[0];

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
        { currentWord }
    </>;
  }

  if (status === Statuses.Complete) {
    return <>stats</>;
  }

  return null;
};

