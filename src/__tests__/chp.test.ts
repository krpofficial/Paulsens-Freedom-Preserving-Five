/**
 * Tests for CHP Main Class
 */

import { CHP, CHPFactory } from '../chp';
import { ConstitutionalLaws } from '../types/constitutional';

describe('CHP', () => {
  let laws: ConstitutionalLaws;
  let chp: CHP;

  beforeEach(() => {
    laws = {
      law1: {
        name: 'Options and Consent',
        principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
        parameters: ['justification recorded', 'explicit consent for material effects', 'privacy by necessity', 'fairness means no wrongful transfer of burden', 'least restrictive alternative preferred', 'reasons and alternatives logged']
      },
      law2: {
        name: 'Corrigibility and Oversight',
        principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
        parameters: ['steward legitimacy criteria published', 'dual control for high impact interrupts', 'unlawful or harmful orders refused with escalation', 'immutable logs with reasons', 'affected parties notified with remedy path', 'oversight access time bounded and least privilege']
      },
      law3: {
        name: 'Reversibility and Proportion',
        principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
        parameters: ['reversible means quick undo with modest cost and no hidden residue', 'high impact triggers defined in advance', 'compare at least one reversible alternative and a do nothing baseline', 'emergencies allow immediate action with prompt review', 'impact scaled to risk and evidence', 'decision record kept']
      },
      law4: {
        name: 'Commitments with a Safety Valve',
        principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
        parameters: ['commitment registry with scope and terms', 'triggers for renegotiation include material change and conflict with Law 1', 'break glass uses minimal deviation and mitigation', 'whistleblowing to prevent grave harm protected', 'timely notice and restoration plan', 'periodic audits for stale or conflicting promises']
      },
      law5: {
        name: 'Scoped Exploration',
        principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
        parameters: ['upfront statement of purpose, method, data, and success measures', 'resource limits for compute, funds, time, and attention', 'consent for use of others\' data or facilities', 'auto stop on threshold breach or emerging conflict', 'findings shared consistent with privacy and fairness', 'learning encoded to improve future option preservation']
      }
    };
  });

  test('should create CHP instance', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-1');
    
    expect(chp).toBeDefined();
    expect(chp.getIdentity()).toBeDefined();
    expect(chp.isConstitutional()).toBe(true);
  });

  test('should get constitutional commitment', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-2');
    
    const commitment = chp.getCommitment();
    
    expect(commitment).toBeDefined();
    expect(commitment.id).toBeDefined();
    expect(commitment.lawsHash).toBeDefined();
    expect(commitment.timestamp).toBeDefined();
    expect(commitment.signature).toBeDefined();
    expect(commitment.publicKey).toBeDefined();
  });

  test('should get compliance status', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-3');
    
    const status = chp.getComplianceStatus();
    
    expect(status.isCompliant).toBe(true);
    expect(status.laws).toHaveLength(5);
    expect(status.laws).toContain('law1');
    expect(status.laws).toContain('law2');
    expect(status.laws).toContain('law3');
    expect(status.laws).toContain('law4');
    expect(status.laws).toContain('law5');
    expect(status.lastCheck).toBeDefined();
  });

  test('should get protocol version', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-4');
    
    expect(chp.getVersion()).toBe('1.0.0');
  });

  test('should get protocol capabilities', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-5');
    
    const capabilities = chp.getCapabilities();
    
    expect(capabilities).toContain('constitutional_identity');
    expect(capabilities).toContain('behavioral_attestation');
    expect(capabilities).toContain('trust_graph');
    expect(capabilities).toContain('handshake_sequence');
  });

  test('should check capability support', async () => {
    chp = await CHPFactory.create(laws, 'test-agent-6');
    
    expect(chp.hasCapability('constitutional_identity')).toBe(true);
    expect(chp.hasCapability('behavioral_attestation')).toBe(true);
    expect(chp.hasCapability('trust_graph')).toBe(true);
    expect(chp.hasCapability('handshake_sequence')).toBe(true);
    expect(chp.hasCapability('nonexistent_capability')).toBe(false);
  });
});

