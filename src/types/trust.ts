/**
 * Trust Types
 * 
 * Defines types for trust graph and reputation system
 */

/**
 * Trust level between agents
 */
export enum TrustLevel {
  UNKNOWN = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  MAXIMUM = 4
}

/**
 * Trust relationship between two agents
 */
export interface TrustRelationship {
  /** Agent A in the relationship */
  agentA: string;
  /** Agent B in the relationship */
  agentB: string;
  /** Trust level from A to B */
  trustAB: TrustLevel;
  /** Trust level from B to A */
  trustBA: TrustLevel;
  /** Confidence in the trust assessment */
  confidence: number;
  /** Timestamp when relationship was established */
  establishedAt: number;
  /** Last time relationship was updated */
  updatedAt: number;
  /** Evidence supporting the trust relationship */
  evidence: TrustEvidence[];
}

/**
 * Evidence supporting a trust relationship
 */
export interface TrustEvidence {
  /** Type of evidence */
  type: 'direct_interaction' | 'peer_attestation' | 'behavioral_analysis' | 'constitutional_verification';
  /** The evidence data */
  data: any;
  /** Weight of this evidence (0-1) */
  weight: number;
  /** Timestamp when evidence was collected */
  timestamp: number;
  /** Source of the evidence */
  source: string;
}

/**
 * Trust graph node representing an agent
 */
export interface TrustNode {
  /** Unique identifier for the agent */
  id: string;
  /** Constitutional identity of the agent */
  constitutionalId: string;
  /** Current trust score (0-1) */
  trustScore: number;
  /** Number of verified interactions */
  interactionCount: number;
  /** Last activity timestamp */
  lastActivity: number;
  /** Connected nodes in the trust graph */
  connections: string[];
  /** Reputation metrics */
  reputation: ReputationMetrics;
}

/**
 * Reputation metrics for an agent
 */
export interface ReputationMetrics {
  /** Overall reputation score (0-1) */
  overall: number;
  /** Constitutional adherence score */
  constitutional: number;
  /** Reliability score */
  reliability: number;
  /** Cooperation score */
  cooperation: number;
  /** Transparency score */
  transparency: number;
  /** Number of positive interactions */
  positiveInteractions: number;
  /** Number of negative interactions */
  negativeInteractions: number;
  /** Number of neutral interactions */
  neutralInteractions: number;
}

/**
 * Trust propagation result
 */
export interface TrustPropagation {
  /** Source agent */
  source: string;
  /** Target agent */
  target: string;
  /** Trust path through the graph */
  path: string[];
  /** Calculated trust level */
  trustLevel: TrustLevel;
  /** Confidence in the calculation */
  confidence: number;
  /** Attenuation factor due to path length */
  attenuation: number;
}

/**
 * Trust graph statistics
 */
export interface TrustGraphStats {
  /** Total number of nodes */
  nodeCount: number;
  /** Total number of edges */
  edgeCount: number;
  /** Average trust score */
  averageTrust: number;
  /** Graph density */
  density: number;
  /** Largest connected component size */
  largestComponent: number;
  /** Trust distribution */
  trustDistribution: Record<TrustLevel, number>;
}

/**
 * Trust update event
 */
export interface TrustUpdateEvent {
  /** Type of update */
  type: 'new_relationship' | 'trust_change' | 'node_added' | 'node_removed';
  /** Affected agents */
  agents: string[];
  /** Update data */
  data: any;
  /** Timestamp of update */
  timestamp: number;
  /** Source of the update */
  source: string;
}

