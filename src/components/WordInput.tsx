import { useEffect, useState } from 'react';
import { useKeyPress } from '../hooks/useKeyPress';

type WordProps = {
  onComplete: (letter: string) => void;
  onCorrect: () => void;
  onError: () => void;
  onSkip: () => void;
  word: string;
};

export const WordInput = ({ word, onComplete, onCorrect, onError, onSkip }: WordProps) => {
  const [letterIndex, setLetterIndex] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const isComplete = letterIndex === word.length;

  useKeyPress((key: string) => {
    if ( isComplete && key === ' ' ) {
      setIsError( false );
      onComplete( word );
    } else if ( key === word[letterIndex] ) {
      setIsError( false );
      onCorrect();
      setLetterIndex( letterIndex + 1 );
    } else if ( key === ' ' ) {
      setIsError( false );
      onSkip();
    } else {
      setIsError( true );
      onError();
    }
  });

  useEffect( () => {
    setLetterIndex(0);
  }, [word] );


  const getStateClass = (i: number): string => {
    let base = 'word-input__letter-';
    if ( i < letterIndex ) {
      return base + 'complete';
    }

    if ( i === letterIndex ) {
      if ( isError ) {
        base = base + 'error ' + base;
      }
      return base + 'active';
    }

    return base + 'upcoming';
  };

  const letters = word.split('');

  return (
    <div className={ `word-input ${ isComplete && 'is-complete' }` }>
      { letters.map( (letter, i) => {
        return (
          <span
            className={ `word-input__letter ${ getStateClass(i) }` }
            key={ i }
            role={ letterIndex === i ? 'alert' : undefined }
          >
            { letter }
          </span>
        );
      } ) }
    </div>
  );
};
