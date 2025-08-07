import bcrypt from 'bcryptjs';
import userRepository from '../repositories/userRepository';
import { ConflictError } from '../errors/apiErrors';

const changePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new Error('User not found');
    };

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) {
        throw new ConflictError('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(userId, newPasswordHash);
};

export default {
    changePassword
};