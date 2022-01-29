/**
 * Get a random index from a given word bank.
 * @param wordBank Word bank.
 * @returns number
 */
export const getRandomIndex = (wordBank: string[]): number => {
  if ( ! wordBank.length ) {
    return -1;
  }
  return Math.floor( Math.random() * wordBank.length );
};

/**
 * Get a given n amount of words from a word bank and return the spliced remainder.
 * @param n Number of words.
 * @param wordBank Word bank.
 * @returns array
 */
export const getWordsFromRemaining = ( n: number, wordBank: string[] ): string[][] => {
  const words = [];
  const remaining = [...wordBank];
  for ( let i = 0; i < n; i++ ) {
    const index = getRandomIndex( remaining );
    if ( index === -1 ) {
      break;
    }
    words.push( remaining[index] );
    remaining.splice( index, 1 );
  }
  return [
    words,
    remaining,
  ];
};

/**
 * Get the number of words per minute.
 * @param totalChars Total characters.
 * @param time Time in seconds.
 * @returns number
 */
export const getWordsPerMinute = ( totalChars: number, time: number ) => {
  return Math.floor( ( totalChars / 5 ) / ( time / 60 ) );
};

/**
 * Get the accuracy given the total words and typos.
 * @param totalChars Total characters.
 * @param typos Total typos.
 * @returns number
 */
export const getAccuracy = ( totalChars: number, typos: number ) => {
  return Math.round( 100 * ( totalChars - typos ) / totalChars );
};