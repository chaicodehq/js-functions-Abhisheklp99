/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */

export function createElection(candidates) {
  // Your code here
  const votes = {};
  const registeredVoters = new Set();
  let voted = new Set();
  candidates.forEach((element) => {
    votes[element.id] = 0;
  });
  return {
    registerVoter(voter) {
      if (!voter || typeof voter !== "object") return false;
      if (!voter.id || !voter.name || typeof voter.age !== "number")
        return false;
      if (voter.age < 18) return false;
      if (registeredVoters.has(voter.id)) return false;

      registeredVoters.add(voter.id);
      return true;
    },

    castVote(voterId, candidateId, onSuccess, onError) {
      if (!registeredVoters.has(voterId)) {
        return onError("Voter not registered");
      }

      const candidateExist = candidates.some((c) => c.id === candidateId);
      if (!candidateExist) {
        return onError("Candidate not found");
      }

      if (voted.has(voterId)) {
        return onError("Voter already voted");
      }

      votes[candidateId]++;
      voted.add(voterId);

      return onSuccess({ voterId, candidateId });
    },

    getResults(sortFn) {
      const res=candidates.map((can)=>{
        return {
          ...can,
          votes:votes[can.id] || 0
        }

      })

      if(!sortFn){
        return res.sort((a,b)=>b.votes-a.votes)
      }

     return res.sort(sortFn)

    },
    getWinner() {

      const res=candidates.map((can)=>{
        return {
          ...can,
          votes:votes[can.id] || 0
        }
      })

   const sorted= res.sort((a,b)=>b.votes-a.votes);
   if(sorted.length ===0) return null;

   if (sorted[0].votes === 0) return null;
   return sorted[0]; 




    },
  };
}

export function createVoteValidator(rules) {
  // Your code here

  return function(voter){
    if (!voter || typeof voter !== "object") {
      return { valid: false, reason: "Invalid voter object" };
    }

    const votersKeys=Object.keys(voter);
    const isAllkeyExits=rules.requiredFields.every((item)=>votersKeys.includes(item))
    if(!isAllkeyExits) {
      return { valid: false, reason: "Missing required fields" };
    }
      if (voter.age < rules.minAge) {
        return { valid: false, reason: "Underage" };
      }
      
      return {valid:true}

  }
  


}

export function countVotesInRegions(regionTree) {
  // Your code here

if(!regionTree) return 0

let currentVotes=regionTree.votes || 0;

if(regionTree.subRegions && Array.isArray(regionTree.subRegions)  ){

  regionTree.subRegions.forEach((item)=>currentVotes+=countVotesInRegions(item))
}


return currentVotes

}

export function tallyPure(currentTally, candidateId) {
  // Your code here


  const newTally={...currentTally};
  newTally[candidateId]=(newTally[candidateId]||0)+1

  return newTally


}
