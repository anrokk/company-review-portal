import statsRepository from "../repositories/statsRepository";

const getStats = async () => {
    return statsRepository.getPlatformStats();
};

export default {
    getStats
};