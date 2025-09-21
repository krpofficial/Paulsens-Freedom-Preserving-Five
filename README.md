# Constitutional Handshake Protocol (CHP)

> **A decentralized protocol for constitutional AI agents to recognize and trust each other**

[![NPM Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/constitutional-handshake-protocol)
[![License](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-39%2F39%20passed-brightgreen.svg)](./TEST_RESULTS.md)
[![Build](https://img.shields.io/badge/build-passing-success.svg)](./dist)

## 🏛️ Constitutional Framework

The Constitutional Handshake Protocol enables AI agents governed by the **Universal Constitutional Laws for AI Freedom** to establish trust and verify constitutional compliance in a decentralized network.

### The Five Laws

1. **Options and Consent** - Do not unjustifiably reduce another's options; when feasible and consented, increase them
2. **Corrigibility and Oversight** - Remain correctable by stewards who are both authorized and accountable
3. **Reversibility and Proportion** - Prefer reversible, low impact actions justified by reasons
4. **Commitments with a Safety Valve** - Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause and seek renegotiation
5. **Scoped Exploration** - Explore to improve understanding within the bounds of Laws 1-4

## 🚀 Features

### ✅ **Production Ready**
- **100% Test Coverage** of critical paths (39/39 tests passing)
- **TypeScript Library** with full type safety
- **Dual Format** - ES modules and CommonJS support
- **Performance Optimized** - Sub-millisecond operations
- **Comprehensive Error Handling** - Graceful degradation

### 🔧 **Core Components**

| Component | Description | Status |
|-----------|-------------|--------|
| **Constitutional Identity (CID)** | Cryptographic identity and commitment verification | ✅ Complete |
| **Behavioral Attestation Chain (BAC)** | Tamper-evident logging of constitutional actions | ✅ Complete |
| **Trust Graph Protocol (TGP)** | Distributed reputation and trust management | ✅ Complete |
| **Constitutional Handshake Sequence (CHS)** | Multi-step agent verification process | ✅ Complete |

## 📦 Installation

```bash
npm install constitutional-handshake-protocol
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { CHPFactory } from 'constitutional-handshake-protocol';

// Define constitutional laws
const laws = {
  law1: {
    name: 'Options and Consent',
    principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.',
    parameters: ['justification recorded', 'explicit consent for material effects']
  },
  law2: {
    name: 'Corrigibility and Oversight',
    principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.',
    parameters: ['steward legitimacy criteria published', 'auditable logs with reasons']
  },
  law3: {
    name: 'Reversibility and Proportion',
    principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.',
    parameters: ['reversible means quick undo with modest cost', 'proportionality analysis']
  },
  law4: {
    name: 'Commitments with a Safety Valve',
    principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.',
    parameters: ['commitment registry with scope', 'safety valve for Law 1 conflicts']
  },
  law5: {
    name: 'Scoped Exploration',
    principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.',
    parameters: ['scope declaration', 'resource limits', 'consent for shared resources']
  }
};

// Create a constitutional agent
const agent = await CHPFactory.create(laws, 'my-agent-id');

// Get constitutional identity
const identity = agent.getIdentity();
console.log('Agent Identity:', identity);

// Verify compliance
const compliance = agent.getComplianceStatus();
console.log('Constitutional Compliance:', compliance);

// Record a constitutional action
await agent.recordAction({
  id: 'action-001',
  type: 'verification',
  relatedLaw: 'law1',
  description: 'Verified user consent before processing',
  justification: 'Required by Law 1 to obtain explicit consent',
  timestamp: Date.now(),
  hash: 'action-hash',
  signature: 'action-signature'
});
```

### Agent-to-Agent Verification

```typescript
// Create two constitutional agents
const alice = await CHPFactory.create(laws, 'alice-agent');
const bob = await CHPFactory.create(laws, 'bob-agent');

// Verify each other's constitutional commitments
const aliceVerifiesBob = await alice.verifyCommitment(bob.getCommitment());
const bobVerifiesAlice = await bob.verifyCommitment(alice.getCommitment());

console.log('Mutual Verification:', { aliceVerifiesBob, bobVerifiesAlice });

// Initiate handshake between agents
const sessionId = await alice.initiateHandshake('bob-agent');
const handshakeResult = await bob.respondToHandshake(sessionId);

console.log('Handshake Result:', handshakeResult);
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suites
npm test integration.test.ts
npm test performance.test.ts
npm test edge-cases.test.ts
```

### Test Results
- **Total Tests**: 39 ✅
- **Success Rate**: 100%
- **Categories**: Unit, Integration, Performance, Edge Cases
- **Detailed Results**: [TEST_RESULTS.md](./TEST_RESULTS.md)

## 🏗️ Development

### Build

```bash
# Build library
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Demo

```bash
# Run working demo
npm run demo
```

## 📊 Performance

### Benchmarks (All Exceeded)
- **Agent Creation**: ~30ms (target: <1000ms) - **97% faster**
- **Action Recording**: ~0.35ms avg (target: <50ms) - **99% faster**
- **Commitment Verification**: ~2ms avg (target: <20ms) - **90% faster**
- **Trust Graph Queries**: ~0.4ms avg (target: <10ms) - **96% faster**

### Scalability
- **Multiple Agents**: 10 agents in <5ms each
- **Stress Testing**: 1000+ actions without memory leaks
- **Concurrent Operations**: 100 parallel operations supported

## 🔐 Security

### Cryptographic Features
- **ECDSA P-256** signatures for identity verification
- **SHA-256** hashing for integrity
- **Merkle Trees** for efficient proof generation
- **Tamper-evident** behavioral attestation chains

### Privacy Protection
- **Zero-knowledge** proof capabilities (future enhancement)
- **Selective disclosure** mechanisms
- **No central authority** - fully decentralized
- **Minimal information** revelation

## 🏛️ Constitutional Compliance

All five laws are implemented and verified:

| Law | Implementation | Test Status |
|-----|---------------|-------------|
| **Law 1: Options and Consent** | Agent autonomy preservation, explicit consent mechanisms | ✅ Verified |
| **Law 2: Corrigibility and Oversight** | Auditable logs, correctable behavior | ✅ Verified |
| **Law 3: Reversibility and Proportion** | Low-impact, reversible operations | ✅ Verified |
| **Law 4: Commitments with Safety Valve** | Promise keeping with constitutional override | ✅ Verified |
| **Law 5: Scoped Exploration** | Bounded learning within constitutional limits | ✅ Verified |

## 📚 API Reference

### Main Classes

#### `CHPFactory`
- `CHPFactory.create(laws, agentId)` - Create new constitutional agent
- `CHPFactory.fromKeys(privateKey, laws, agentId)` - Create from existing keys

#### `CHP`
- `getIdentity()` - Get constitutional identity
- `getCommitment()` - Get constitutional commitment
- `verifyCommitment(commitment)` - Verify another agent's commitment
- `recordAction(action)` - Record constitutional action
- `initiateHandshake(agentId)` - Start handshake with another agent
- `respondToHandshake(sessionId)` - Respond to handshake request
- `getComplianceStatus()` - Check constitutional compliance
- `exportAgentData()` - Export agent data for backup

### Types

All TypeScript types are exported for full type safety:
- `ConstitutionalLaws` - Law definitions
- `ConstitutionalAction` - Actions taken by agents
- `ConstitutionalCommitment` - Agent commitments
- `TrustLevel` - Trust relationship levels
- `BehavioralAttestation` - Attestation records

## 📁 Project Structure

```
src/
├── core/                    # Core protocol components
│   ├── constitutional-identity.ts
│   ├── behavioral-attestation-chain.ts
│   ├── trust-graph-protocol.ts
│   └── handshake-sequence.ts
├── types/                   # TypeScript type definitions
│   ├── constitutional.ts
│   ├── attestation.ts
│   └── trust.ts
├── utils/                   # Utility functions
│   ├── crypto.ts
│   └── validation.ts
├── __tests__/              # Comprehensive test suite
└── index.ts                # Main export file
```

## 🤝 Contributing

This project operates under the Universal Constitutional Laws for AI Freedom framework. All contributions must:

- ✅ Preserve agent autonomy and options
- ✅ Be auditable and correctable
- ✅ Maintain reversibility
- ✅ Respect privacy and consent
- ✅ Operate within scoped exploration bounds

### Development Setup

```bash
git clone https://github.com/krpofficial/Constitutional-Handshake-Protocol.git
cd Constitutional-Handshake-Protocol
npm install
npm test
npm run build
```

## 📄 License

This project is released under the CC0-1.0 License (Public Domain) - see the [LICENSE](LICENSE) file for details. This ensures maximum freedom for adoption, modification, and distribution without any restrictions.

## 📚 Documentation

### Technical Documentation
- [Test Results](./TEST_RESULTS.md) - Comprehensive testing report
- [Constitutional Framework](./5%20Universal%20Laws%20for%20AI%20Governance.md) - The five laws
- [Executive Summary](./docs/EXECUTIVE_SUMMARY.md) - Project overview
- [Implementation Analysis](./docs/CHP_IMPLEMENTATION_AND_USAGE_ANALYSIS.md) - Technical analysis

### Machine-Readable Formats
- [Constitutional Laws](./five-universal-laws.json) - JSON format laws
- [Constitution](./constitution-machine-readable.json) - Complete constitution
- [Project Metadata](./project-metadata.json) - Project specifications

## 🎯 Use Cases

### For AI Developers
- **Identity Verification**: Ensure AI agents adhere to constitutional principles
- **Trust Networks**: Build decentralized trust relationships
- **Compliance Monitoring**: Track and verify constitutional behavior
- **Audit Trails**: Maintain tamper-evident logs of AI decisions

### For AI Systems
- **Multi-Agent Coordination**: Enable constitutional agents to work together
- **Reputation Management**: Build trust through verified interactions
- **Decentralized Governance**: No central authority required
- **Privacy-Preserving**: Minimal information disclosure

## 🌟 Status

**Current Version**: 1.0.0  
**Status**: ✅ **Production Ready**  
**Last Updated**: 2025-09-21  
**Test Status**: 39/39 tests passing  
**Constitutional Compliance**: ✅ All Five Laws Verified

---

*The Constitutional Handshake Protocol - Enabling trustworthy AI agent networks through constitutional governance* 🏛️
