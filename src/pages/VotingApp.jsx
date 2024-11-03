// import Navbar from '../components/Navbar';
// import ElectionList from '../components/ElectionList';
// import CreateElection from '../components/CreateElection';
// import { useWallet } from '../contexts/WalletContext';

// const VotingApp = () => {
//   const { account } = useWallet();

//   return (
//     <div className='min-h-screen bg-gray-100'>
//       <Navbar />
//       <main className='max-w-6xl mx-auto px-4 py-8'>
//         {account ? (
//           <>
//             <CreateElection />
//             <div className='mt-8'>
//               <ElectionList />
//             </div>
//           </>
//         ) : (
//           <div className='text-center py-12'>
//             <h2 className='text-2xl font-bold text-gray-800'>
//               Please connect your wallet to access the voting system
//             </h2>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default VotingApp;

import { useWallet } from '../contexts/WalletContext';
import { Wallet } from 'lucide-react';
import CreateElection from '../components/CreateElection';
import Navbar from '../components/Navbar';
import ElectionList from '../components/ElectionList';

const VotingApp = () => {
  const { account } = useWallet();

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {account ? (
          <>
            <CreateElection />
            <ElectionList />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-12 space-y-4'>
            <Wallet className='h-16 w-16 text-gray-400' />
            <h2 className='text-2xl font-semibold text-gray-800'>
              Connect Your Wallet
            </h2>
            <p className='text-gray-600'>
              Please connect your wallet to access the voting system
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VotingApp;
