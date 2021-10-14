import React from 'react';
import AppRouter from './components/AppRouter';
import AuthConextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthConextProvider>
      <AppRouter />
    </AuthConextProvider>
  );
}

export default App
