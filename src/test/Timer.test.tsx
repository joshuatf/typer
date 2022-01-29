import { act, render, screen } from '@testing-library/react';
import { Timer } from '../components/Timer';

test('should show the initial time', () => {
  render(<Timer seconds={ 60 } onComplete={ () => {} } />);
  const intialTime = screen.getByText(60);
  expect(intialTime).toBeInTheDocument();
});

test('should count down to zero', async () => {
  render(<Timer seconds={ 1 } onComplete={ () => {} } />);
  await act( () => {
    return new Promise((r) => setTimeout(r, 1500));
  } );
  const endTime = screen.getByText(0);
  expect(endTime).toBeInTheDocument();
});

test('should call onComplete when countdown is finished', async () => {
  const mockCallback = jest.fn();
  render(<Timer seconds={ 1 } onComplete={ mockCallback } />);
  await act( () => {
    return new Promise((r) => setTimeout(r, 1500));
  } );
  expect(mockCallback).toBeCalled();
});
