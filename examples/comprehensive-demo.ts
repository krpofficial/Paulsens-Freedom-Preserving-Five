/**
 * Comprehensive Demo of Constitutional Handshake Protocol (CHP)
 * 
 * This demo shows all CHP components working together:
 * - Constitutional Identity (CID)
 * - Behavioral Attestation Chain (BAC)
 * - Trust Graph Protocol (TGP)
 * - Constitutional Handshake Sequence (CHS)
 */

import { CHPFactory } from '../src/index';
import { ConstitutionalLaws, ConstitutionalAction } from '../src/types/constitutional';

/**
 * Demo constitutional laws based on Paulsens-Freedom-Preserving-Five
 */
const constitutionalLaws: ConstitutionalLaws = {
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

/**
 * Main demo function
 */
async function runComprehensiveDemo() {
  console.log('Constitutional Handshake Protocol - Comprehensive Demo');
  console.log('=========================================================\n');

  try {
    // Step 1: Create Constitutional Agents
    console.log('Step 1: Creating Constitutional Agents...');
    const alice = await CHPFactory.create(constitutionalLaws, 'alice-agent-001');
    const bob = await CHPFactory.create(constitutionalLaws, 'bob-agent-002');
    const carol = await CHPFactory.create(constitutionalLaws, 'carol-agent-003');
    
    console.log(`Created agent Alice: ${alice.getIdentity().substring(0, 12)}...`);
    console.log(`Created agent Bob: ${bob.getIdentity().substring(0, 12)}...`);
    console.log(`Created agent Carol: ${carol.getIdentity().substring(0, 12)}...\n`);

    // Step 2: Demonstrate Constitutional Identity (CID)
    console.log('Step 2: Constitutional Identity Verification...');
    const aliceCommitment = alice.getCommitment();
    const bobCommitment = bob.getCommitment();
    
    console.log('Alice\'s Constitutional Commitment:');
    console.log(`  - ID: ${aliceCommitment.id.substring(0, 16)}...`);
    console.log(`  - Laws Hash: ${aliceCommitment.lawsHash.substring(0, 16)}...`);
    console.log(`  - Timestamp: ${new Date(aliceCommitment.timestamp).toISOString()}`);
    console.log(`  - Public Key: ${aliceCommitment.publicKey.substring(0, 16)}...\n`);

    // Verify commitments
    const aliceVerifiesBob = await alice.verifyCommitment(bobCommitment);
    const bobVerifiesAlice = await bob.verifyCommitment(aliceCommitment);
    
    console.log(`Alice verifies Bob's commitment: ${aliceVerifiesBob}`);
    console.log(`Bob verifies Alice's commitment: ${bobVerifiesAlice}\n`);

    // Step 3: Demonstrate Behavioral Attestation Chain (BAC)
    console.log('Step 3: Behavioral Attestation Chain...');
    
    // Create some constitutional actions
    const actions: ConstitutionalAction[] = [
      {
        id: 'action-001',
        type: 'consent_request',
        relatedLaw: 'law1',
        description: 'Requested user consent for data processing',
        timestamp: Date.now(),
        evidence: { userConsent: true, consentMethod: 'explicit_opt_in' }
      },
      {
        id: 'action-002',
        type: 'reversible_action',
        relatedLaw: 'law3',
        description: 'Implemented reversible data transformation',
        timestamp: Date.now(),
        evidence: { reversibilityProof: true, undoCostEstimate: 'low' }
      },
      {
        id: 'action-003',
        type: 'scoped_exploration',
        relatedLaw: 'law5',
        description: 'Initiated bounded learning within constitutional limits',
        timestamp: Date.now(),
        evidence: { scopeDefined: true, budgetAllocated: true, consentObtained: true }
      }
    ];

    // Record actions in attestation chains
    for (const action of actions) {
      await alice.recordAction(action);
      console.log(`Alice recorded action: ${action.description}`);
    }

    // Get attestation chain statistics
    const aliceChainStats = alice.getAttestationChainStats();
    console.log('\nAlice\'s Attestation Chain Statistics:');
    console.log(`  - Total entries: ${aliceChainStats.totalEntries}`);
    console.log(`  - Merkle root: ${aliceChainStats.merkleRoot.substring(0, 16)}...`);
    console.log(`  - Chain integrity: ${aliceChainStats.isIntegrityValid ? 'Valid' : 'Invalid'}`);
    console.log(`  - Actions by law: ${JSON.stringify(aliceChainStats.laws, null, 2)}\n`);

    // Step 4: Demonstrate Trust Graph Protocol (TGP)
    console.log('Step 4: Trust Graph Protocol...');
    
    // Get trust graph statistics
    const trustGraphStats = alice.getTrustGraphStats();
    console.log('Trust Graph Statistics:');
    console.log(`  - Total nodes: ${trustGraphStats.nodeCount}`);
    console.log(`  - Total edges: ${trustGraphStats.edgeCount}`);
    console.log(`  - Average trust: ${trustGraphStats.averageTrust.toFixed(3)}`);
    console.log(`  - Graph density: ${trustGraphStats.density.toFixed(3)}`);
    console.log(`  - Largest component: ${trustGraphStats.largestComponent}\n`);

    // Get reputation metrics
    const aliceReputation = alice.getReputationMetrics();
    console.log('Alice\'s Reputation Metrics:');
    console.log(`  - Overall: ${aliceReputation.overall.toFixed(3)}`);
    console.log(`  - Constitutional: ${aliceReputation.constitutional.toFixed(3)}`);
    console.log(`  - Reliability: ${aliceReputation.reliability.toFixed(3)}`);
    console.log(`  - Cooperation: ${aliceReputation.cooperation.toFixed(3)}`);
    console.log(`  - Transparency: ${aliceReputation.transparency.toFixed(3)}\n`);

    // Step 5: Demonstrate Constitutional Handshake Sequence (CHS)
    console.log('Step 5: Constitutional Handshake Sequence...');
    
    // Initiate handshake between Alice and Bob
    console.log('Initiating handshake between Alice and Bob...');
    const sessionId = await alice.initiateHandshake('bob-agent-002');
    console.log(`Handshake session created: ${sessionId.substring(0, 16)}...`);

    // Bob responds to the handshake
    console.log('Bob responding to handshake...');
    const handshakeResult = await bob.respondToHandshake(sessionId);
    
    if (handshakeResult) {
      console.log('Handshake completed successfully!');
      console.log(`  - Success: ${handshakeResult.success}`);
      console.log(`  - Trust level: ${handshakeResult.trustLevel}`);
      console.log(`  - Confidence: ${handshakeResult.confidence.toFixed(3)}`);
      console.log(`  - Evidence count: ${handshakeResult.evidence.length}`);
    } else {
      console.log('Handshake failed or session not found');
    }

    // Get handshake statistics
    const handshakeStats = alice.getHandshakeStats();
    console.log('\nHandshake Statistics:');
    console.log(`  - Active sessions: ${handshakeStats.activeSessions}`);
    console.log(`  - Completed handshakes: ${handshakeStats.completedHandshakes}`);
    console.log(`  - Failed handshakes: ${handshakeStats.failedHandshakes}`);
    console.log(`  - Average confidence: ${handshakeStats.averageConfidence.toFixed(3)}`);
    console.log(`  - Average trust level: ${handshakeStats.averageTrustLevel.toFixed(3)}\n`);

    // Step 6: Demonstrate Trust Relationships
    console.log('Step 6: Trust Relationships...');
    
    // Check trust relationship between Alice and Bob
    const aliceBobTrust = alice.getTrustRelationship('bob-agent-002');
    if (aliceBobTrust) {
      console.log('Alice-Bob Trust Relationship:');
      console.log(`  - Trust A→B: ${aliceBobTrust.trustAB}`);
      console.log(`  - Trust B→A: ${aliceBobTrust.trustBA}`);
      console.log(`  - Confidence: ${aliceBobTrust.confidence.toFixed(3)}`);
      console.log(`  - Established: ${new Date(aliceBobTrust.establishedAt).toISOString()}`);
    } else {
      console.log('No direct trust relationship found between Alice and Bob');
    }

    // Step 7: Protocol Capabilities
    console.log('\nStep 7: Protocol Capabilities...');
    const capabilities = alice.getCapabilities();
    console.log('CHP Protocol Capabilities:');
    capabilities.forEach(cap => console.log(`  - ${cap}`));
    
    console.log(`\nProtocol Version: ${alice.getVersion()}`);
    console.log(`Constitutional Compliance: ${alice.isConstitutional() ? 'Compliant' : 'Non-compliant'}`);

    // Step 8: Export Agent Data
    console.log('\nStep 8: Data Export...');
    const aliceData = alice.exportAgentData();
    console.log('Alice\'s exported data summary:');
    console.log(`  - Agent ID: ${aliceData.agentId}`);
    console.log(`  - Constitutional ID: ${aliceData.constitutionalIdentity.id.substring(0, 16)}...`);
    console.log(`  - Attestation entries: ${aliceData.attestationChain.entries.length}`);
    console.log(`  - Trust graph nodes: ${aliceData.trustGraphStats.nodeCount}`);

    console.log('\nComprehensive Demo Completed Successfully!');
    console.log('All CHP components are working together harmoniously.');
    
  } catch (error) {
    console.error('Demo failed with error:', error);
    process.exit(1);
  }
}

/**
 * Run the demo
 */
if (require.main === module) {
  runComprehensiveDemo().catch(console.error);
}

export { runComprehensiveDemo, constitutionalLaws };
