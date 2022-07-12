import MainApp from '../pages/_app';
import { render, screen } from '@testing-library/react';

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    services: {
      BFF_KCC_ORCHESTRATOR: 'http://localhost:9050',
      BFF_MASTER_DATA_SERVICE_BASE_URL: 'http://localhost:9007',
      INTERNAL_SERVICES_ACCESS_TOKEN: 'token',
      BFF_CUSTOMER_SERVICE_BASE_URL: 'http://localhost:9004',
    },
  },
}));

describe('App Page', () => {
  it('renders the component', async () => {
    const props = {
      Component: () => <>Dummy Component</>,
      pageProps: {},
    };
    render(<MainApp {...props} />);
    expect(screen.getByText('Dummy Component')).toBeInTheDocument();
  });
  // it('test init props', async () => {
  //   MainApp.getInitialProps = jest.fn();
  //   const applicationContext = { 'abc': 'test' };
  //   expect(MainApp.getInitialProps).toHaveBeenCalledWith(applicationContext);
  // });
});
