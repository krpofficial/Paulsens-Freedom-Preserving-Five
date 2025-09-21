/**
 * Simple Demo of Constitutional Handshake Protocol (CHP)
 * 
 * This demo shows the basic CHP functionality using the built library
 */

const { CHPFactory } = require('../dist/chp.cjs');

/**
 * Demo constitutional laws
 */
const constitutionalLaws = {
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
      'resource limits defined',
      'consent for shared resources'
    ]
  }
};

/**
 * Run the simple demo
 */
async function runSimpleDemo() {
  console.log('Constitutional Handshake Protocol - Simple Demo');
  console.log('===================================================\n');

  try {
    // Create two constitutional agents
    console.log('Creating constitutional agents...');
    const alice = await CHPFactory.create(constitutionalLaws, 'alice-001');
    const bob = await CHPFactory.create(constitutionalLaws, 'bob-002');
    
    console.log(`Alice created: ${alice.getIdentity().substring(0, 12)}...`);
    console.log(`Bob created: ${bob.getIdentity().substring(0, 12)}...\n`);

    // Show constitutional commitments
    console.log('Constitutional Commitments:');
    const aliceCommitment = alice.getCommitment();
    console.log(`Alice commitment ID: ${aliceCommitment.id.substring(0, 16)}...`);
    console.log(`Bob commitment ID: ${bob.getCommitment().id.substring(0, 16)}...\n`);

    // Verify commitments
    const aliceVerifiesBob = await alice.verifyCommitment(bob.getCommitment());
    console.log(`Alice verifies Bob's commitment: ${aliceVerifiesBob}`);
    
    const bobVerifiesAlice = await bob.verifyCommitment(aliceCommitment);
    console.log(`Bob verifies Alice's commitment: ${bobVerifiesAlice}\n`);

    // Record some constitutional actions
    console.log('Recording constitutional actions...');
    const action = {
      id: 'demo-action-001',
      type: 'consent_verification',
      relatedLaw: 'law1',
      description: 'Verified user consent before processing',
      timestamp: Date.now(),
      evidence: { consentMethod: 'explicit', userConfirmed: true }
    };

    await alice.recordAction(action);
    console.log(`Alice recorded action: ${action.description}\n`);

    // Show protocol capabilities
    console.log('Protocol Capabilities:');
    const capabilities = alice.getCapabilities();
    capabilities.forEach(cap => console.log(`  - ${cap}`));
    
    console.log(`\nProtocol Version: ${alice.getVersion()}`);
    console.log(`Constitutional Status: ${alice.isConstitutional() ? 'Compliant' : 'Non-compliant'}`);

    // Show compliance status
    const compliance = alice.getComplianceStatus();
    console.log('\nCompliance Status:');
    console.log(`  - Is Compliant: ${compliance.isCompliant}`);
    console.log(`  - Laws: ${compliance.laws.join(', ')}`);
    console.log(`  - Last Check: ${new Date(compliance.lastCheck).toISOString()}`);

    console.log('\nSimple Demo Completed Successfully!');
    
  } catch (error) {
    console.error('Demo failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the demo
if (require.main === module) {
  runSimpleDemo().catch(console.error);
}

module.exports = { runSimpleDemo };
