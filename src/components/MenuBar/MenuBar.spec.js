import MenuBar from './MenuBar';
import { render, screen } from '@testing-library/react';
import useMedia from '../../hooks/useMedia';

jest.mock('../../hooks/useMedia');

describe('<Menubar/>', () => {
  it('should match the snapshot', () => {
    useMedia.mockReturnValue({ sm: false });
    const { container } = render(<MenuBar />);
    expect(container).not.toBeNull();
    expect(container).toMatchSnapshot();
    const component = screen.getByTestId('menubar');
    expect(component).toBeInTheDocument();
  });

  it('should have header', () => {
    useMedia.mockReturnValue({ sm: true });
    render(<MenuBar open={true} onClose={jest.fn()} />);
    const component = screen.getByTestId('menubar-drawer');
    expect(component).toBeInTheDocument();
  });
});
