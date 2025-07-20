import { PlatformStats } from "@/types/api";

interface StatsProps {
    stats: PlatformStats;
}

const Stats = ({stats}: StatsProps) => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-5xl font-bold text-white">{stats.companies}</p>
                        <p className="mt-2 text-lg text-gray-400">Companies Reviewed</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-white">{stats.reviews}</p>
                        <p className="mt-2 text-lg text-gray-400">Experiences Shared</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold text-white">{stats.users}</p>
                        <p className="mt-2 text-lg text-gray-400">Community Members</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;