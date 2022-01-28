import { useEffect, useState } from 'react';

type TimerProps = {
  onComplete: () => void;
  seconds: number;
};

export const Timer = ({ seconds, onComplete }: TimerProps) => {
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const countDown = () => {
    if ( elapsedTime > seconds * 1000 ) {
      onComplete();
    }

    return setTimeout( () => {
      setElapsedTime( Date.now() - startTime );
    }, 50 );
  };

  useEffect( () => {
    const timerId = countDown();

    return () => {
      if ( timerId ) {
        clearTimeout( timerId );
      }
    };
  }, [elapsedTime, startTime] );

  const percentage = ( (seconds - elapsedTime / 1000) / seconds ) * 100;

  return <div className="timer">
    <div className="timer__bar">
      <div className="timer__bar-progress" style={ { width: percentage + '%' } } />
    </div>
    { seconds - Math.floor( elapsedTime / 1000 ) }
  </div>;
};
