/**
 * Jest setup file
 * 
 * Global test configuration and setup
 */

// Global test setup
beforeAll(() => {
  // Setup global test environment
  console.log('Setting up CHP test environment...');
});

afterAll(() => {
  // Cleanup after all tests
  console.log('Cleaning up CHP test environment...');
});

// Global test utilities
global.testUtils = {
  // Add any global test utilities here
};
