import React from 'react';

import { ReconstructionsProvider } from './reconstructions';

const AppProvider: React.FC = ({ children }) => (
  <ReconstructionsProvider>{children}</ReconstructionsProvider>
);

export default AppProvider;
