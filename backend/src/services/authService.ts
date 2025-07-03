import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository, { User } from '../repositories/userRepository';

const register = async (userData: any): Promise<{user: User, token: string}> => {
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

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return { user: newUser, token };
};

const login = async (loginData: any): Promise<{ user: User, token: string}> => {
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