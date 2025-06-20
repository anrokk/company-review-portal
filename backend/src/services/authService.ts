import bcrypt from 'bcryptjs';
import userRepository, { User } from '../repositories/userRepository';

const register = async (userData: any): Promise<User> => {
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

    return newUser;
};

export default {
    register
};