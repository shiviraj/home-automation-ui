import { render } from '@testing-library/react';
import HeadTag from './HeadTag';

describe('<HeadTag/>', () => {
  it('should match the snapshot', () => {
    const { container } = render(<HeadTag title={'Vaishno Dham'} />);
    expect(container).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
