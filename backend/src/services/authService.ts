import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { randomBytes, createHash } from 'crypto';
import { ConflictError } from '../errors/apiErrors';
import userRepository, { FullUser, User } from '../repositories/userRepository';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

const hashToken = (token: string): string => {
    return createHash('sha256').update(token).digest('hex');
};

const createTokens = async (user: FullUser) => {
    const accessToken = await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET);

    const refreshToken = randomBytes(40).toString('hex');
    const refreshTokenHash = hashToken(refreshToken);
    await userRepository.updateRefreshTokenHash(user.id, refreshTokenHash);

    const { password_hash, refresh_token_hash, ...userToReturn } = user;

    return { accessToken, refreshToken, user: userToReturn as User };
};

const register = async (userData: any): Promise<{ user: User, accessToken: string, refreshToken: string }> => {
    const { username, email, password } = userData;

    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
        throw new ConflictError('User with this email already exists');
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
        throw new ConflictError('This username is already taken.');
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
    if (!incomingRefreshToken) {
        throw new Error('Session not found. Please log in.')
    }

    const hashedToken = hashToken(incomingRefreshToken);
    const user = await userRepository.findByRefreshTokenHash(hashedToken);

    if (!user) {
        throw new Error('Invalid refresh token');
    };

    const accessToken = await new SignJWT({ id: user.id, email: user.email, role: user.role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(JWT_SECRET);

    const { password_hash, refresh_token_hash, ...userToReturn } = user;

    return { accessToken, user: userToReturn as User };
};

const logout = async (incomingRefreshToken: string | undefined) => {
    if (!incomingRefreshToken) {
        return;
    }
    const hashedToken = hashToken(incomingRefreshToken);
    const user = await userRepository.findByRefreshTokenHash(hashedToken);

    if (user) {
        await userRepository.updateRefreshTokenHash(user.id, null);
    }
};

export default {
    register,
    login,
    refreshToken,
    logout
};