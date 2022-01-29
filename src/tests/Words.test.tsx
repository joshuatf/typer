import { render, screen } from '@testing-library/react';
import { Words } from '../components/Words';

test('should show all given words', () => {
  render(<Words id="test" words={ [ 'one', 'two' ] } />);
  const item1 = screen.getByText('one');
  const item2 = screen.getByText('two');
  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
});
