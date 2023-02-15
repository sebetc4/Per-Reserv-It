import crypto from 'crypto'

export const generateRandomBytes = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

export const hashData = (data: crypto.BinaryLike) => crypto.createHash('sha256').update(data).digest('hex')