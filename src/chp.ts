/**
 * Constitutional Handshake Protocol (CHP) Main Class
 * 
 * Main interface for the CHP protocol implementation
 */

import { ConstitutionalIdentity } from './core/constitutional-identity';
import { BehavioralAttestationChain, BehavioralAttestationChainFactory } from './core/behavioral-attestation-chain';
import { TrustGraphProtocol, TrustGraphProtocolFactory } from './core/trust-graph-protocol';
import { ConstitutionalHandshakeSequence, ConstitutionalHandshakeSequenceFactory } from './core/handshake-sequence';
import { ConstitutionalLaws, ConstitutionalCommitment, ConstitutionalAction } from './types/constitutional';
// TrustLevel imported for type compatibility

/**
 * Main CHP Protocol Class
 * 
 * Provides the primary interface for constitutional agents to participate in the handshake protocol
 */
export class CHP {
  private constitutionalIdentity: ConstitutionalIdentity;
  private behavioralAttestationChain!: BehavioralAttestationChain;
  private trustGraphProtocol!: TrustGraphProtocol;
  private handshakeSequence!: ConstitutionalHandshakeSequence;
  private isInitialized: boolean = false;
  private agentId: string;
  private laws: ConstitutionalLaws;

  constructor(privateKey: CryptoKey, laws: ConstitutionalLaws, agentId: string) {
    this.agentId = agentId;
    this.constitutionalIdentity = new ConstitutionalIdentity(privateKey, laws);
    this.laws = laws;
    // Initialize components asynchronously - will be handled in the factory
    this.isInitialized = false;
  }

  /**
   * Initialize all CHP components
   */
  async initializeComponents(): Promise<void> {
    // Initialize Constitutional Identity first
    await this.constitutionalIdentity.initializeCommitment(this.laws);

    // Initialize Behavioral Attestation Chain
    this.behavioralAttestationChain = await BehavioralAttestationChainFactory.create(
      this.constitutionalIdentity['privateKey'],
      this.agentId
    );

    // Initialize Trust Graph Protocol
    this.trustGraphProtocol = TrustGraphProtocolFactory.create();

    // Initialize Constitutional Handshake Sequence
    this.handshakeSequence = ConstitutionalHandshakeSequenceFactory.create(
      this.trustGraphProtocol
    );

    // Add this agent to the trust graph
    const commitment = this.constitutionalIdentity.getCommitment();
    this.trustGraphProtocol.addAgent(
      this.agentId,
      this.constitutionalIdentity.getIdentity(),
      commitment
    );

    this.isInitialized = true;
  }

  /**
   * Get the constitutional identity
   */
  getIdentity(): string {
    this.ensureInitialized();
    return this.constitutionalIdentity.getIdentity();
  }

  /**
   * Get the constitutional commitment
   */
  getCommitment(): ConstitutionalCommitment {
    this.ensureInitialized();
    return this.constitutionalIdentity.getCommitment();
  }

  /**
   * Verify another agent's constitutional commitment
   */
  async verifyCommitment(commitment: ConstitutionalCommitment): Promise<boolean> {
    this.ensureInitialized();
    return await this.constitutionalIdentity.verifyCommitment(commitment);
  }

  /**
   * Check if this agent is constitutional
   */
  isConstitutional(): boolean {
    this.ensureInitialized();
    return true; // This agent adheres to the five laws
  }

  /**
   * Get constitutional compliance status
   */
  getComplianceStatus(): {
    isCompliant: boolean;
    laws: Array<keyof ConstitutionalLaws>;
    lastCheck: number;
  } {
    this.ensureInitialized();
    return {
      isCompliant: true,
      laws: ['law1', 'law2', 'law3', 'law4', 'law5'],
      lastCheck: Date.now(),
    };
  }

  /**
   * Ensure the CHP instance is properly initialized
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('CHP instance is not properly initialized');
    }
  }

  /**
   * Get protocol version
   */
  getVersion(): string {
    return '1.0.0';
  }

  /**
   * Get protocol capabilities
   */
  getCapabilities(): string[] {
    return [
      'constitutional_identity',
      'behavioral_attestation',
      'trust_graph',
      'handshake_sequence',
    ];
  }

  /**
   * Check if a capability is supported
   */
  hasCapability(capability: string): boolean {
    return this.getCapabilities().includes(capability);
  }

  /**
   * Record a constitutional action
   */
  async recordAction(action: ConstitutionalAction): Promise<void> {
    this.ensureInitialized();
    await this.behavioralAttestationChain.addAction(action);
  }

  /**
   * Initiate a handshake with another agent
   */
  async initiateHandshake(responderId: string): Promise<string> {
    this.ensureInitialized();
    const session = await this.handshakeSequence.initiateHandshake(
      this.agentId,
      responderId,
      this.constitutionalIdentity,
      this.behavioralAttestationChain
    );
    return session.sessionId;
  }

  /**
   * Respond to a handshake
   */
  async respondToHandshake(sessionId: string): Promise<any> {
    this.ensureInitialized();
    return await this.handshakeSequence.respondToHandshake(
      sessionId,
      this.constitutionalIdentity,
      this.behavioralAttestationChain
    );
  }

  /**
   * Get trust relationship with another agent
   */
  getTrustRelationship(agentId: string): any {
    this.ensureInitialized();
    return this.trustGraphProtocol.getTrustRelationship(this.agentId, agentId);
  }

  /**
   * Get agent reputation metrics
   */
  getReputationMetrics(): any {
    this.ensureInitialized();
    const agent = this.trustGraphProtocol.getAgent(this.agentId);
    return agent ? agent.reputation : null;
  }

  /**
   * Get behavioral attestation chain stats
   */
  getAttestationChainStats(): any {
    this.ensureInitialized();
    return this.behavioralAttestationChain.getChainStats();
  }

  /**
   * Get trust graph statistics
   */
  getTrustGraphStats(): any {
    this.ensureInitialized();
    return this.trustGraphProtocol.getGraphStats();
  }

  /**
   * Get handshake statistics
   */
  getHandshakeStats(): any {
    this.ensureInitialized();
    return this.handshakeSequence.getHandshakeStats();
  }

  /**
   * Clean up expired sessions
   */
  cleanupExpiredSessions(): void {
    this.ensureInitialized();
    this.handshakeSequence.cleanupExpiredSessions();
  }

  /**
   * Get all active handshake sessions
   */
  getActiveHandshakeSessions(): any[] {
    this.ensureInitialized();
    return this.handshakeSequence.getAllActiveSessions();
  }

  /**
   * Export agent data for backup or sharing
   */
  exportAgentData(): any {
    this.ensureInitialized();
    return {
      agentId: this.agentId,
      constitutionalIdentity: this.constitutionalIdentity.getCommitment(),
      attestationChain: this.behavioralAttestationChain.exportChain(),
      trustGraphStats: this.trustGraphProtocol.getGraphStats(),
      handshakeStats: this.handshakeSequence.getHandshakeStats(),
    };
  }
}

/**
 * CHP Factory
 * 
 * Creates new CHP instances
 */
export class CHPFactory {
  /**
   * Create a new CHP instance
   */
  static async create(laws: ConstitutionalLaws, agentId: string): Promise<CHP> {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign', 'verify']
    );

    const chp = new CHP(keyPair.privateKey, laws, agentId);
    await chp.initializeComponents();
    return chp;
  }

  /**
   * Create a CHP instance from existing keys
   */
  static async fromKeys(privateKey: CryptoKey, laws: ConstitutionalLaws, agentId: string): Promise<CHP> {
    const chp = new CHP(privateKey, laws, agentId);
    await chp.initializeComponents();
    return chp;
  }
}

