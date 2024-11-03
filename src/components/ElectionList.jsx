import { useState } from 'react';
import { useVoting } from '../contexts/VotingContext';
import ElectionCard from './ElectionCard';

const ElectionList = () => {
  const { elections, loading } = useVoting();

  const [filter, setFilter] = useState('active'); // active, ended, all

  const filteredElections = elections.filter((election) => {
    if (filter === 'active') return election.isActive;
    if (filter === 'ended') return !election.isActive;
    return true;
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Elections</h2>
        <div className='space-x-2'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md ${
              filter === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('ended')}
            className={`px-4 py-2 rounded-md ${
              filter === 'ended'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Ended
          </button>
        </div>
      </div>

      {loading ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading elections...</p>
        </div>
      ) : filteredElections.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-600'>No elections found</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredElections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionList;
