/**
 * Validation Utilities
 * 
 * Provides validation functions for CHP protocol data
 */

import { ConstitutionalCommitment } from '../types/constitutional';
import { BehavioralAttestation, AttestationVerification } from '../types/attestation';
import { TrustRelationship, TrustNode } from '../types/trust';

/**
 * Validate constitutional commitment
 */
export function validateConstitutionalCommitment(commitment: ConstitutionalCommitment): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!commitment.id || typeof commitment.id !== 'string') {
    errors.push('Invalid commitment ID');
  }

  if (!commitment.lawsHash || typeof commitment.lawsHash !== 'string') {
    errors.push('Invalid laws hash');
  }

  if (!commitment.timestamp || typeof commitment.timestamp !== 'number') {
    errors.push('Invalid timestamp');
  }

  if (!commitment.signature || typeof commitment.signature !== 'string') {
    errors.push('Invalid signature');
  }

  if (!commitment.publicKey || typeof commitment.publicKey !== 'string') {
    errors.push('Invalid public key');
  }

  // Validate timestamp is not in the future
  if (commitment.timestamp > Date.now()) {
    errors.push('Timestamp cannot be in the future');
  }

  // Validate timestamp is not too old (e.g., more than 1 year)
  const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
  if (commitment.timestamp < oneYearAgo) {
    errors.push('Commitment timestamp is too old');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate behavioral attestation
 */
export function validateBehavioralAttestation(attestation: BehavioralAttestation): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!attestation.id || typeof attestation.id !== 'string') {
    errors.push('Invalid attestation ID');
  }

  if (!attestation.agentId || typeof attestation.agentId !== 'string') {
    errors.push('Invalid agent ID');
  }

  if (!attestation.actionId || typeof attestation.actionId !== 'string') {
    errors.push('Invalid action ID');
  }

  if (!attestation.type || typeof attestation.type !== 'string') {
    errors.push('Invalid attestation type');
  }

  if (!attestation.proof || typeof attestation.proof !== 'string') {
    errors.push('Invalid proof');
  }

  if (!attestation.timestamp || typeof attestation.timestamp !== 'number') {
    errors.push('Invalid timestamp');
  }

  // Validate attestation type
  const validTypes = ['proof_of_work', 'zero_knowledge', 'merkle_proof', 'signature'];
  if (!validTypes.includes(attestation.type)) {
    errors.push('Invalid attestation type');
  }

  // Validate timestamp is not in the future
  if (attestation.timestamp > Date.now()) {
    errors.push('Timestamp cannot be in the future');
  }

  // Validate expiration if provided
  if (attestation.expiresAt && attestation.expiresAt <= attestation.timestamp) {
    errors.push('Expiration time must be after creation time');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate trust relationship
 */
export function validateTrustRelationship(relationship: TrustRelationship): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!relationship.agentA || typeof relationship.agentA !== 'string') {
    errors.push('Invalid agent A ID');
  }

  if (!relationship.agentB || typeof relationship.agentB !== 'string') {
    errors.push('Invalid agent B ID');
  }

  if (relationship.agentA === relationship.agentB) {
    errors.push('Agent A and B cannot be the same');
  }

  if (typeof relationship.trustAB !== 'number' || relationship.trustAB < 0 || relationship.trustAB > 4) {
    errors.push('Invalid trust level from A to B');
  }

  if (typeof relationship.trustBA !== 'number' || relationship.trustBA < 0 || relationship.trustBA > 4) {
    errors.push('Invalid trust level from B to A');
  }

  if (typeof relationship.confidence !== 'number' || relationship.confidence < 0 || relationship.confidence > 1) {
    errors.push('Invalid confidence level');
  }

  if (!relationship.establishedAt || typeof relationship.establishedAt !== 'number') {
    errors.push('Invalid established timestamp');
  }

  if (!relationship.updatedAt || typeof relationship.updatedAt !== 'number') {
    errors.push('Invalid updated timestamp');
  }

  if (relationship.updatedAt < relationship.establishedAt) {
    errors.push('Updated timestamp cannot be before established timestamp');
  }

  if (!Array.isArray(relationship.evidence)) {
    errors.push('Evidence must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate trust node
 */
export function validateTrustNode(node: TrustNode): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!node.id || typeof node.id !== 'string') {
    errors.push('Invalid node ID');
  }

  if (!node.constitutionalId || typeof node.constitutionalId !== 'string') {
    errors.push('Invalid constitutional ID');
  }

  if (typeof node.trustScore !== 'number' || node.trustScore < 0 || node.trustScore > 1) {
    errors.push('Invalid trust score');
  }

  if (typeof node.interactionCount !== 'number' || node.interactionCount < 0) {
    errors.push('Invalid interaction count');
  }

  if (!node.lastActivity || typeof node.lastActivity !== 'number') {
    errors.push('Invalid last activity timestamp');
  }

  if (!Array.isArray(node.connections)) {
    errors.push('Connections must be an array');
  }

  if (!node.reputation) {
    errors.push('Missing reputation metrics');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate attestation verification result
 */
export function validateAttestationVerification(verification: AttestationVerification): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof verification.isValid !== 'boolean') {
    errors.push('Invalid isValid flag');
  }

  if (typeof verification.confidence !== 'number' || verification.confidence < 0 || verification.confidence > 1) {
    errors.push('Invalid confidence level');
  }

  if (!verification.method || typeof verification.method !== 'string') {
    errors.push('Invalid verification method');
  }

  if (!verification.timestamp || typeof verification.timestamp !== 'number') {
    errors.push('Invalid timestamp');
  }

  if (!Array.isArray(verification.errors)) {
    errors.push('Errors must be an array');
  }

  if (!Array.isArray(verification.warnings)) {
    errors.push('Warnings must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate string format (basic checks)
 */
export function validateStringFormat(value: string, fieldName: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof value !== 'string') {
    errors.push(`${fieldName} must be a string`);
    return { isValid: false, errors };
  }

  if (value.length === 0) {
    errors.push(`${fieldName} cannot be empty`);
  }

  if (value.length > 1000) {
    errors.push(`${fieldName} is too long`);
  }

  // Check for valid characters (alphanumeric, hyphens, underscores)
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    errors.push(`${fieldName} contains invalid characters`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate timestamp
 */
export function validateTimestamp(timestamp: number, fieldName: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof timestamp !== 'number') {
    errors.push(`${fieldName} must be a number`);
    return { isValid: false, errors };
  }

  if (timestamp <= 0) {
    errors.push(`${fieldName} must be positive`);
  }

  if (timestamp > Date.now()) {
    errors.push(`${fieldName} cannot be in the future`);
  }

  // Check if timestamp is too old (more than 10 years)
  const tenYearsAgo = Date.now() - (10 * 365 * 24 * 60 * 60 * 1000);
  if (timestamp < tenYearsAgo) {
    errors.push(`${fieldName} is too old`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

