import { render, screen } from '@testing-library/react';
import Header from './Header';
import useMedia from '../../hooks/useMedia';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/useMedia');

describe('<Header/>', () => {
  it('should match the snapshot', () => {
    useMedia.mockReturnValue({ sm: false });
    const { container } = render(<Header title={'Vaishno Dham'} />);
    expect(container).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for small screen', () => {
    useMedia.mockReturnValue({ sm: true });
    const { container } = render(<Header title={'Vaishno Dham'} />);
    expect(container).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should have header', () => {
    useMedia.mockReturnValue({ sm: false });
    render(<Header title={'Vaishno Dham'} />);
    const component = screen.getByText('Vaishno Dham');
    expect(component).toBeInTheDocument();
  });

  it('should open the menubar when click on menu icon', async () => {
    useMedia.mockReturnValue({ sm: true });
    render(<Header title={'Vaishno Dham'} />);
    const component = screen.getByTestId('menu-icon');
    await userEvent.click(component);
    const menubar = screen.getByTestId('menubar-drawer');
    expect(menubar).toBeInTheDocument();
  });
});
