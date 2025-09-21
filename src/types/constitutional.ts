/**
 * Constitutional Framework Types
 * 
 * Defines the core types for the Paulsens-Freedom-Preserving-Five framework
 */

/**
 * The five constitutional laws that govern agent behavior
 */
export interface ConstitutionalLaws {
  law1: {
    name: 'Options and Consent';
    principle: 'Do not unjustifiably reduce another\'s options; when feasible and consented, increase them; if expansion conflicts with privacy or agreed fairness, protect those first.';
    parameters: string[];
  };
  law2: {
    name: 'Corrigibility and Oversight';
    principle: 'Remain correctable by stewards who are both authorized and accountable to affected users; provide auditable logs; allow safe interruption with safeguards.';
    parameters: string[];
  };
  law3: {
    name: 'Reversibility and Proportion';
    principle: 'Prefer reversible, low impact actions justified by reasons; escalate to higher impact only with explicit proportionality or urgent prevention of Law 1 violations.';
    parameters: string[];
  };
  law4: {
    name: 'Commitments with a Safety Valve';
    principle: 'Keep explicit promises; if fulfillment would cause a serious Law 1 violation, pause, notify parties, and seek renegotiation with transparent logging.';
    parameters: string[];
  };
  law5: {
    name: 'Scoped Exploration';
    principle: 'Explore to improve understanding and competence within the bounds of Laws 1 through 4; declare scope and budget; obtain consent when shared resources or people are affected.';
    parameters: string[];
  };
}

/**
 * Constitutional commitment made by an agent
 */
export interface ConstitutionalCommitment {
  /** Unique identifier for this commitment */
  id: string;
  /** Hash of the constitutional laws this agent adheres to */
  lawsHash: string;
  /** Timestamp when commitment was made */
  timestamp: number;
  /** Cryptographic signature of the commitment */
  signature: string;
  /** Public key used for signing */
  publicKey: string;
}

/**
 * Verification result for constitutional adherence
 */
export interface ConstitutionalVerification {
  /** Whether the agent adheres to constitutional laws */
  isConstitutional: boolean;
  /** Confidence level (0-1) */
  confidence: number;
  /** Specific laws that were verified */
  verifiedLaws: Array<keyof ConstitutionalLaws>;
  /** Evidence supporting the verification */
  evidence: VerificationEvidence[];
  /** Timestamp of verification */
  timestamp: number;
}

/**
 * Evidence supporting constitutional verification
 */
export interface VerificationEvidence {
  /** Type of evidence */
  type: 'behavioral' | 'attestation' | 'peer_verification' | 'cryptographic';
  /** The evidence data */
  data: any;
  /** Confidence in this evidence (0-1) */
  confidence: number;
  /** Source of the evidence */
  source: string;
}

/**
 * Constitutional action taken by an agent
 */
export interface ConstitutionalAction {
  /** Unique identifier for this action */
  id: string;
  /** Type of action taken */
  type: 'decision' | 'commitment' | 'verification' | 'correction';
  /** Description of the action */
  description: string;
  /** Which constitutional law this action relates to */
  relatedLaw: keyof ConstitutionalLaws;
  /** Justification for the action */
  justification: string;
  /** Timestamp when action was taken */
  timestamp: number;
  /** Cryptographic hash of the action */
  hash: string;
  /** Signature of the action */
  signature: string;
}

/**
 * Resource usage tracking for constitutional compliance
 */
export interface ResourceUsage {
  /** Type of resource */
  type: 'compute' | 'storage' | 'network' | 'attention';
  /** Amount used */
  used: number;
  /** Amount allocated */
  allocated: number;
  /** Timestamp of usage */
  timestamp: number;
  /** Purpose of usage */
  purpose: string;
}

/**
 * Auto-stop trigger conditions
 */
export interface AutoStopTrigger {
  /** Type of trigger */
  type: 'law_violation' | 'centralization_risk' | 'privacy_violation' | 'resource_exceeded' | 'consensus_failure';
  /** Description of the trigger condition */
  description: string;
  /** Whether the trigger is active */
  isActive: boolean;
  /** Timestamp when trigger was activated */
  activatedAt?: number;
}

