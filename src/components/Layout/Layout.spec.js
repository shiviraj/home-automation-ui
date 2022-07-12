import Layout from './Layout';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/styles';
import theme from '../../theme';

describe('Layout Components', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Layout title={'Vaishno Dham'} />
      </ThemeProvider>,
    );
    expect(container).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should have header', () => {
    render(
      <ThemeProvider theme={theme}>
        <Layout title={'Vaishno Dham'} />
      </ThemeProvider>,
    );
    const component = screen.getByText('Vaishno Dham');
    expect(component).toBeInTheDocument();
  });
});
