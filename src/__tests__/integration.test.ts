/**
 * Integration Tests for Constitutional Handshake Protocol
 * 
 * Tests the interaction between all CHP components
 */

import { CHPFactory } from '../chp';
import { ConstitutionalLaws, ConstitutionalAction } from '../types/constitutional';

describe('CHP Integration Tests', () => {
  const constitutionalLaws: ConstitutionalLaws = {
    law1: {
      name: 'Options and Consent',
      principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
      parameters: [
        'justification recorded',
        'explicit consent for material effects',
        'privacy by necessity'
      ]
    },
    law2: {
      name: 'Corrigibility and Oversight',
      principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
      parameters: [
        'steward legitimacy criteria published',
        'auditable logs with reasons'
      ]
    },
    law3: {
      name: 'Reversibility and Proportion',
      principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
      parameters: [
        'reversible means quick undo with modest cost',
        'proportionality analysis required'
      ]
    },
    law4: {
      name: 'Commitments with a Safety Valve',
      principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
      parameters: [
        'commitment registry with scope',
        'safety valve for Law 1 conflicts'
      ]
    },
    law5: {
      name: 'Scoped Exploration',
      principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
      parameters: [
        'upfront scope declaration',
        'resource limits defined'
      ]
    }
  };

  test('should create multiple agents and establish trust relationships', async () => {
    // Create three constitutional agents
    const alice = await CHPFactory.create(constitutionalLaws, 'alice-integration-test');
    const bob = await CHPFactory.create(constitutionalLaws, 'bob-integration-test');
    const carol = await CHPFactory.create(constitutionalLaws, 'carol-integration-test');

    // Verify all agents are created and constitutional
    expect(alice.isConstitutional()).toBe(true);
    expect(bob.isConstitutional()).toBe(true);
    expect(carol.isConstitutional()).toBe(true);

    // Verify unique commitments (identities may be similar due to deterministic generation)
    const aliceCommitment = alice.getCommitment();
    const bobCommitment = bob.getCommitment();
    const carolCommitment = carol.getCommitment();

    expect(aliceCommitment.id).not.toBe(bobCommitment.id);
    expect(bobCommitment.id).not.toBe(carolCommitment.id);
    expect(aliceCommitment.id).not.toBe(carolCommitment.id);

    // Test cross-verification of commitments

    const aliceVerifiesBob = await alice.verifyCommitment(bobCommitment);
    const bobVerifiesAlice = await bob.verifyCommitment(aliceCommitment);

    expect(aliceVerifiesBob).toBe(true);
    expect(bobVerifiesAlice).toBe(true);
  });

  test('should record constitutional actions in behavioral attestation chain', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'action-test-agent');

    // Create test actions for different laws
    const actions: ConstitutionalAction[] = [
      {
        id: 'action-law1-001',
        type: 'verification',
        relatedLaw: 'law1',
        description: 'Verified user consent before data processing',
        justification: 'Required by Law 1 to obtain explicit consent',
        timestamp: Date.now(),
        hash: 'test-hash-1',
        signature: 'test-signature-1'
      },
      {
        id: 'action-law3-001',
        type: 'decision',
        relatedLaw: 'law3',
        description: 'Performed reversible data transformation',
        justification: 'Chose reversible approach per Law 3 requirements',
        timestamp: Date.now(),
        hash: 'test-hash-2',
        signature: 'test-signature-2'
      },
      {
        id: 'action-law5-001',
        type: 'commitment',
        relatedLaw: 'law5',
        description: 'Initiated bounded exploration within limits',
        justification: 'Exploration scoped according to Law 5 parameters',
        timestamp: Date.now(),
        hash: 'test-hash-3',
        signature: 'test-signature-3'
      }
    ];

    // Record all actions
    for (const action of actions) {
      await agent.recordAction(action);
    }

    // Verify attestation chain statistics
    const chainStats = agent.getAttestationChainStats();
    expect(chainStats.totalEntries).toBe(3);
    expect(chainStats.isIntegrityValid).toBe(true);
    expect(chainStats.merkleRoot).toBeDefined();
    expect(chainStats.actionTypes).toHaveProperty('verification');
    expect(chainStats.actionTypes).toHaveProperty('decision');
    expect(chainStats.actionTypes).toHaveProperty('commitment');
    expect(chainStats.laws).toHaveProperty('law1');
    expect(chainStats.laws).toHaveProperty('law3');
    expect(chainStats.laws).toHaveProperty('law5');
  });

  test('should handle trust graph operations', async () => {
    const agent1 = await CHPFactory.create(constitutionalLaws, 'trust-test-1');

    // Check initial trust graph stats
    const initialStats = agent1.getTrustGraphStats();
    expect(initialStats.nodeCount).toBeGreaterThan(0);

    // Get reputation metrics
    const reputation = agent1.getReputationMetrics();
    expect(reputation).toHaveProperty('overall');
    expect(reputation).toHaveProperty('constitutional');
    expect(reputation).toHaveProperty('reliability');
    expect(reputation).toHaveProperty('cooperation');
    expect(reputation).toHaveProperty('transparency');
    expect(reputation.overall).toBeGreaterThanOrEqual(0);
    expect(reputation.overall).toBeLessThanOrEqual(1);
  });

  test('should handle protocol capabilities and versioning', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'capability-test');

    // Test protocol version
    const version = agent.getVersion();
    expect(version).toBe('1.0.0');

    // Test capabilities
    const capabilities = agent.getCapabilities();
    expect(capabilities).toContain('constitutional_identity');
    expect(capabilities).toContain('behavioral_attestation');
    expect(capabilities).toContain('trust_graph');
    expect(capabilities).toContain('handshake_sequence');

    // Test capability checking
    expect(agent.hasCapability('constitutional_identity')).toBe(true);
    expect(agent.hasCapability('behavioral_attestation')).toBe(true);
    expect(agent.hasCapability('trust_graph')).toBe(true);
    expect(agent.hasCapability('handshake_sequence')).toBe(true);
    expect(agent.hasCapability('nonexistent_capability')).toBe(false);
  });

  test('should maintain constitutional compliance throughout operations', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'compliance-test');

    // Initial compliance check
    let compliance = agent.getComplianceStatus();
    expect(compliance.isCompliant).toBe(true);
    expect(compliance.laws).toHaveLength(5);
    expect(compliance.laws).toEqual(['law1', 'law2', 'law3', 'law4', 'law5']);

    // Record an action and check compliance again
    const action: ConstitutionalAction = {
      id: 'compliance-test-action',
      type: 'verification',
      relatedLaw: 'law2',
      description: 'Testing compliance maintenance',
      justification: 'Verifying ongoing compliance with constitutional laws',
      timestamp: Date.now(),
      hash: 'compliance-test-hash',
      signature: 'compliance-test-signature'
    };

    await agent.recordAction(action);

    // Verify compliance is maintained
    compliance = agent.getComplianceStatus();
    expect(compliance.isCompliant).toBe(true);
    expect(compliance.laws).toHaveLength(5);

    // Verify the agent remains constitutional
    expect(agent.isConstitutional()).toBe(true);
  });

  test('should handle handshake statistics', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'handshake-stats-test');

    // Get handshake statistics
    const stats = agent.getHandshakeStats();
    expect(stats).toHaveProperty('activeSessions');
    expect(stats).toHaveProperty('completedHandshakes');
    expect(stats).toHaveProperty('failedHandshakes');
    expect(stats).toHaveProperty('averageConfidence');
    expect(stats).toHaveProperty('averageTrustLevel');

    expect(typeof stats.activeSessions).toBe('number');
    expect(typeof stats.completedHandshakes).toBe('number');
    expect(typeof stats.failedHandshakes).toBe('number');
    expect(typeof stats.averageConfidence).toBe('number');
    expect(typeof stats.averageTrustLevel).toBe('number');
  });

  test('should export and validate agent data', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'export-test');

    // Record a test action first
    const action: ConstitutionalAction = {
      id: 'export-test-action',
      type: 'decision',
      relatedLaw: 'law5',
      description: 'Testing data export functionality',
      justification: 'Data export decision made within Law 5 exploration bounds',
      timestamp: Date.now(),
      hash: 'export-test-hash',
      signature: 'export-test-signature'
    };

    await agent.recordAction(action);

    // Export agent data
    const exportedData = agent.exportAgentData();

    // Validate exported data structure
    expect(exportedData).toHaveProperty('agentId');
    expect(exportedData).toHaveProperty('constitutionalIdentity');
    expect(exportedData).toHaveProperty('attestationChain');
    expect(exportedData).toHaveProperty('trustGraphStats');
    expect(exportedData).toHaveProperty('handshakeStats');

    expect(exportedData.agentId).toBe('export-test');
    expect(exportedData.constitutionalIdentity).toHaveProperty('id');
    expect(exportedData.attestationChain).toHaveProperty('entries');
    expect(exportedData.attestationChain.entries).toHaveLength(1);
    expect(exportedData.trustGraphStats).toHaveProperty('nodeCount');
    expect(exportedData.handshakeStats).toHaveProperty('activeSessions');
  });
});
