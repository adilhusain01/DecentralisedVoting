import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './WalletContext';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contractHelper';

const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const { signer, account } = useWallet();
  const [contract, setContract] = useState(null);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signer) {
      initializeContract();
    }
  }, [signer]);

  const initializeContract = async () => {
    try {
      const votingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      setContract(votingContract);
      await loadElections();
    } catch (error) {
      console.error('Contract initialization error:', error);
    }
  };

  const loadElections = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const electionCount = await contract.electionCount();
      const loadedElections = [];

      for (let i = 0; i < electionCount; i++) {
        const election = await contract.getElection(i);
        const candidates = await loadCandidates(i);

        loadedElections.push({
          id: i,
          creator: election.creator,
          title: election.title,
          description: election.description,
          startTime: new Date(Number(election.startTime) * 1000),
          endTime: new Date(Number(election.endTime) * 1000),
          isActive: election.isActive,
          totalVotes: Number(election.totalVotes),
          candidates: candidates,
        });
      }

      setElections(loadedElections);
    } catch (error) {
      console.error('Error loading elections:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCandidates = async (electionId) => {
    const candidateCount = await contract
      .getElection(electionId)
      .then((e) => e.candidateCount);
    const candidates = [];

    for (let i = 0; i < candidateCount; i++) {
      const candidate = await contract.getCandidate(electionId, i);
      candidates.push({
        id: i,
        name: candidate.name,
        description: candidate.description,
        voteCount: candidate.voteCount.toString(),
        isRegistered: candidate.isRegistered,
      });
    }

    return candidates;
  };

  const createElection = async (title, description, startTime, endTime) => {
    try {
      setLoading(true);
      const tx = await contract.createElection(
        title,
        description,
        Math.floor(startTime.getTime() / 1000),
        Math.floor(endTime.getTime() / 1000)
      );
      await tx.wait();
      await loadElections();
    } catch (error) {
      console.error('Error creating election:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (electionId, name, description) => {
    try {
      setLoading(true);
      const tx = await contract.addCandidate(electionId, name, description);
      await tx.wait();
      await loadElections();
    } catch (error) {
      console.error('Error adding candidate:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (electionId, candidateId) => {
    try {
      setLoading(true);
      const tx = await contract.castVote(electionId, candidateId);
      await tx.wait();
      await loadElections();
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const endElection = async (electionId) => {
    try {
      setLoading(true);
      const tx = await contract.endElection(electionId);
      await tx.wait();
      await loadElections();
    } catch (error) {
      console.error('Error ending election:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkVoteStatus = async (electionId, address) => {
    try {
      return await contract.hasVoted(electionId, address);
    } catch (error) {
      console.error('Error checking vote status:', error);
      throw error;
    }
  };

  return (
    <VotingContext.Provider
      value={{
        elections,
        loading,
        createElection,
        addCandidate,
        castVote,
        endElection,
        checkVoteStatus,
        loadElections,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
