import React, { useState } from 'react';
import { useVoting } from '../contexts/VotingContext';
import { useWallet } from '../contexts/WalletContext';

const ElectionCard = ({ election }) => {
  const { castVote, addCandidate, endElection, checkVoteStatus, loading } =
    useVoting();
  const { account } = useWallet();
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    description: '',
  });
  const [hasVoted, setHasVoted] = useState(false);

  React.useEffect(() => {
    const checkVoted = async () => {
      if (account) {
        const voted = await checkVoteStatus(election.id, account);
        setHasVoted(voted);
      }
    };
    checkVoted();
  }, [account, election.id]);

  const handleVote = async (candidateId) => {
    try {
      await castVote(election.id, candidateId);
      setHasVoted(true);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      await addCandidate(
        election.id,
        newCandidate.name,
        newCandidate.description
      );
      setShowAddCandidate(false);
      setNewCandidate({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleEndElection = async () => {
    try {
      await endElection(election.id);
    } catch (error) {
      console.error('Error ending election:', error);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='text-xl font-bold text-gray-800 mb-2'>{election.title}</h3>
      <p className='text-gray-600 mb-4'>{election.description}</p>

      <div className='mb-4'>
        <p className='text-sm text-gray-500'>
          Start: {new Date(election.startTime).toLocaleString()}
        </p>
        <p className='text-sm text-gray-500'>
          End: {new Date(election.endTime).toLocaleString()}
        </p>
      </div>

      {election.isActive && election.creator === account && (
        <button
          onClick={() => setShowAddCandidate(true)}
          className='mb-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
        >
          Add Candidate
        </button>
      )}

      <div className='space-y-3'>
        {election.candidates.map((candidate) => (
          <div key={candidate.id} className='border rounded-md p-3 bg-gray-50'>
            <h4 className='font-medium'>{candidate.name}</h4>
            <p className='text-sm text-gray-600'>{candidate.description}</p>
            <div className='mt-2 flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Votes: {candidate.voteCount}
              </span>
              {election.isActive && !hasVoted && (
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={loading}
                  className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300'
                >
                  Vote
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {election.creator === account && election.isActive && (
        <button
          onClick={handleEndElection}
          disabled={loading}
          className='mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300'
        >
          End Election
        </button>
      )}

      {showAddCandidate && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h3 className='text-xl font-bold mb-4'>Add New Candidate</h3>
            <form onSubmit={handleAddCandidate}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <input
                    type='text'
                    required
                    value={newCandidate.name}
                    onChange={(e) =>
                      setNewCandidate({ ...newCandidate, name: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    required
                    value={newCandidate.description}
                    onChange={(e) =>
                      setNewCandidate({
                        ...newCandidate,
                        description: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setShowAddCandidate(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300'
                >
                  {loading ? 'Adding...' : 'Add Candidate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionCard;
