const CONTRACT_ADDRESS = '0xAcEcDc4f0F8E48bA08688aB468D0D0ceDc103A1A';
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'candidateId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'CandidateAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
    ],
    name: 'ElectionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
    ],
    name: 'ElectionEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'electionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'candidateId',
        type: 'uint256',
      },
    ],
    name: 'VoteCast',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'addCandidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_candidateId',
        type: 'uint256',
      },
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'createElection',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'electionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'elections',
    outputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'totalVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'candidateCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
    ],
    name: 'endElection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_candidateId',
        type: 'uint256',
      },
    ],
    name: 'getCandidate',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'voteCount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isRegistered',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
    ],
    name: 'getElection',
    outputs: [
      {
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'totalVotes',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'candidateCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_electionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_voter',
        type: 'address',
      },
    ],
    name: 'hasVoted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export { CONTRACT_ADDRESS, CONTRACT_ABI };
