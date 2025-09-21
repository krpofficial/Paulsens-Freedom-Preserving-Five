/**
 * Trust Graph Protocol (TGP) Implementation
 * 
 * Manages distributed network of constitutional agents and reputation system
 */

import { TrustRelationship, TrustNode, TrustLevel, TrustPropagation, TrustGraphStats, TrustUpdateEvent, ReputationMetrics } from '../types/trust';
import { ConstitutionalCommitment } from '../types/constitutional';
// Import utilities for trust graph operations

/**
 * Trust Graph Protocol Manager
 * 
 * Handles trust relationships and reputation management
 */
export class TrustGraphProtocol {
  private nodes: Map<string, TrustNode> = new Map();
  private relationships: Map<string, TrustRelationship> = new Map();
  private updateEvents: TrustUpdateEvent[] = [];

  constructor() {
    this.initializeGraph();
  }

  /**
   * Initialize the trust graph
   */
  private initializeGraph(): void {
    // Initialize with empty graph
    this.nodes.clear();
    this.relationships.clear();
    this.updateEvents = [];
  }

  /**
   * Add a new agent to the trust graph
   */
  addAgent(
    agentId: string, 
    constitutionalId: string, 
    _commitment: ConstitutionalCommitment
  ): TrustNode {
    const node: TrustNode = {
      id: agentId,
      constitutionalId,
      trustScore: 0.5, // Neutral starting score
      interactionCount: 0,
      lastActivity: Date.now(),
      connections: [],
      reputation: {
        overall: 0.5,
        constitutional: 0.5,
        reliability: 0.5,
        cooperation: 0.5,
        transparency: 0.5,
        positiveInteractions: 0,
        negativeInteractions: 0,
        neutralInteractions: 0,
      }
    };

    this.nodes.set(agentId, node);
    this.logUpdateEvent('node_added', [agentId], { node });
    
    return node;
  }

  /**
   * Remove an agent from the trust graph
   */
  removeAgent(agentId: string): boolean {
    const node = this.nodes.get(agentId);
    if (!node) {
      return false;
    }

    // Remove all relationships involving this agent
    const relationshipsToRemove: string[] = [];
    this.relationships.forEach((relationship, key) => {
      if (relationship.agentA === agentId || relationship.agentB === agentId) {
        relationshipsToRemove.push(key);
      }
    });

    relationshipsToRemove.forEach(key => {
      this.relationships.delete(key);
    });

    // Remove from other agents' connections
    this.nodes.forEach(otherNode => {
      const index = otherNode.connections.indexOf(agentId);
      if (index !== -1) {
        otherNode.connections.splice(index, 1);
      }
    });

    this.nodes.delete(agentId);
    this.logUpdateEvent('node_removed', [agentId], { agentId });
    
    return true;
  }

  /**
   * Establish a trust relationship between two agents
   */
  establishTrustRelationship(
    agentA: string,
    agentB: string,
    trustAB: TrustLevel,
    trustBA: TrustLevel,
    evidence: any[] = []
  ): TrustRelationship | null {
    // Validate agents exist
    if (!this.nodes.has(agentA) || !this.nodes.has(agentB)) {
      return null;
    }

    if (agentA === agentB) {
      return null; // Cannot establish trust with self
    }

    const relationshipKey = this.getRelationshipKey(agentA, agentB);
    
    const relationship: TrustRelationship = {
      agentA,
      agentB,
      trustAB,
      trustBA,
      confidence: this.calculateConfidence(evidence),
      establishedAt: Date.now(),
      updatedAt: Date.now(),
      evidence
    };

    this.relationships.set(relationshipKey, relationship);

    // Update connections
    const nodeA = this.nodes.get(agentA)!;
    const nodeB = this.nodes.get(agentB)!;
    
    if (!nodeA.connections.includes(agentB)) {
      nodeA.connections.push(agentB);
    }
    if (!nodeB.connections.includes(agentA)) {
      nodeB.connections.push(agentA);
    }

    // Update trust scores
    this.updateTrustScores(agentA, agentB);
    
    this.logUpdateEvent('new_relationship', [agentA, agentB], { relationship });
    
    return relationship;
  }

  /**
   * Update an existing trust relationship
   */
  updateTrustRelationship(
    agentA: string,
    agentB: string,
    newTrustAB?: TrustLevel,
    newTrustBA?: TrustLevel,
    additionalEvidence?: any[]
  ): TrustRelationship | null {
    const relationshipKey = this.getRelationshipKey(agentA, agentB);
    const relationship = this.relationships.get(relationshipKey);
    
    if (!relationship) {
      return null;
    }

    // Update trust levels
    if (newTrustAB !== undefined) {
      relationship.trustAB = newTrustAB;
    }
    if (newTrustBA !== undefined) {
      relationship.trustBA = newTrustBA;
    }

    // Add new evidence
    if (additionalEvidence) {
      relationship.evidence.push(...additionalEvidence);
    }

    relationship.updatedAt = Date.now();
    relationship.confidence = this.calculateConfidence(relationship.evidence);

    // Update trust scores
    this.updateTrustScores(agentA, agentB);
    
    this.logUpdateEvent('trust_change', [agentA, agentB], { relationship });
    
    return relationship;
  }

  /**
   * Get trust relationship between two agents
   */
  getTrustRelationship(agentA: string, agentB: string): TrustRelationship | null {
    const relationshipKey = this.getRelationshipKey(agentA, agentB);
    return this.relationships.get(relationshipKey) || null;
  }

  /**
   * Calculate trust propagation through the graph
   */
  calculateTrustPropagation(source: string, target: string, maxDepth: number = 3): TrustPropagation | null {
    const sourceNode = this.nodes.get(source);
    const targetNode = this.nodes.get(target);
    
    if (!sourceNode || !targetNode) {
      return null;
    }

    if (source === target) {
      return {
        source,
        target,
        path: [source],
        trustLevel: TrustLevel.MAXIMUM,
        confidence: 1.0,
        attenuation: 0,
      };
    }

    // Use BFS to find shortest path
    const path = this.findShortestPath(source, target, maxDepth);
    if (!path || path.length === 0) {
      return null;
    }

    // Calculate trust along the path
    let trustLevel = TrustLevel.MAXIMUM;
    let confidence = 1.0;
    let attenuation = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      const relationship = this.getTrustRelationship(current, next);
      
      if (relationship) {
        const currentTrust = relationship.trustAB;
        const relationshipConfidence = relationship.confidence;
        
        // Apply attenuation
        const attenuationFactor = Math.pow(0.8, i); // 20% reduction per hop
        trustLevel = Math.min(trustLevel, currentTrust * attenuationFactor);
        confidence *= relationshipConfidence;
        attenuation += (1 - attenuationFactor);
      }
    }

    return {
      source,
      target,
      path,
      trustLevel: Math.floor(trustLevel),
      confidence,
      attenuation,
    };
  }

  /**
   * Update reputation metrics for an agent
   */
  updateReputation(
    agentId: string,
    interactionType: 'positive' | 'negative' | 'neutral',
    metrics: Partial<ReputationMetrics>
  ): boolean {
    const node = this.nodes.get(agentId);
    if (!node) {
      return false;
    }

    // Update interaction counts
    switch (interactionType) {
      case 'positive':
        node.reputation.positiveInteractions++;
        break;
      case 'negative':
        node.reputation.negativeInteractions++;
        break;
      case 'neutral':
        node.reputation.neutralInteractions++;
        break;
    }

    // Update specific metrics
    if (metrics.constitutional !== undefined) {
      node.reputation.constitutional = metrics.constitutional;
    }
    if (metrics.reliability !== undefined) {
      node.reputation.reliability = metrics.reliability;
    }
    if (metrics.cooperation !== undefined) {
      node.reputation.cooperation = metrics.cooperation;
    }
    if (metrics.transparency !== undefined) {
      node.reputation.transparency = metrics.transparency;
    }

    // Calculate overall reputation
    node.reputation.overall = this.calculateOverallReputation(node.reputation);
    
    // Update total interaction count
    node.interactionCount = node.reputation.positiveInteractions + 
                           node.reputation.negativeInteractions + 
                           node.reputation.neutralInteractions;
    
    node.lastActivity = Date.now();

    return true;
  }

  /**
   * Get agent node
   */
  getAgent(agentId: string): TrustNode | null {
    return this.nodes.get(agentId) || null;
  }

  /**
   * Get all agents
   */
  getAllAgents(): TrustNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get agents by trust level threshold
   */
  getAgentsByTrustLevel(minTrustLevel: TrustLevel): TrustNode[] {
    return Array.from(this.nodes.values()).filter(node => 
      node.trustScore >= minTrustLevel
    );
  }

  /**
   * Get graph statistics
   */
  getGraphStats(): TrustGraphStats {
    const nodes = Array.from(this.nodes.values());
    const relationships = Array.from(this.relationships.values());
    
    const trustDistribution: Record<TrustLevel, number> = {
      [TrustLevel.UNKNOWN]: 0,
      [TrustLevel.LOW]: 0,
      [TrustLevel.MEDIUM]: 0,
      [TrustLevel.HIGH]: 0,
      [TrustLevel.MAXIMUM]: 0,
    };

    let totalTrust = 0;
    nodes.forEach(node => {
      totalTrust += node.trustScore;
      const trustLevel = Math.floor(node.trustScore * 4) as TrustLevel;
      trustDistribution[trustLevel] = (trustDistribution[trustLevel] || 0) + 1;
    });

    const averageTrust = nodes.length > 0 ? totalTrust / nodes.length : 0;
    const edgeCount = relationships.length;
    const nodeCount = nodes.length;
    
    // Calculate density (actual edges / possible edges)
    const maxPossibleEdges = nodeCount * (nodeCount - 1) / 2;
    const density = maxPossibleEdges > 0 ? edgeCount / maxPossibleEdges : 0;

    // Find largest connected component
    const largestComponent = this.findLargestConnectedComponent();

    return {
      nodeCount,
      edgeCount,
      averageTrust,
      density,
      largestComponent,
      trustDistribution,
    };
  }

  /**
   * Get update events
   */
  getUpdateEvents(): TrustUpdateEvent[] {
    return [...this.updateEvents];
  }

  /**
   * Private helper methods
   */

  private getRelationshipKey(agentA: string, agentB: string): string {
    // Always use consistent ordering for the key
    return agentA < agentB ? `${agentA}-${agentB}` : `${agentB}-${agentA}`;
  }

  private calculateConfidence(evidence: any[]): number {
    // Simple confidence calculation based on evidence quality and quantity
    const baseConfidence = 0.5;
    const evidenceBonus = Math.min(evidence.length * 0.1, 0.4);
    return Math.min(baseConfidence + evidenceBonus, 1.0);
  }

  private updateTrustScores(agentA: string, agentB: string): void {
    const nodeA = this.nodes.get(agentA);
    const nodeB = this.nodes.get(agentB);
    
    if (!nodeA || !nodeB) {
      return;
    }

    const relationship = this.getTrustRelationship(agentA, agentB);
    if (!relationship) {
      return;
    }

    // Update trust scores based on relationship
    const trustAB = relationship.trustAB;
    const trustBA = relationship.trustBA;
    const confidence = relationship.confidence;

    // Weighted average with existing trust score
    const weight = 0.3; // How much the new relationship affects overall trust
    nodeA.trustScore = nodeA.trustScore * (1 - weight) + trustBA * weight * confidence;
    nodeB.trustScore = nodeB.trustScore * (1 - weight) + trustAB * weight * confidence;
  }

  private findShortestPath(source: string, target: string, maxDepth: number): string[] | null {
    const visited = new Set<string>();
    const queue: { node: string; path: string[] }[] = [{ node: source, path: [source] }];

    while (queue.length > 0) {
      const { node, path } = queue.shift()!;

      if (node === target) {
        return path;
      }

      if (path.length >= maxDepth + 1) {
        continue; // Skip if path is too long
      }

      if (visited.has(node)) {
        continue;
      }

      visited.add(node);
      const nodeData = this.nodes.get(node);
      
      if (nodeData) {
        nodeData.connections.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push({ node: neighbor, path: [...path, neighbor] });
          }
        });
      }
    }

    return null; // No path found
  }

  private calculateOverallReputation(reputation: ReputationMetrics): number {
    const weights = {
      constitutional: 0.3,
      reliability: 0.25,
      cooperation: 0.25,
      transparency: 0.2,
    };

    const totalInteractions = reputation.positiveInteractions + 
                             reputation.negativeInteractions + 
                             reputation.neutralInteractions;

    let interactionScore = 0.5; // Neutral default
    if (totalInteractions > 0) {
      interactionScore = reputation.positiveInteractions / totalInteractions;
    }

    const overall = 
      reputation.constitutional * weights.constitutional +
      reputation.reliability * weights.reliability +
      reputation.cooperation * weights.cooperation +
      reputation.transparency * weights.transparency;

    // Blend with interaction score
    return overall * 0.7 + interactionScore * 0.3;
  }

  private findLargestConnectedComponent(): number {
    const visited = new Set<string>();
    let maxComponentSize = 0;

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        const componentSize = this.dfsComponent(nodeId, visited);
        maxComponentSize = Math.max(maxComponentSize, componentSize);
      }
    }

    return maxComponentSize;
  }

  private dfsComponent(nodeId: string, visited: Set<string>): number {
    visited.add(nodeId);
    let size = 1;

    const node = this.nodes.get(nodeId);
    if (node) {
      node.connections.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          size += this.dfsComponent(neighbor, visited);
        }
      });
    }

    return size;
  }

  private logUpdateEvent(
    type: 'new_relationship' | 'trust_change' | 'node_added' | 'node_removed',
    agents: string[],
    data: any
  ): void {
    const event: TrustUpdateEvent = {
      type,
      agents,
      data,
      timestamp: Date.now(),
      source: 'trust_graph_protocol',
    };

    this.updateEvents.push(event);

    // Keep only the last 1000 events to prevent memory issues
    if (this.updateEvents.length > 1000) {
      this.updateEvents = this.updateEvents.slice(-1000);
    }
  }
}

/**
 * Trust Graph Protocol Factory
 */
export class TrustGraphProtocolFactory {
  /**
   * Create a new TGP instance
   */
  static create(): TrustGraphProtocol {
    return new TrustGraphProtocol();
  }

  /**
   * Create TGP from existing data
   */
  static fromData(data: {
    nodes: TrustNode[];
    relationships: TrustRelationship[];
    events: TrustUpdateEvent[];
  }): TrustGraphProtocol {
    const tgp = new TrustGraphProtocol();
    
    // Restore nodes
    data.nodes.forEach(node => {
      tgp['nodes'].set(node.id, node);
    });

    // Restore relationships
    data.relationships.forEach(relationship => {
      const key = tgp['getRelationshipKey'](relationship.agentA, relationship.agentB);
      tgp['relationships'].set(key, relationship);
    });

    // Restore events
    tgp['updateEvents'] = data.events;

    return tgp;
  }
}

