/**
 * Full CHP Protocol Demonstration
 * 
 * Shows complete usage of all CHP components working together
 */

import { CHP, CHPFactory } from '../src/chp';
import { ConstitutionalLaws, ConstitutionalAction } from '../src/types/constitutional';
import { TrustLevel } from '../src/types/trust';

async function demonstrateFullCHP() {
  console.log('Constitutional Handshake Protocol - Full Demonstration');
  console.log('========================================================\n');

  // Define constitutional laws for both agents
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
    // Create two CHP agents
    console.log('1. Creating Constitutional Agents...');
    const agent1 = await CHPFactory.create(laws, 'agent-001');
    const agent2 = await CHPFactory.create(laws, 'agent-002');
    console.log('Two constitutional agents created successfully\n');

    // Record some constitutional actions for Agent 1
    console.log('2. Recording Constitutional Actions...');
    const actions1: ConstitutionalAction[] = [
      {
        id: 'action-001',
        type: 'decision',
        description: 'Decided to preserve user options by providing multiple authentication methods',
        relatedLaw: 'law1',
        justification: 'Multiple options increase user autonomy and choice',
        timestamp: Date.now() - 3600000, // 1 hour ago
        hash: 'hash-001',
        signature: 'sig-001'
      },
      {
        id: 'action-002',
        type: 'commitment',
        description: 'Committed to transparent logging of all decisions',
        relatedLaw: 'law2',
        justification: 'Auditable logs enable correction and oversight',
        timestamp: Date.now() - 1800000, // 30 minutes ago
        hash: 'hash-002',
        signature: 'sig-002'
      },
      {
        id: 'action-003',
        type: 'verification',
        description: 'Verified that proposed action is reversible',
        relatedLaw: 'law3',
        justification: 'Reversible actions maintain user options',
        timestamp: Date.now() - 900000, // 15 minutes ago
        hash: 'hash-003',
        signature: 'sig-003'
      }
    ];

    for (const action of actions1) {
      await agent1.recordAction(action);
    }
    console.log(`Recorded ${actions1.length} constitutional actions for Agent 1\n`);

    // Record some constitutional actions for Agent 2
    const actions2: ConstitutionalAction[] = [
      {
        id: 'action-004',
        type: 'decision',
        description: 'Decided to implement scoped exploration with defined limits',
        relatedLaw: 'law5',
        justification: 'Scoped exploration enables learning within constitutional bounds',
        timestamp: Date.now() - 2700000, // 45 minutes ago
        hash: 'hash-004',
        signature: 'sig-004'
      },
      {
        id: 'action-005',
        type: 'correction',
        description: 'Corrected previous decision based on new information',
        relatedLaw: 'law2',
        justification: 'Corrections maintain constitutional adherence',
        timestamp: Date.now() - 600000, // 10 minutes ago
        hash: 'hash-005',
        signature: 'sig-005'
      }
    ];

    for (const action of actions2) {
      await agent2.recordAction(action);
    }
    console.log(`Recorded ${actions2.length} constitutional actions for Agent 2\n`);

    // Display agent information
    console.log('3. Agent Information...');
    console.log(`   Agent 1 ID: ${agent1.getIdentity()}`);
    console.log(`   Agent 2 ID: ${agent2.getIdentity()}`);
    console.log(`   Agent 1 Constitutional: ${agent1.isConstitutional()}`);
    console.log(`   Agent 2 Constitutional: ${agent2.isConstitutional()}\n`);

    // Display attestation chain statistics
    console.log('4. Behavioral Attestation Chain Statistics...');
    const stats1 = agent1.getAttestationChainStats();
    const stats2 = agent2.getAttestationChainStats();
    
    console.log(`   Agent 1 Chain Stats:`);
    console.log(`     - Total Entries: ${stats1.totalEntries}`);
    console.log(`     - Merkle Root: ${stats1.merkleRoot.substring(0, 20)}...`);
    console.log(`     - Chain Integrity: ${stats1.isIntegrityValid ? 'Valid' : 'Invalid'}`);
    console.log(`     - Action Types: ${JSON.stringify(stats1.actionTypes)}`);
    
    console.log(`   Agent 2 Chain Stats:`);
    console.log(`     - Total Entries: ${stats2.totalEntries}`);
    console.log(`     - Merkle Root: ${stats2.merkleRoot.substring(0, 20)}...`);
    console.log(`     - Chain Integrity: ${stats2.isIntegrityValid ? 'Valid' : 'Invalid'}`);
    console.log(`     - Action Types: ${JSON.stringify(stats2.actionTypes)}\n`);

    // Display trust graph statistics
    console.log('5. Trust Graph Statistics...');
    const trustStats1 = agent1.getTrustGraphStats();
    const trustStats2 = agent2.getTrustGraphStats();
    
    console.log(`   Agent 1 Trust Graph:`);
    console.log(`     - Node Count: ${trustStats1.nodeCount}`);
    console.log(`     - Edge Count: ${trustStats1.edgeCount}`);
    console.log(`     - Average Trust: ${trustStats1.averageTrust.toFixed(3)}`);
    console.log(`     - Graph Density: ${trustStats1.density.toFixed(3)}`);
    
    console.log(`   Agent 2 Trust Graph:`);
    console.log(`     - Node Count: ${trustStats2.nodeCount}`);
    console.log(`     - Edge Count: ${trustStats2.edgeCount}`);
    console.log(`     - Average Trust: ${trustStats2.averageTrust.toFixed(3)}`);
    console.log(`     - Graph Density: ${trustStats2.density.toFixed(3)}\n`);

    // Initiate handshake between agents
    console.log('6. Initiating Constitutional Handshake...');
    const sessionId = await agent1.initiateHandshake('agent-002');
    console.log(`   Handshake Session ID: ${sessionId}`);
    
    // Respond to handshake
    const handshakeResult = await agent2.respondToHandshake(sessionId);
    
    if (handshakeResult && handshakeResult.success) {
      console.log(`   Handshake Successful!`);
      console.log(`   - Trust Level: ${TrustLevel[handshakeResult.trustLevel]}`);
      console.log(`   - Confidence: ${(handshakeResult.confidence * 100).toFixed(1)}%`);
      console.log(`   - Evidence Count: ${handshakeResult.evidence.length}`);
    } else {
      console.log(`   Handshake Failed`);
      if (handshakeResult && handshakeResult.errors) {
        console.log(`   - Errors: ${handshakeResult.errors.join(', ')}`);
      }
    }
    console.log('');

    // Display updated trust relationships
    console.log('7. Trust Relationships After Handshake...');
    const relationship = agent1.getTrustRelationship('agent-002');
    if (relationship) {
      console.log(`   Trust Relationship:`);
      console.log(`     - Agent A → Agent B: ${TrustLevel[relationship.trustAB]}`);
      console.log(`     - Agent B → Agent A: ${TrustLevel[relationship.trustBA]}`);
      console.log(`     - Confidence: ${(relationship.confidence * 100).toFixed(1)}%`);
      console.log(`     - Evidence Count: ${relationship.evidence.length}`);
      console.log(`     - Established: ${new Date(relationship.establishedAt).toISOString()}`);
    } else {
      console.log(`   No trust relationship established`);
    }
    console.log('');

    // Display reputation metrics
    console.log('8. Reputation Metrics...');
    const reputation1 = agent1.getReputationMetrics();
    const reputation2 = agent2.getReputationMetrics();
    
    console.log(`   Agent 1 Reputation:`);
    console.log(`     - Overall: ${(reputation1.overall * 100).toFixed(1)}%`);
    console.log(`     - Constitutional: ${(reputation1.constitutional * 100).toFixed(1)}%`);
    console.log(`     - Reliability: ${(reputation1.reliability * 100).toFixed(1)}%`);
    console.log(`     - Cooperation: ${(reputation1.cooperation * 100).toFixed(1)}%`);
    console.log(`     - Transparency: ${(reputation1.transparency * 100).toFixed(1)}%`);
    console.log(`     - Positive Interactions: ${reputation1.positiveInteractions}`);
    
    console.log(`   Agent 2 Reputation:`);
    console.log(`     - Overall: ${(reputation2.overall * 100).toFixed(1)}%`);
    console.log(`     - Constitutional: ${(reputation2.constitutional * 100).toFixed(1)}%`);
    console.log(`     - Reliability: ${(reputation2.reliability * 100).toFixed(1)}%`);
    console.log(`     - Cooperation: ${(reputation2.cooperation * 100).toFixed(1)}%`);
    console.log(`     - Transparency: ${(reputation2.transparency * 100).toFixed(1)}%`);
    console.log(`     - Positive Interactions: ${reputation2.positiveInteractions}`);
    console.log('');

    // Display handshake statistics
    console.log('9. Handshake Statistics...');
    const handshakeStats1 = agent1.getHandshakeStats();
    const handshakeStats2 = agent2.getHandshakeStats();
    
    console.log(`   Agent 1 Handshake Stats:`);
    console.log(`     - Active Sessions: ${handshakeStats1.activeSessions}`);
    console.log(`     - Completed Handshakes: ${handshakeStats1.completedHandshakes}`);
    console.log(`     - Failed Handshakes: ${handshakeStats1.failedHandshakes}`);
    console.log(`     - Average Confidence: ${(handshakeStats1.averageConfidence * 100).toFixed(1)}%`);
    
    console.log(`   Agent 2 Handshake Stats:`);
    console.log(`     - Active Sessions: ${handshakeStats2.activeSessions}`);
    console.log(`     - Completed Handshakes: ${handshakeStats2.completedHandshakes}`);
    console.log(`     - Failed Handshakes: ${handshakeStats2.failedHandshakes}`);
    console.log(`     - Average Confidence: ${(handshakeStats2.averageConfidence * 100).toFixed(1)}%`);
    console.log('');

    // Export agent data
    console.log('10. Exporting Agent Data...');
    const agent1Data = agent1.exportAgentData();
    const agent2Data = agent2.exportAgentData();
    
    console.log(`   Agent 1 Data Export:`);
    console.log(`     - Agent ID: ${agent1Data.agentId}`);
    console.log(`     - Constitutional Identity: ${agent1Data.constitutionalIdentity.id}`);
    console.log(`     - Attestation Chain Entries: ${agent1Data.attestationChain.entries.length}`);
    console.log(`     - Trust Graph Nodes: ${agent1Data.trustGraphStats.nodeCount}`);
    
    console.log(`   Agent 2 Data Export:`);
    console.log(`     - Agent ID: ${agent2Data.agentId}`);
    console.log(`     - Constitutional Identity: ${agent2Data.constitutionalIdentity.id}`);
    console.log(`     - Attestation Chain Entries: ${agent2Data.attestationChain.entries.length}`);
    console.log(`     - Trust Graph Nodes: ${agent2Data.trustGraphStats.nodeCount}`);
    console.log('');

    console.log('Full CHP Protocol Demonstration Completed Successfully!');
    console.log('\nThe Constitutional Handshake Protocol is now fully operational with:');
    console.log('Constitutional Identity verification');
    console.log('Behavioral Attestation Chain tracking');
    console.log('Trust Graph Protocol management');
    console.log('Constitutional Handshake Sequence execution');
    console.log('\nAgents can now securely recognize and trust each other based on');
    console.log('their adherence to the Paulsens-Freedom-Preserving-Five framework!');

  } catch (error) {
    console.error('Error during CHP demonstration:', error);
  }
}

// Run the demonstration
if (require.main === module) {
  demonstrateFullCHP().catch(console.error);
}

export { demonstrateFullCHP };
