import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

interface Options {
  route?: string,
  path?: string,
}

export function renderWithProviders(ui: ReactElement, { route = '/', path = '/' }: Options = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <IntlProvider locale="en" messages={{}}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </IntlProvider>,
  );
}
