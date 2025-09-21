/**
 * Constitutional Handshake Protocol (CHP)
 * 
 * A decentralized protocol for constitutional AI agents to recognize and trust each other
 * Based on the Paulsens-Freedom-Preserving-Five framework
 */

// Core components (implemented)
export * from './core/constitutional-identity';
export * from './core/behavioral-attestation-chain';
export * from './core/trust-graph-protocol';
export * from './core/handshake-sequence';

// Types (implemented)
export * from './types/constitutional';
export * from './types/attestation';
export * from './types/trust';

// Utilities (implemented)
export * from './utils/crypto';
export * from './utils/validation';

// Main CHP class for easy integration
export { CHP, CHPFactory } from './chp';
