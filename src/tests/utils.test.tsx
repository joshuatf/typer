import { getRandomIndex, getWordsFromRemaining, getWordsPerMinute, getAccuracy } from '../utils';

const wordBank = [ 'a', 'b', 'c' ];

test('should get a random index within the word bank', () => {
  const index = getRandomIndex( wordBank );
  expect(index).toBeGreaterThanOrEqual(0);
  expect(index).toBeLessThanOrEqual(2);
});

test('should return null for empty word bank', () => {
  const index = getRandomIndex( [] );
  expect(index).toBe(-1);
});

test('should get one random word and the remaining array', () => {
  const [ words, remaining ] = getWordsFromRemaining( 1, wordBank );
  expect(words.length).toBe(1);
  expect(remaining.length).toBe(2);
});

test('should get two random word and the remaining array', () => {
  const [ words, remaining ] = getWordsFromRemaining( 2, wordBank );
  expect(words.length).toBe(2);
  expect(remaining.length).toBe(1);
});

test('should get three random word and the remaining array', () => {
  const [ words, remaining ] = getWordsFromRemaining( 3, wordBank );
  expect(words.length).toBe(3);
  expect(remaining.length).toBe(0);
});

test('should get no words or remaining when wordbank is empty', () => {
  const [ words, remaining ] = getWordsFromRemaining( 3, [] );
  expect(words.length).toBe(0);
  expect(remaining.length).toBe(0);
});

test('should get words per minute over 60 seconds', () => {
  const wpm = getWordsPerMinute( 400, 60 );
  expect(wpm).toBe(80);
});

test('should get words per minute over 30 seconds', () => {
  const wpm = getWordsPerMinute( 250, 30 );
  expect(wpm).toBe(100);
});

test('should calculate accuracy', () => {
  const accuracy = getAccuracy( 100, 9 );
  expect(accuracy).toBe(91);
});
