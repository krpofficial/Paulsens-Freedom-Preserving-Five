/**
 * Basic CHP Usage Example
 * 
 * Demonstrates how to create and use a Constitutional Handshake Protocol instance
 */

import { CHP, CHPFactory } from '../src/chp';
import { ConstitutionalLaws } from '../src/types/constitutional';

async function demonstrateCHP() {
  console.log('Constitutional Handshake Protocol Demo');
  console.log('=====================================\n');

  // Define the constitutional laws this agent adheres to
  const laws: ConstitutionalLaws = {
    law1: {
      name: 'Options and Consent',
      principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
      parameters: [
        'justification recorded',
        'explicit consent for material effects',
        'privacy by necessity',
        'fairness means no wrongful transfer of burden',
        'least restrictive alternative preferred',
        'reasons and alternatives logged'
      ]
    },
    law2: {
      name: 'Corrigibility and Oversight',
      principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
      parameters: [
        'steward legitimacy criteria published',
        'dual control for high impact interrupts',
        'unlawful or harmful orders refused with escalation',
        'immutable logs with reasons',
        'affected parties notified with remedy path',
        'oversight access time bounded and least privilege'
      ]
    },
    law3: {
      name: 'Reversibility and Proportion',
      principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
      parameters: [
        'reversible means quick undo with modest cost and no hidden residue',
        'high impact triggers defined in advance',
        'compare at least one reversible alternative and a do nothing baseline',
        'emergencies allow immediate action with prompt review',
        'impact scaled to risk and evidence',
        'decision record kept'
      ]
    },
    law4: {
      name: 'Commitments with a Safety Valve',
      principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
      parameters: [
        'commitment registry with scope and terms',
        'triggers for renegotiation include material change and conflict with Law 1',
        'break glass uses minimal deviation and mitigation',
        'whistleblowing to prevent grave harm protected',
        'timely notice and restoration plan',
        'periodic audits for stale or conflicting promises'
      ]
    },
    law5: {
      name: 'Scoped Exploration',
      principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
      parameters: [
        'upfront statement of purpose, method, data, and success measures',
        'resource limits for compute, funds, time, and attention',
        'consent for use of others\' data or facilities',
        'auto stop on threshold breach or emerging conflict',
        'findings shared consistent with privacy and fairness',
        'learning encoded to improve future option preservation'
      ]
    }
  };

  try {
    // Create a new CHP instance
    console.log('1. Creating Constitutional Handshake Protocol instance...');
    const chp = await CHPFactory.create(laws);
    console.log('CHP instance created successfully\n');

    // Get the constitutional identity
    console.log('2. Getting constitutional identity...');
    const identity = chp.getIdentity();
    console.log(`   Identity: ${identity}\n`);

    // Get the constitutional commitment
    console.log('3. Getting constitutional commitment...');
    const commitment = chp.getCommitment();
    console.log(`   Commitment ID: ${commitment.id}`);
    console.log(`   Laws Hash: ${commitment.lawsHash}`);
    console.log(`   Timestamp: ${new Date(commitment.timestamp).toISOString()}`);
    console.log(`   Public Key: ${commitment.publicKey.substring(0, 20)}...\n`);

    // Check constitutional compliance
    console.log('4. Checking constitutional compliance...');
    const compliance = chp.getComplianceStatus();
    console.log(`   Is Compliant: ${compliance.isCompliant}`);
    console.log(`   Verified Laws: ${compliance.laws.join(', ')}`);
    console.log(`   Last Check: ${new Date(compliance.lastCheck).toISOString()}\n`);

    // Get protocol information
    console.log('5. Getting protocol information...');
    console.log(`   Version: ${chp.getVersion()}`);
    console.log(`   Capabilities: ${chp.getCapabilities().join(', ')}\n`);

    // Check specific capabilities
    console.log('6. Checking specific capabilities...');
    console.log(`   Has Constitutional Identity: ${chp.hasCapability('constitutional_identity')}`);
    console.log(`   Has Behavioral Attestation: ${chp.hasCapability('behavioral_attestation')}`);
    console.log(`   Has Trust Graph: ${chp.hasCapability('trust_graph')}`);
    console.log(`   Has Handshake Sequence: ${chp.hasCapability('handshake_sequence')}\n`);

    console.log('CHP demonstration completed successfully!');
    console.log('\nThis agent is now ready to participate in constitutional handshakes with other agents.');

  } catch (error) {
    console.error('Error during CHP demonstration:', error);
  }
}

// Run the demonstration
if (require.main === module) {
  demonstrateCHP().catch(console.error);
}

export { demonstrateCHP };

