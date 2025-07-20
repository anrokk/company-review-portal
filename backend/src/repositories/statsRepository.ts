import db from "../config/db";

const getPlatformStats = async () => {
    const [companyCount, reviewCount, userCount] = await Promise.all([
        db.query('SELECT COUNT(*) FROM companies WHERE is_approved = TRUE'),
        db.query('SELECT COUNT(*) FROM reviews'),
        db.query('SELECT COUNT(*) FROM users')
    ]);

    return {
        companies: parseInt(companyCount.rows[0].count, 10),
        reviews: parseInt(reviewCount.rows[0].count, 10),
        users: parseInt(userCount.rows[0].count, 10)
    };
};

export default {
    getPlatformStats
};