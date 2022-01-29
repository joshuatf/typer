import { fireEvent, render, screen } from '@testing-library/react';
import { WordInput } from '../components/WordInput';

const defaultProps = {
  word: 'hello',
  onCorrect: () => {},
  onError: () => {},
  onComplete: () => {},
  onSkip: () => {},
};

test('should render the word as letters', () => {
  render(<WordInput { ...defaultProps } />);
  expect( screen.getByText('h') ).toBeInTheDocument();
  expect( screen.getByText('e') ).toBeInTheDocument();
  expect( screen.getAllByText('l')[0] ).toBeInTheDocument();
  expect( screen.getAllByText('l')[1] ).toBeInTheDocument();
  expect( screen.getByText('o') ).toBeInTheDocument();
});

test('should add role to current letter', () => {
  const { container } = render(<WordInput { ...defaultProps } />);
  const letter = screen.getByRole( 'alert' );
  expect(letter.textContent).toBe('h');
  fireEvent.keyUp(container, { key: 'h' });
  const nextLetter = screen.getByRole( 'alert' );
  expect(nextLetter.textContent).toBe('e');
});

test('should stay on current letter when incorrect', () => {
  const { container } = render(<WordInput { ...defaultProps } />);
  const letter = screen.getByRole( 'alert' );
  expect(letter.textContent).toBe('h');
  fireEvent.keyUp(container, { key: 'b' });
  const nextLetter = screen.getByRole( 'alert' );
  expect(nextLetter.textContent).toBe('h');
});

test('should call onCorrect when letter is correct', () => {
  const onCorrect = jest.fn();
  const { container } = render(<WordInput { ...defaultProps} onCorrect={ onCorrect } />);
  fireEvent.keyUp(container, { key: 'h' });
  expect(onCorrect).toBeCalled();
});

test('should call onError when letter is incorrect', () => {
  const onError = jest.fn();
  const { container } = render(<WordInput { ...defaultProps} onError={ onError } />);
  fireEvent.keyUp(container, { key: 'c' });
  expect(onError).toBeCalled();
});

test('should call onComplete when word is complete', () => {
  const onComplete = jest.fn();
  const { container } = render(<WordInput { ...defaultProps} onComplete={ onComplete } />);
  fireEvent.keyUp(container, { key: 'h' });
  fireEvent.keyUp(container, { key: 'e' });
  fireEvent.keyUp(container, { key: 'l' });
  fireEvent.keyUp(container, { key: 'l' });
  fireEvent.keyUp(container, { key: 'o' });
  fireEvent.keyUp(container, { key: ' ' });
  expect(onComplete).toBeCalled();
});

test('should call onSkip when pressing space before word is complete', () => {
  const onSkip = jest.fn();
  const { container } = render(<WordInput { ...defaultProps} onSkip={ onSkip } />);
  fireEvent.keyUp(container, { key: 'h' });
  fireEvent.keyUp(container, { key: 'e' });
  fireEvent.keyUp(container, { key: ' ' });
  expect(onSkip).toBeCalled();
});
