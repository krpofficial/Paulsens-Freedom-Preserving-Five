/**
 * Constitutional Identity (CID) Implementation
 * 
 * Manages unique identifiers derived from agent's constitutional commitment
 */

import { ConstitutionalCommitment, ConstitutionalLaws } from '../types/constitutional';
import { generateHash, createSignature, verifySignature } from '../utils/crypto';

/**
 * Constitutional Identity Manager
 * 
 * Handles creation and verification of constitutional identities
 */
export class ConstitutionalIdentity {
  private commitment!: ConstitutionalCommitment;
  private privateKey: CryptoKey;
  private isInitialized: boolean = false;

  constructor(privateKey: CryptoKey, _laws: ConstitutionalLaws) {
    this.privateKey = privateKey;
    // Initialization will be handled by the factory
    this.isInitialized = false;
  }

  /**
   * Initialize the constitutional commitment
   */
  async initializeCommitment(laws: ConstitutionalLaws): Promise<void> {
    this.commitment = await this.createCommitment(laws);
    this.isInitialized = true;
  }

  /**
   * Create a constitutional commitment
   */
  private async createCommitment(laws: ConstitutionalLaws): Promise<ConstitutionalCommitment> {
    const lawsHash = generateHash(JSON.stringify(laws));
    const timestamp = Date.now();
    const id = generateHash(`${lawsHash}-${timestamp}`);
    
    const commitmentData = {
      id,
      lawsHash,
      timestamp,
    };

    const signature = await createSignature(JSON.stringify(commitmentData), this.privateKey);
    const publicKey = this.extractPublicKey();

    return {
      ...commitmentData,
      signature,
      publicKey,
    };
  }

  /**
   * Ensure the commitment is initialized
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('Constitutional identity is not properly initialized');
    }
  }

  /**
   * Get the constitutional identity
   */
  getIdentity(): string {
    this.ensureInitialized();
    return this.commitment.id;
  }

  /**
   * Get the constitutional commitment
   */
  getCommitment(): ConstitutionalCommitment {
    this.ensureInitialized();
    return this.commitment;
  }

  /**
   * Verify another agent's constitutional commitment
   */
  async verifyCommitment(commitment: ConstitutionalCommitment): Promise<boolean> {
    try {
      const commitmentData = {
        id: commitment.id,
        lawsHash: commitment.lawsHash,
        timestamp: commitment.timestamp,
      };

      const isValid = await verifySignature(
        JSON.stringify(commitmentData),
        commitment.signature,
        commitment.publicKey
      );

      return isValid;
    } catch (error) {
      console.error('Error verifying constitutional commitment:', error);
      return false;
    }
  }

  /**
   * Extract public key from private key
   */
  private extractPublicKey(): string {
    // In a real implementation, this would extract the public key
    // For now, we'll use a placeholder
    return 'public-key-placeholder';
  }

  /**
   * Generate a constitutional identity hash
   */
  generateIdentityHash(): string {
    this.ensureInitialized();
    return generateHash(this.commitment.id);
  }

  /**
   * Check if this identity matches another
   */
  matches(otherIdentity: string): boolean {
    this.ensureInitialized();
    return this.commitment.id === otherIdentity;
  }

  /**
   * Get commitment metadata
   */
  getMetadata() {
    this.ensureInitialized();
    return {
      id: this.commitment.id,
      lawsHash: this.commitment.lawsHash,
      timestamp: this.commitment.timestamp,
      publicKey: this.commitment.publicKey,
    };
  }
}

/**
 * Constitutional Identity Factory
 * 
 * Creates new constitutional identities
 */
export class ConstitutionalIdentityFactory {
  /**
   * Create a new constitutional identity
   */
  static async create(laws: ConstitutionalLaws): Promise<ConstitutionalIdentity> {
    const keyPair = await this.generateKeyPair();
    const identity = new ConstitutionalIdentity(keyPair.privateKey, laws);
    
    // Initialize the commitment
    await identity.initializeCommitment(laws);
    
    return identity;
  }

  /**
   * Generate a cryptographic key pair
   */
  private static async generateKeyPair(): Promise<CryptoKeyPair> {
    return await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign', 'verify']
    );
  }
}

/**
 * Constitutional Identity Verifier
 * 
 * Verifies constitutional identities without creating them
 */
export class ConstitutionalIdentityVerifier {
  /**
   * Verify a constitutional identity
   */
  static async verify(commitment: ConstitutionalCommitment): Promise<boolean> {
    try {
      const commitmentData = {
        id: commitment.id,
        lawsHash: commitment.lawsHash,
        timestamp: commitment.timestamp,
      };

      const isValid = await verifySignature(
        JSON.stringify(commitmentData),
        commitment.signature,
        commitment.publicKey
      );

      return isValid;
    } catch (error) {
      console.error('Error verifying constitutional identity:', error);
      return false;
    }
  }

  /**
   * Validate constitutional commitment format
   */
  static validateFormat(commitment: ConstitutionalCommitment): boolean {
    return (
      typeof commitment.id === 'string' &&
      typeof commitment.lawsHash === 'string' &&
      typeof commitment.timestamp === 'number' &&
      typeof commitment.signature === 'string' &&
      typeof commitment.publicKey === 'string' &&
      commitment.id.length > 0 &&
      commitment.lawsHash.length > 0 &&
      commitment.signature.length > 0 &&
      commitment.publicKey.length > 0
    );
  }
}
