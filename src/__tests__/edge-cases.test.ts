/**
 * Edge Cases and Error Handling Tests for Constitutional Handshake Protocol
 * 
 * Tests error conditions, edge cases, and boundary conditions
 */

import { CHPFactory } from '../chp';
import { ConstitutionalLaws } from '../types/constitutional';

describe('CHP Edge Cases and Error Handling', () => {
  const validLaws: ConstitutionalLaws = {
    law1: {
      name: 'Options and Consent',
      principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
      parameters: ['justification recorded']
    },
    law2: {
      name: 'Corrigibility and Oversight',
      principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
      parameters: ['steward legitimacy']
    },
    law3: {
      name: 'Reversibility and Proportion',
      principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
      parameters: ['reversible means']
    },
    law4: {
      name: 'Commitments with a Safety Valve',
      principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
      parameters: ['commitment registry']
    },
    law5: {
      name: 'Scoped Exploration',
      principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
      parameters: ['scope declaration']
    }
  };

  test('should handle empty agent IDs gracefully', async () => {
    await expect(CHPFactory.create(validLaws, '')).resolves.toBeDefined();
    const agent = await CHPFactory.create(validLaws, '');
    expect(agent.isConstitutional()).toBe(true);
  });

  test('should handle very long agent IDs', async () => {
    const longId = 'a'.repeat(1000);
    const agent = await CHPFactory.create(validLaws, longId);
    expect(agent.isConstitutional()).toBe(true);
  });

  test('should handle special characters in agent IDs', async () => {
    const specialId = 'agent-123!@#$%^&*()_+{}[]|\\:";\'<>?,./';
    const agent = await CHPFactory.create(validLaws, specialId);
    expect(agent.isConstitutional()).toBe(true);
  });

  test('should handle duplicate agent IDs', async () => {
    const agentId = 'duplicate-test-agent';
    const agent1 = await CHPFactory.create(validLaws, agentId);
    const agent2 = await CHPFactory.create(validLaws, agentId);
    
    expect(agent1.isConstitutional()).toBe(true);
    expect(agent2.isConstitutional()).toBe(true);
    
    // Should have different commitments even with same agent ID (due to different timestamps/keys)
    const commitment1 = agent1.getCommitment();
    const commitment2 = agent2.getCommitment();
    expect(commitment1.id).not.toBe(commitment2.id);
  });

  test('should handle invalid constitutional laws gracefully', async () => {
    const invalidLaws = {} as ConstitutionalLaws;
    
    // Should still create agent but may have different behavior
    await expect(CHPFactory.create(invalidLaws, 'invalid-laws-test')).resolves.toBeDefined();
  });

  test('should handle missing law properties', async () => {
    const incompleteLaws = {
      law1: {
        name: 'Incomplete Law',
        principle: 'This law is missing parameters',
        parameters: []
      },
      law2: validLaws.law2,
      law3: validLaws.law3,
      law4: validLaws.law4,
      law5: validLaws.law5
    };
    
    const agent = await CHPFactory.create(incompleteLaws as ConstitutionalLaws, 'incomplete-laws-test');
    expect(agent.isConstitutional()).toBe(true);
  });

  test('should handle null and undefined commitments in verification', async () => {
    const agent = await CHPFactory.create(validLaws, 'null-test-agent');
    
    // Test with null commitment (should handle gracefully)
    await expect(agent.verifyCommitment(null as any)).resolves.toBe(false);
    
    // Test with undefined commitment
    await expect(agent.verifyCommitment(undefined as any)).resolves.toBe(false);
  });

  test('should handle malformed commitments', async () => {
    const agent = await CHPFactory.create(validLaws, 'malformed-test-agent');
    
    const malformedCommitment = {
      id: 'malformed-id',
      // Missing required fields
    } as any;
    
    const result = await agent.verifyCommitment(malformedCommitment);
    expect(result).toBe(false);
  });

  test('should handle very old commitments', async () => {
    const agent = await CHPFactory.create(validLaws, 'old-commitment-test');
    
    const oldCommitment = {
      id: 'old-commitment',
      lawsHash: 'old-hash',
      timestamp: Date.now() - (2 * 365 * 24 * 60 * 60 * 1000), // 2 years ago
      signature: 'old-signature',
      publicKey: 'old-public-key'
    };
    
    const result = await agent.verifyCommitment(oldCommitment);
    expect(typeof result).toBe('boolean'); // Should handle gracefully
  });

  test('should handle large numbers of capabilities queries', async () => {
    const agent = await CHPFactory.create(validLaws, 'capabilities-stress-test');
    
    // Query capabilities many times rapidly
    const queries = Array.from({ length: 1000 }, () => agent.getCapabilities());
    const results = await Promise.all(queries);
    
    expect(results).toHaveLength(1000);
    results.forEach(capabilities => {
      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities.length).toBeGreaterThan(0);
    });
  });

  test('should handle concurrent operations', async () => {
    const agent = await CHPFactory.create(validLaws, 'concurrent-test-agent');
    
    // Perform multiple operations concurrently
    const operations = [
      agent.getIdentity(),
      agent.getCommitment(),
      agent.getComplianceStatus(),
      agent.getCapabilities(),
      agent.getVersion(),
      agent.isConstitutional(),
      agent.getTrustGraphStats(),
      agent.getReputationMetrics(),
      agent.getHandshakeStats(),
      agent.exportAgentData()
    ];
    
    const results = await Promise.all(operations);
    expect(results).toHaveLength(10);
    
    // All operations should complete successfully
    expect(results[0]).toBeDefined(); // identity
    expect(results[1]).toBeDefined(); // commitment
    expect(results[2]).toBeDefined(); // compliance
    expect(results[3]).toBeDefined(); // capabilities
    expect(results[4]).toBe('1.0.0'); // version
    expect(results[5]).toBe(true); // constitutional
    expect(results[6]).toBeDefined(); // trust stats
    expect(results[7]).toBeDefined(); // reputation
    expect(results[8]).toBeDefined(); // handshake stats
    expect(results[9]).toBeDefined(); // exported data
  });

  test('should handle capability checks with invalid inputs', async () => {
    const agent = await CHPFactory.create(validLaws, 'invalid-capability-test');
    
    // Test with various invalid inputs
    expect(agent.hasCapability('')).toBe(false);
    expect(agent.hasCapability('invalid-capability')).toBe(false);
    expect(agent.hasCapability('CONSTITUTIONAL_IDENTITY')).toBe(false); // Wrong case
    expect(agent.hasCapability('constitutional-identity')).toBe(false); // Wrong format
    expect(agent.hasCapability(null as any)).toBe(false);
    expect(agent.hasCapability(undefined as any)).toBe(false);
    expect(agent.hasCapability(123 as any)).toBe(false);
  });

  test('should handle trust relationship queries with invalid agent IDs', async () => {
    const agent = await CHPFactory.create(validLaws, 'trust-query-test');
    
    // Test with various invalid agent IDs
    const result1 = agent.getTrustRelationship('');
    const result2 = agent.getTrustRelationship('nonexistent-agent');
    const result3 = agent.getTrustRelationship(null as any);
    const result4 = agent.getTrustRelationship(undefined as any);
    
    // Should handle gracefully (return null or empty result)
    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
    expect(result4).toBeNull();
  });

  test('should handle handshake operations with invalid session IDs', async () => {
    const agent = await CHPFactory.create(validLaws, 'handshake-invalid-test');
    
    // Test responding to invalid handshake sessions
    const result1 = await agent.respondToHandshake('');
    const result2 = await agent.respondToHandshake('nonexistent-session');
    const result3 = await agent.respondToHandshake(null as any);
    const result4 = await agent.respondToHandshake(undefined as any);
    
    // Should handle gracefully
    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
    expect(result4).toBeNull();
  });

  test('should maintain consistency under stress', async () => {
    const agent = await CHPFactory.create(validLaws, 'stress-test-agent');
    
    // Perform many operations rapidly
    const stressOperations = Array.from({ length: 100 }, async (_, i) => {
      const compliance = agent.getComplianceStatus();
      const identity = agent.getIdentity();
      const constitutional = agent.isConstitutional();
      
      return { compliance, identity, constitutional, index: i };
    });
    
    const results = await Promise.all(stressOperations);
    
    expect(results).toHaveLength(100);
    
    // All results should be consistent
    const firstIdentity = results[0].identity;
    results.forEach((result, i) => {
      expect(result.identity).toBe(firstIdentity); // Identity should be consistent
      expect(result.constitutional).toBe(true); // Should remain constitutional
      expect(result.compliance.isCompliant).toBe(true); // Should remain compliant
      expect(result.index).toBe(i); // Verify order
    });
  });

  test('should handle cleanup operations', async () => {
    const agent = await CHPFactory.create(validLaws, 'cleanup-test-agent');
    
    // Test cleanup operations
    expect(() => agent.cleanupExpiredSessions()).not.toThrow();
    
    const activeSessions = agent.getActiveHandshakeSessions();
    expect(Array.isArray(activeSessions)).toBe(true);
    
    // Should handle multiple cleanup calls
    agent.cleanupExpiredSessions();
    agent.cleanupExpiredSessions();
    agent.cleanupExpiredSessions();
    
    // Agent should still function normally
    expect(agent.isConstitutional()).toBe(true);
  });
});
