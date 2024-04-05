import * as bcryptjs from 'bcryptjs';
import crypto from 'crypto';


const saltRounds = 10; // Adjust as needed for security and performance balance

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(saltRounds);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};

const TOKEN_SECRET = process.env.TOKEN_SECRET; // Retrieve a secret key from an environment variable

export const generateSessionToken = async (
  userId: number
): Promise<string> => {
  const buffer = crypto.randomBytes(32); // Generate 32 random bytes
  const token = buffer.toString('hex'); // Convert bytes to a hexadecimal string

  if (!TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET environment variable is not set');
  }
  
  // Sign the token with the secret key for additional security
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(userId + '-' + token)
    .digest('hex');

  return `${userId}-${token}-${signature}`; // Combine components for the final token
}