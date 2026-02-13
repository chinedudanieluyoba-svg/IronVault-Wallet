#!/usr/bin/env node

/**
 * JWT Secret Generator
 * 
 * Generates a cryptographically secure random string suitable for JWT signing.
 * 
 * Usage:
 *   node scripts/generate-jwt-secret.js
 *   npm run generate:jwt-secret
 * 
 * The generated secret is:
 * - 128 characters long (64 bytes in hexadecimal)
 * - Cryptographically secure (uses crypto.randomBytes)
 * - Suitable for production use
 * - Compatible with HS256, HS384, and HS512 algorithms
 */

const crypto = require('crypto');

function generateJWTSecret() {
  // Generate 64 random bytes and convert to hexadecimal
  // This produces a 128-character string (each byte = 2 hex characters)
  const secret = crypto.randomBytes(64).toString('hex');
  return secret;
}

function main() {
  console.log('🔐 JWT Secret Generator');
  console.log('━'.repeat(80));
  console.log('');
  
  const secret = generateJWTSecret();
  
  console.log('Your new JWT secret:');
  console.log('');
  console.log(secret);
  console.log('');
  console.log('━'.repeat(80));
  console.log('');
  console.log('📋 Next Steps:');
  console.log('');
  console.log('1. Copy the secret above');
  console.log('2. Add it to your .env file:');
  console.log('   JWT_SECRET=' + secret);
  console.log('');
  console.log('3. Update the rotation date:');
  console.log('   JWT_SECRET_ROTATION_DATE=' + new Date().toISOString().split('T')[0]);
  console.log('');
  console.log('4. Never commit the .env file to version control');
  console.log('');
  console.log('⚠️  Security Notes:');
  console.log('   • Keep this secret secure and private');
  console.log('   • Rotate every 90 days in production');
  console.log('   • Use different secrets for dev/staging/production');
  console.log('   • Store in environment variables or secret manager');
  console.log('');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateJWTSecret };
