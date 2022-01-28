import { useEffect } from 'react';

export const useKeyPress = (callback: ( k: string ) => void ) =>  {
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    callback( key );
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  });
};
