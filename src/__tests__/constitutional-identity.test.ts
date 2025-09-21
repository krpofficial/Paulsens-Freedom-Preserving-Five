/**
 * Tests for Constitutional Identity
 */

import { ConstitutionalIdentity, ConstitutionalIdentityFactory } from '../core/constitutional-identity';
import { ConstitutionalLaws } from '../types/constitutional';

describe('ConstitutionalIdentity', () => {
  let laws: ConstitutionalLaws;
  let identity: ConstitutionalIdentity;

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

  test('should create constitutional identity', async () => {
    identity = await ConstitutionalIdentityFactory.create(laws);
    
    expect(identity).toBeDefined();
    expect(identity.getIdentity()).toBeDefined();
    expect(identity.getCommitment()).toBeDefined();
  });

  test('should generate unique identity hash', async () => {
    identity = await ConstitutionalIdentityFactory.create(laws);
    
    const hash1 = identity.generateIdentityHash();
    const hash2 = identity.generateIdentityHash();
    
    expect(hash1).toBe(hash2); // Same identity should generate same hash
  });

  test('should match identity correctly', async () => {
    identity = await ConstitutionalIdentityFactory.create(laws);
    
    const identityString = identity.getIdentity();
    
    expect(identity.matches(identityString)).toBe(true);
    expect(identity.matches('different-identity')).toBe(false);
  });

  test('should provide commitment metadata', async () => {
    identity = await ConstitutionalIdentityFactory.create(laws);
    
    const metadata = identity.getMetadata();
    
    expect(metadata.id).toBeDefined();
    expect(metadata.lawsHash).toBeDefined();
    expect(metadata.timestamp).toBeDefined();
    expect(metadata.publicKey).toBeDefined();
  });
});

