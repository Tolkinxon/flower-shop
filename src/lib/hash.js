import bcrypt from 'bcrypt';

export const hashService = {
    createHash: async (password) => await bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => await bcrypt.compare(password, hashPassword)
}