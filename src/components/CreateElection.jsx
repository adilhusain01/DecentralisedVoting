import { useState } from 'react';
import { useVoting } from '../contexts/VotingContext';

const CreateElection = () => {
  const { createElection, loading } = useVoting();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createElection(
        formData.title,
        formData.description,
        new Date(formData.startTime),
        new Date(formData.endTime)
      );
      setIsOpen(false);
      setFormData({ title: '', description: '', startTime: '', endTime: '' });
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'
      >
        Create New Election
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Create New Election</h2>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
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
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Start Time
                  </label>
                  <input
                    type='datetime-local'
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    End Time
                  </label>
                  <input
                    type='datetime-local'
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setIsOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300'
                >
                  {loading ? 'Creating...' : 'Create Election'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateElection;
