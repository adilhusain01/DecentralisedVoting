import { WalletProvider } from './contexts/WalletContext';
import { VotingProvider } from './contexts/VotingContext';
import VotingApp from './pages/VotingApp';

const App = () => {
  return (
    <WalletProvider>
      <VotingProvider>
        <VotingApp />
      </VotingProvider>
    </WalletProvider>
  );
};

export default App;
