import { useWallet } from '../contexts/WalletContext';
import { Vote, Wallet } from 'lucide-react';

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  return (
    <nav className='bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-3'>
            <Vote className='h-8 w-8 text-indigo-600' />
            <h1 className='text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              DecentraVote
            </h1>
          </div>
          <button
            onClick={connectWallet}
            className='flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg'
          >
            <Wallet className='h-4 w-4' />
            <span>
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
