/**
 * Attestation Types
 * 
 * Defines types for behavioral attestations and verification
 */

/**
 * Behavioral attestation proving constitutional adherence
 */
export interface BehavioralAttestation {
  /** Unique identifier for this attestation */
  id: string;
  /** Agent that created this attestation */
  agentId: string;
  /** Constitutional action being attested to */
  actionId: string;
  /** Type of attestation */
  type: 'proof_of_work' | 'zero_knowledge' | 'merkle_proof' | 'signature';
  /** The attestation data */
  data: any;
  /** Cryptographic proof */
  proof: string;
  /** Timestamp when attestation was created */
  timestamp: number;
  /** Expiration time for this attestation */
  expiresAt?: number;
  /** Verifiers who have confirmed this attestation */
  verifiers: string[];
}

/**
 * Merkle tree proof for behavioral chain
 */
export interface MerkleProof {
  /** The leaf node being proven */
  leaf: string;
  /** The path from leaf to root */
  path: Array<{
    /** Hash of the sibling node */
    hash: string;
    /** Position of the sibling (left or right) */
    position: 'left' | 'right';
  }>;
  /** The root hash of the tree */
  root: string;
  /** Index of the leaf in the tree */
  index: number;
}

/**
 * Zero-knowledge proof for constitutional adherence
 */
export interface ZeroKnowledgeProof {
  /** The proof data */
  proof: string;
  /** Public inputs to the proof */
  publicInputs: string[];
  /** Circuit used for the proof */
  circuit: string;
  /** Timestamp when proof was generated */
  timestamp: number;
}

/**
 * Attestation chain entry
 */
export interface AttestationChainEntry {
  /** Previous entry hash */
  previousHash: string;
  /** Current entry hash */
  hash: string;
  /** The attestation data */
  attestation: BehavioralAttestation;
  /** Nonce for proof of work */
  nonce: number;
  /** Timestamp when entry was created */
  timestamp: number;
}

/**
 * Attestation verification result
 */
export interface AttestationVerification {
  /** Whether the attestation is valid */
  isValid: boolean;
  /** Confidence level (0-1) */
  confidence: number;
  /** Verification method used */
  method: 'cryptographic' | 'peer_consensus' | 'merkle_proof' | 'zero_knowledge';
  /** Timestamp of verification */
  timestamp: number;
  /** Errors found during verification */
  errors: string[];
  /** Warnings during verification */
  warnings: string[];
}

/**
 * Selective disclosure proof
 */
export interface SelectiveDisclosureProof {
  /** What is being disclosed */
  disclosed: string[];
  /** What remains hidden */
  hidden: string[];
  /** Proof that hidden data exists without revealing it */
  proof: string;
  /** Commitment to the hidden data */
  commitment: string;
}

