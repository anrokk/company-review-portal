import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import userRepository, { FullUser, User } from '../repositories/userRepository';


const createTokens = async (user: FullUser) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    const refreshToken = randomBytes(40).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await userRepository.updateRefreshTokenHash(user.id, refreshTokenHash);

    const { password_hash, refresh_token_hash, ...userToReturn } = user;

    return { accessToken, refreshToken, user: userToReturn as User };
};

const register = async (userData: any): Promise<{ user: User, accessToken: string }> => {
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

const login = async (loginData: any): Promise<{ user: User, token: string }> => {
    const { email, password } = loginData;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const payloadToSign = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(
        payloadToSign,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    const userToReturn: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    };

    return { user: userToReturn as User, token };
};

export default {
    register,
    login
};