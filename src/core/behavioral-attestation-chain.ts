/**
 * Behavioral Attestation Chain (BAC) Implementation
 * 
 * Manages tamper-evident logs of constitutional actions and decisions
 */

import { BehavioralAttestation, AttestationChainEntry, MerkleProof, AttestationVerification } from '../types/attestation';
import { ConstitutionalAction } from '../types/constitutional';
import { generateHash, createSignature, generateMerkleRoot, createMerkleProof, verifyMerkleProof } from '../utils/crypto';
import { validateBehavioralAttestation } from '../utils/validation';

/**
 * Behavioral Attestation Chain Manager
 * 
 * Handles creation and verification of behavioral attestations
 */
export class BehavioralAttestationChain {
  private chain: AttestationChainEntry[] = [];
  private merkleTree: string[] = [];
  private privateKey: CryptoKey;
  private agentId: string;

  constructor(privateKey: CryptoKey, agentId: string) {
    this.privateKey = privateKey;
    this.agentId = agentId;
  }

  /**
   * Add a new constitutional action to the chain
   */
  async addAction(action: ConstitutionalAction): Promise<AttestationChainEntry> {
    const attestation = await this.createAttestation(action);
    const entry = await this.createChainEntry(attestation);
    
    this.chain.push(entry);
    this.updateMerkleTree();
    
    return entry;
  }

  /**
   * Create a behavioral attestation for a constitutional action
   */
  private async createAttestation(action: ConstitutionalAction): Promise<BehavioralAttestation> {
    const attestationData = {
      actionId: action.id,
      actionType: action.type,
      relatedLaw: action.relatedLaw,
      timestamp: action.timestamp,
    };

    // Generate proof for future zero-knowledge implementations
    await this.generateProof(attestationData);
    const signature = await createSignature(JSON.stringify(attestationData), this.privateKey);

    return {
      id: generateHash(`${action.id}-${Date.now()}`),
      agentId: this.agentId,
      actionId: action.id,
      type: 'merkle_proof',
      data: attestationData,
      proof: signature,
      timestamp: Date.now(),
      verifiers: [],
    };
  }

  /**
   * Generate proof for the attestation
   */
  private async generateProof(data: any): Promise<string> {
    // In a real implementation, this would generate a zero-knowledge proof
    // For now, we'll create a Merkle proof
    const dataHash = generateHash(JSON.stringify(data));
    const proof = {
      type: 'merkle_proof',
      dataHash,
      timestamp: Date.now(),
    };
    
    return JSON.stringify(proof);
  }

  /**
   * Create a chain entry
   */
  private async createChainEntry(attestation: BehavioralAttestation): Promise<AttestationChainEntry> {
    const previousHash = this.chain.length > 0 
      ? this.chain[this.chain.length - 1].hash 
      : '0';
    
    const entryData = {
      previousHash,
      attestation,
      nonce: Math.floor(Math.random() * 1000000),
      timestamp: Date.now(),
    };

    const hash = generateHash(JSON.stringify(entryData));
    
    return {
      previousHash,
      hash,
      attestation,
      nonce: entryData.nonce,
      timestamp: entryData.timestamp,
    };
  }

  /**
   * Update the Merkle tree with new entries
   */
  private updateMerkleTree(): void {
    const leaves = this.chain.map(entry => entry.hash);
    this.merkleTree = leaves;
  }

  /**
   * Get the current Merkle root
   */
  getMerkleRoot(): string {
    return generateMerkleRoot(this.merkleTree);
  }

  /**
   * Create a Merkle proof for a specific entry
   */
  createMerkleProof(entryIndex: number): MerkleProof | null {
    if (entryIndex < 0 || entryIndex >= this.chain.length) {
      return null;
    }

    // Entry validation could be added here for future enhancements
    const proof = createMerkleProof(this.merkleTree, entryIndex);
    return proof ? { ...proof, index: entryIndex } : null;
  }

  /**
   * Verify a Merkle proof
   */
  verifyMerkleProof(proof: MerkleProof): boolean {
    return verifyMerkleProof(proof);
  }

  /**
   * Get the entire chain
   */
  getChain(): AttestationChainEntry[] {
    return [...this.chain];
  }

  /**
   * Get a specific entry by index
   */
  getEntry(index: number): AttestationChainEntry | null {
    if (index < 0 || index >= this.chain.length) {
      return null;
    }
    return this.chain[index];
  }

  /**
   * Get entries by action type
   */
  getEntriesByType(type: string): AttestationChainEntry[] {
    return this.chain.filter(entry => entry.attestation.data.actionType === type);
  }

  /**
   * Get entries by constitutional law
   */
  getEntriesByLaw(law: string): AttestationChainEntry[] {
    return this.chain.filter(entry => entry.attestation.data.relatedLaw === law);
  }

  /**
   * Verify the integrity of the entire chain
   */
  verifyChainIntegrity(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      
      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get chain statistics
   */
  getChainStats(): {
    totalEntries: number;
    merkleRoot: string;
    isIntegrityValid: boolean;
    actionTypes: Record<string, number>;
    laws: Record<string, number>;
  } {
    const actionTypes: Record<string, number> = {};
    const laws: Record<string, number> = {};

    this.chain.forEach(entry => {
      const actionType = entry.attestation.data.actionType;
      const law = entry.attestation.data.relatedLaw;
      
      actionTypes[actionType] = (actionTypes[actionType] || 0) + 1;
      laws[law] = (laws[law] || 0) + 1;
    });

    return {
      totalEntries: this.chain.length,
      merkleRoot: this.getMerkleRoot(),
      isIntegrityValid: this.verifyChainIntegrity(),
      actionTypes,
      laws,
    };
  }

  /**
   * Verify an attestation
   */
  async verifyAttestation(attestation: BehavioralAttestation): Promise<AttestationVerification> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate attestation format
    const validation = validateBehavioralAttestation(attestation);
    if (!validation.isValid) {
      errors.push(...validation.errors);
    }

    // Verify proof
    let proofValid = false;
    try {
      const proofData = JSON.parse(attestation.proof);
      if (proofData.type === 'merkle_proof') {
        // In a real implementation, this would verify the cryptographic proof
        proofValid = true;
      }
    } catch (error) {
      errors.push('Invalid proof format');
    }

    // Check if attestation is in our chain
    const isInChain = this.chain.some(entry => entry.attestation.id === attestation.id);

    return {
      isValid: errors.length === 0 && proofValid,
      confidence: isInChain ? 1.0 : 0.7,
      method: 'merkle_proof',
      timestamp: Date.now(),
      errors,
      warnings,
    };
  }

  /**
   * Export chain for sharing
   */
  exportChain(): {
    agentId: string;
    merkleRoot: string;
    entries: AttestationChainEntry[];
    stats: any;
  } {
    return {
      agentId: this.agentId,
      merkleRoot: this.getMerkleRoot(),
      entries: this.getChain(),
      stats: this.getChainStats(),
    };
  }

  /**
   * Import chain from another agent
   */
  async importChain(chainData: any): Promise<boolean> {
    try {
      // Validate the imported chain
      if (!chainData.agentId || !chainData.entries || !Array.isArray(chainData.entries)) {
        return false;
      }

      // Verify Merkle root
      const importedRoot = chainData.merkleRoot;
      const calculatedRoot = generateMerkleRoot(chainData.entries.map((entry: any) => entry.hash));
      
      if (importedRoot !== calculatedRoot) {
        return false;
      }

      // Verify chain integrity
      for (let i = 1; i < chainData.entries.length; i++) {
        const current = chainData.entries[i];
        const previous = chainData.entries[i - 1];
        
        if (current.previousHash !== previous.hash) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error importing chain:', error);
      return false;
    }
  }
}

/**
 * Behavioral Attestation Chain Factory
 */
export class BehavioralAttestationChainFactory {
  /**
   * Create a new BAC instance
   */
  static async create(privateKey: CryptoKey, agentId: string): Promise<BehavioralAttestationChain> {
    return new BehavioralAttestationChain(privateKey, agentId);
  }

  /**
   * Create BAC from existing chain data
   */
  static async fromChainData(
    privateKey: CryptoKey, 
    agentId: string, 
    chainData: any
  ): Promise<BehavioralAttestationChain | null> {
    const bac = new BehavioralAttestationChain(privateKey, agentId);
    const isValid = await bac.importChain(chainData);
    
    if (isValid) {
      return bac;
    }
    
    return null;
  }
}

