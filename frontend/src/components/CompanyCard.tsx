import { Company } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
    company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
    return (
        <Link href={`/company/${company.id}`} className="block">
            <div className="p-6 h-full border border-neutral-800 rounded-xl 
            bg-neutral-950/50 hover:bg-neutral-900 transition-colors flex flex-col items-center justify-center text-center">
                {company.logo_url && (
                    <div className='relative h-16 w-16 mb-4'>
                        <Image
                            src={company.logo_url}
                            alt={`${company.name} logo`}
                            fill
                            className='object-contain'
                        />
                    </div>
                )}
                <h3 className='font-bold text-lg text-gray-300'>{company.name}</h3>
            </div>
        </Link>
    );
};

export default CompanyCard;