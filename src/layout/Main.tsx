import { useState, useEffect } from 'react';
import { getWordsFromRemaining } from '../utils';
import { Timer } from '../components/Timer';
import { WordInput } from '../components/WordInput';
import { Words } from '../components/Words';
import { wordBank } from '../assets/wordBank';
import '../styles/Main.scss';

enum Statuses {
  Ready = 'ready',
  Started = 'started',
  Complete = 'complete',
}

const COMPLETED_WORDS_SHOWN_COUNT = 2;
const UPCOMING_WORDS_SHOWN_COUNT = 3;
const GAME_TIME = 60;

export const Main: React.FC = () => {
  const [status, setStatus] = useState<Statuses>(Statuses.Ready);
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(wordBank);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [typosCount, setTyposCount] = useState<number>(0);
  const [completedCharsCount, setCompletedCharsCount] = useState<number>(0);

  useEffect( () => {
    const wordsNeededCount = UPCOMING_WORDS_SHOWN_COUNT - visibleWords.length;
    const [newWords, remaining] = getWordsFromRemaining( wordsNeededCount, remainingWords );
    setVisibleWords( [ ...visibleWords, ...newWords ] );
    setRemainingWords( remaining );
  }, [ visibleWords.length ] );

  const recentlyCompletedWords = completedWords.slice(-COMPLETED_WORDS_SHOWN_COUNT);
  const currentWord = visibleWords[0];
  const upcomingWords = visibleWords.slice(1);

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
      <div className="words-container">
			<Words id="completed" words={ recentlyCompletedWords } />        
        { currentWord &&
          <WordInput
          onComplete={ (word) => {
            setCompletedWords( [...completedWords, word] );
            setVisibleWords( visibleWords.slice(1) );
          } }
          onCorrect={ () => setCompletedCharsCount( completedCharsCount + 1 ) }
          onError={ () => setTyposCount( typosCount + 1 ) }
          onSkip={ () => setVisibleWords( visibleWords.slice(1) ) }
          word={ currentWord }
          /> }
        <Words id="upcoming" words={ upcomingWords } />
      </div>
    </>;
  }

  if (status === Statuses.Complete) {
    return <>stats</>;
  }

  return null;
};

