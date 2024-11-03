import { useState } from 'react';
import { Vote, GanttChartSquare, History, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useVoting } from '../contexts/VotingContext';
import ElectionCard from './ElectionCard';

const ElectionList = () => {
  const { elections, loading } = useVoting();
  const [filter, setFilter] = useState('active');

  const filteredElections = elections.filter((election) => {
    if (filter === 'active') return election.isActive;
    if (filter === 'ended') return !election.isActive;
    return true;
  });

  const FilterButton = ({ label, value, icon: Icon }) => (
    <button
      onClick={() => setFilter(value)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        filter === value
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className='h-4 w-4' />
      <span>{label}</span>
    </button>
  );

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold text-gray-800'>Elections</h2>
        <div className='flex space-x-3'>
          <FilterButton label='All' value='all' icon={GanttChartSquare} />
          <FilterButton label='Active' value='active' icon={Vote} />
          <FilterButton label='Ended' value='ended' icon={History} />
        </div>
      </div>

      {loading ? (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto'></div>
        </div>
      ) : filteredElections.length === 0 ? (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            No elections found for the selected filter.
          </AlertDescription>
        </Alert>
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
