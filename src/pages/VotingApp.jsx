import Navbar from '../components/Navbar';
import ElectionList from '../components/ElectionList';
import CreateElection from '../components/CreateElection';
import { useWallet } from '../contexts/WalletContext';

const VotingApp = () => {
  const { account } = useWallet();

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <main className='max-w-6xl mx-auto px-4 py-8'>
        {account ? (
          <>
            <CreateElection />
            <div className='mt-8'>
              <ElectionList />
            </div>
          </>
        ) : (
          <div className='text-center py-12'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Please connect your wallet to access the voting system
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default VotingApp;
