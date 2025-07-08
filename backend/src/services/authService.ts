import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import userRepository, { FullUser, User } from '../repositories/userRepository';

const hashToken = (token: string): string => {
    return createHash('sha256').update(token).digest('hex');
};

const createTokens = async (user: FullUser) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    const refreshToken = randomBytes(40).toString('hex');
    const refreshTokenHash = hashToken(refreshToken);
    await userRepository.updateRefreshTokenHash(user.id, refreshTokenHash);

    const { password_hash, refresh_token_hash, ...userToReturn } = user;

    return { accessToken, refreshToken, user: userToReturn as User };
};

const register = async (userData: any): Promise<{ user: User, accessToken: string, refreshToken: string }> => {
    const { username, email, password } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
        username,
        email,
        password_hash
    });
    
    return createTokens(newUser);
};

const login = async (loginData: any): Promise<{user: User, accessToken: string, refreshToken: string}> => {
    const { email, password } = loginData;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    
    return createTokens(user);
};

const refreshToken = async (incomingRefreshToken: string) => {
    const hashedToken = hashToken(incomingRefreshToken);

    const user = await userRepository.findByRefreshTokenHash(hashedToken);

    if (!user) {
        throw new Error('Invalid refresh token');
    };

    const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    const { password_hash, refresh_token_hash, ...userToReturn } = user;

    return { accessToken, user: userToReturn as User };
};

const logout = async (userId: string) => {
    await userRepository.updateRefreshTokenHash(userId, null);
};

export default {
    register,
    login,
    refreshToken,
    logout
};