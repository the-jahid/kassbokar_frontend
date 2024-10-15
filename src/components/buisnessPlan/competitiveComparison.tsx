'use client';

import { useUpdateCompanyDescriptionMutation } from '@/lib/rtkqueryAPI/companyDescription';
import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';
import { useUpdateCompetitiveComparisonMutation } from '@/lib/rtkqueryAPI/competitiveComparison';

interface CompetitiveComparisonProps {
    competitiveComparison?: {
        id?: string;
        competitors?: string;
        competitiveAdvantage?: string;
        buisnessplanId?: string;
    };
}

const CompetitiveComparison: React.FC<CompetitiveComparisonProps> = ({ competitiveComparison = {} }) => {
    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateCompetitveComparison, { isLoading, isError, isSuccess }] = useUpdateCompetitiveComparisonMutation();

    const {
        id: competitiveComparisonId = '',
        competitors = '',
        competitiveAdvantage = '',
        buisnessplanId = ''
    } = competitiveComparison || {};

    return (
        <div key={competitiveComparisonId} className='space-y-5'>
            <Section title="Competitors" itemName='competitors' content={competitors} id={competitiveComparisonId} refetch={refetch} updateCompanyDescription={updateCompetitveComparison} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='competitive_comparison_id' />

            <Section title="Competitive Advantage" itemName='competitive_advantage' content={competitiveAdvantage} id={competitiveComparisonId} refetch={refetch} updateCompanyDescription={updateCompetitveComparison} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='competitive_comparison_id' />
        </div>
    );
};

export default CompetitiveComparison;