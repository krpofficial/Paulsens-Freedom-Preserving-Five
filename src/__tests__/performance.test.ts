/**
 * Performance Tests for Constitutional Handshake Protocol
 * 
 * Basic performance and memory usage tests
 */

import { CHPFactory } from '../chp';
import { ConstitutionalLaws, ConstitutionalAction } from '../types/constitutional';

describe('CHP Performance Tests', () => {
  const constitutionalLaws: ConstitutionalLaws = {
    law1: {
      name: 'Options and Consent',
      principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
      parameters: ['justification recorded', 'explicit consent']
    },
    law2: {
      name: 'Corrigibility and Oversight',
      principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
      parameters: ['steward legitimacy', 'auditable logs']
    },
    law3: {
      name: 'Reversibility and Proportion',
      principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
      parameters: ['reversible means', 'proportionality']
    },
    law4: {
      name: 'Commitments with a Safety Valve',
      principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
      parameters: ['commitment registry', 'safety valve']
    },
    law5: {
      name: 'Scoped Exploration',
      principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
      parameters: ['scope declaration', 'resource limits']
    }
  };

  test('should create agents within reasonable time', async () => {
    const startTime = performance.now();
    
    const agent = await CHPFactory.create(constitutionalLaws, 'perf-test-agent');
    
    const endTime = performance.now();
    const creationTime = endTime - startTime;
    
    expect(agent).toBeDefined();
    expect(creationTime).toBeLessThan(1000); // Should create within 1 second
  });

  test('should handle multiple agents efficiently', async () => {
    const startTime = performance.now();
    const agentCount = 10;
    
    const agents = await Promise.all(
      Array.from({ length: agentCount }, (_, i) => 
        CHPFactory.create(constitutionalLaws, `perf-multi-agent-${i}`)
      )
    );
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const avgTimePerAgent = totalTime / agentCount;
    
    expect(agents).toHaveLength(agentCount);
    expect(avgTimePerAgent).toBeLessThan(500); // Average < 500ms per agent
    expect(totalTime).toBeLessThan(5000); // Total < 5 seconds
  });

  test('should record actions efficiently', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'perf-action-agent');
    const actionCount = 100;
    
    const actions: ConstitutionalAction[] = Array.from({ length: actionCount }, (_, i) => ({
      id: `perf-action-${i}`,
      type: 'decision',
      relatedLaw: 'law1',
      description: `Performance test action ${i}`,
      justification: 'Performance testing',
      timestamp: Date.now(),
      hash: `perf-hash-${i}`,
      signature: `perf-signature-${i}`
    }));
    
    const startTime = performance.now();
    
    for (const action of actions) {
      await agent.recordAction(action);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const avgTimePerAction = totalTime / actionCount;
    
    expect(avgTimePerAction).toBeLessThan(50); // Average < 50ms per action
    
    // Verify all actions were recorded
    const chainStats = agent.getAttestationChainStats();
    expect(chainStats.totalEntries).toBe(actionCount);
    expect(chainStats.isIntegrityValid).toBe(true);
  });

  test('should handle commitment verification efficiently', async () => {
    const agent1 = await CHPFactory.create(constitutionalLaws, 'perf-verify-1');
    const agent2 = await CHPFactory.create(constitutionalLaws, 'perf-verify-2');
    
    const commitment = agent2.getCommitment();
    const verificationCount = 50;
    
    const startTime = performance.now();
    
    for (let i = 0; i < verificationCount; i++) {
      const isValid = await agent1.verifyCommitment(commitment);
      expect(isValid).toBe(true);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const avgTimePerVerification = totalTime / verificationCount;
    
    expect(avgTimePerVerification).toBeLessThan(20); // Average < 20ms per verification
  });

  test('should maintain performance with large trust graphs', async () => {
    const agentCount = 20;
    const agents = await Promise.all(
      Array.from({ length: agentCount }, (_, i) => 
        CHPFactory.create(constitutionalLaws, `perf-trust-agent-${i}`)
      )
    );
    
    const startTime = performance.now();
    
    // Get trust graph stats from each agent
    const allStats = agents.map(agent => agent.getTrustGraphStats());
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const avgTimePerQuery = totalTime / agentCount;
    
    expect(allStats).toHaveLength(agentCount);
    expect(avgTimePerQuery).toBeLessThan(10); // Average < 10ms per query
    
    // Verify all stats are valid
    allStats.forEach(stats => {
      expect(stats.nodeCount).toBeGreaterThan(0);
      expect(typeof stats.averageTrust).toBe('number');
      expect(typeof stats.density).toBe('number');
    });
  });

  test('should handle protocol operations within memory limits', async () => {
    const agent = await CHPFactory.create(constitutionalLaws, 'memory-test-agent');
    
    // Record many actions to test memory usage
    const actionCount = 1000;
    const actions: ConstitutionalAction[] = Array.from({ length: actionCount }, (_, i) => ({
      id: `memory-action-${i}`,
      type: 'verification',
      relatedLaw: 'law2',
      description: `Memory test action ${i}`,
      justification: 'Memory usage testing',
      timestamp: Date.now(),
      hash: `memory-hash-${i}`,
      signature: `memory-signature-${i}`
    }));
    
    // Record actions in batches to simulate real usage
    const batchSize = 50;
    for (let i = 0; i < actions.length; i += batchSize) {
      const batch = actions.slice(i, i + batchSize);
      await Promise.all(batch.map(action => agent.recordAction(action)));
    }
    
    // Verify the agent still functions correctly
    const chainStats = agent.getAttestationChainStats();
    expect(chainStats.totalEntries).toBe(actionCount);
    expect(chainStats.isIntegrityValid).toBe(true);
    
    const compliance = agent.getComplianceStatus();
    expect(compliance.isCompliant).toBe(true);
    
    const capabilities = agent.getCapabilities();
    expect(capabilities).toHaveLength(4);
  });
});
