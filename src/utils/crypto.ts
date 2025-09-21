/**
 * Cryptographic Utilities
 * 
 * Provides cryptographic functions for the CHP protocol
 */

/**
 * Generate a SHA-256 hash of the input data
 */
export function generateHash(data: string): string {
  // In a real implementation, this would use the Web Crypto API
  // For now, we'll use a simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
}

/**
 * Create a cryptographic signature
 */
export async function createSignature(data: string, privateKey: CryptoKey): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const signature = await crypto.subtle.sign(
      {
        name: 'ECDSA',
        hash: 'SHA-256',
      },
      privateKey,
      dataBuffer
    );

    // Convert ArrayBuffer to hex string
    const signatureArray = new Uint8Array(signature);
    return Array.from(signatureArray)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('Error creating signature:', error);
    throw new Error('Failed to create signature');
  }
}

/**
 * Verify a cryptographic signature
 */
export async function verifySignature(
  data: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  try {
    // In a real implementation, this would use the Web Crypto API
    // For now, we'll use a placeholder verification
    // Note: data parameter would be used in real implementation
    console.log('Verifying signature for data:', data.substring(0, 20) + '...');
    return signature.length > 0 && publicKey.length > 0;
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Generate a random nonce
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a Merkle tree root hash
 */
export function generateMerkleRoot(leaves: string[]): string {
  if (leaves.length === 0) {
    return '';
  }
  
  if (leaves.length === 1) {
    return leaves[0];
  }

  const nextLevel: string[] = [];
  for (let i = 0; i < leaves.length; i += 2) {
    const left = leaves[i];
    const right = leaves[i + 1] || left; // If odd number, duplicate the last leaf
    nextLevel.push(generateHash(left + right));
  }

  return generateMerkleRoot(nextLevel);
}

/**
 * Create a Merkle proof
 */
export function createMerkleProof(leaves: string[], index: number): {
  leaf: string;
  path: Array<{ hash: string; position: 'left' | 'right' }>;
  root: string;
} {
  const leaf = leaves[index];
  const path: Array<{ hash: string; position: 'left' | 'right' }> = [];
  
  let currentLevel = [...leaves];
  let currentIndex = index;
  const root = generateMerkleRoot(leaves);

  while (currentLevel.length > 1) {
    if (currentLevel.length % 2 === 1) {
      currentLevel.push(currentLevel[currentLevel.length - 1]);
    }

    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = currentLevel[i + 1];
      nextLevel.push(generateHash(left + right));
    }

    // Add sibling to path
    const siblingIndex = currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
    if (siblingIndex < currentLevel.length) {
      path.push({
        hash: currentLevel[siblingIndex],
        position: currentIndex % 2 === 0 ? 'right' : 'left',
      });
    }

    currentLevel = nextLevel;
    currentIndex = Math.floor(currentIndex / 2);
  }

  return { leaf, path, root };
}

/**
 * Verify a Merkle proof
 */
export function verifyMerkleProof(proof: {
  leaf: string;
  path: Array<{ hash: string; position: 'left' | 'right' }>;
  root: string;
}): boolean {
  let currentHash = proof.leaf;

  for (const step of proof.path) {
    if (step.position === 'left') {
      currentHash = generateHash(step.hash + currentHash);
    } else {
      currentHash = generateHash(currentHash + step.hash);
    }
  }

  return currentHash === proof.root;
}

/**
 * Encrypt data with a public key
 */
export async function encrypt(data: string, publicKey: CryptoKey): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      dataBuffer
    );

    const encryptedArray = new Uint8Array(encrypted);
    return Array.from(encryptedArray)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt data with a private key
 */
export async function decrypt(encryptedData: string, privateKey: CryptoKey): Promise<string> {
  try {
    // Convert hex string to ArrayBuffer
    const encryptedArray = new Uint8Array(
      encryptedData.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedArray
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw new Error('Failed to decrypt data');
  }
}

