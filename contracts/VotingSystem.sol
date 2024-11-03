// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    struct Candidate {
        string name;
        string description;
        uint256 voteCount;
        bool isRegistered;
    }

    struct Election {
        address creator;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 totalVotes;
        mapping(uint256 => Candidate) candidates;
        mapping(address => bool) hasVoted;
        uint256 candidateCount;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    event ElectionCreated(uint256 electionId, address creator, string title);
    event CandidateAdded(uint256 electionId, uint256 candidateId, string name);
    event VoteCast(uint256 electionId, address voter, uint256 candidateId);
    event ElectionEnded(uint256 electionId);

    modifier onlyElectionCreator(uint256 _electionId) {
        require(elections[_electionId].creator == msg.sender, "Not the election creator");
        _;
    }

    modifier electionExists(uint256 _electionId) {
        require(_electionId < electionCount, "Election does not exist");
        _;
    }

    modifier electionActive(uint256 _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(block.timestamp >= elections[_electionId].startTime, "Election has not started");
        require(block.timestamp <= elections[_electionId].endTime, "Election has ended");
        _;
    }

    function createElection(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) external returns (uint256) {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");

        uint256 electionId = electionCount++;
        Election storage election = elections[electionId];
        
        election.creator = msg.sender;
        election.title = _title;
        election.description = _description;
        election.startTime = _startTime;
        election.endTime = _endTime;
        election.isActive = true;
        election.candidateCount = 0;

        emit ElectionCreated(electionId, msg.sender, _title);
        return electionId;
    }

    function addCandidate(
        uint256 _electionId,
        string memory _name,
        string memory _description
    ) external onlyElectionCreator(_electionId) electionExists(_electionId) {
        require(block.timestamp < elections[_electionId].startTime, "Election has already started");
        
        uint256 candidateId = elections[_electionId].candidateCount++;
        Candidate storage candidate = elections[_electionId].candidates[candidateId];
        
        candidate.name = _name;
        candidate.description = _description;
        candidate.isRegistered = true;
        candidate.voteCount = 0;

        emit CandidateAdded(_electionId, candidateId, _name);
    }

    function castVote(uint256 _electionId, uint256 _candidateId) 
        external 
        electionExists(_electionId)
        electionActive(_electionId)
    {
        Election storage election = elections[_electionId];
        
        require(!election.hasVoted[msg.sender], "Already voted in this election");
        require(_candidateId < election.candidateCount, "Invalid candidate");
        require(election.candidates[_candidateId].isRegistered, "Candidate not registered");

        election.hasVoted[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;
        election.totalVotes++;

        emit VoteCast(_electionId, msg.sender, _candidateId);
    }

    function endElection(uint256 _electionId) 
        external 
        onlyElectionCreator(_electionId)
        electionExists(_electionId)
    {
        require(block.timestamp >= elections[_electionId].endTime, "Election period not over");
        elections[_electionId].isActive = false;
        emit ElectionEnded(_electionId);
    }

    // View functions
    function getElection(uint256 _electionId) external view returns (
        address creator,
        string memory title,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        bool isActive,
        uint256 totalVotes,
        uint256 candidateCount
    ) {
        Election storage election = elections[_electionId];
        return (
            election.creator,
            election.title,
            election.description,
            election.startTime,
            election.endTime,
            election.isActive,
            election.totalVotes,
            election.candidateCount
        );
    }

    function getCandidate(uint256 _electionId, uint256 _candidateId) external view returns (
        string memory name,
        string memory description,
        uint256 voteCount,
        bool isRegistered
    ) {
        Candidate storage candidate = elections[_electionId].candidates[_candidateId];
        return (
            candidate.name,
            candidate.description,
            candidate.voteCount,
            candidate.isRegistered
        );
    }

    function hasVoted(uint256 _electionId, address _voter) external view returns (bool) {
        return elections[_electionId].hasVoted[_voter];
    }
}