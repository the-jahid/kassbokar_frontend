'use client';


import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';
import { useUpdateStrategyImplementationMutation } from '@/lib/rtkqueryAPI/strategyImplementation';

interface StrategyProps {
    strategy?: {
        id?: string;
        managementTeam?: string;
        swotAnalysis?: string;
        pestleAnalysis?: string;
        buisnessplanId?: string;
    };
}

const Strategy: React.FC<StrategyProps> = ({ strategy = {} }) => {
    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateStrategy, { isLoading, isError, isSuccess }] = useUpdateStrategyImplementationMutation();

    const {
        id,
        managementTeam,
        swotAnalysis,
        pestleAnalysis,
       
    } = strategy;

    return (
        <div key={id} className='space-y-5'>
            <Section title="Management Team" itemName='management_team' content={managementTeam} id={id} refetch={refetch} updateCompanyDescription={updateStrategy} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='strategy_implementation_id' />

            <Section title="SWOT Analysis" itemName='swot_analysis' content={swotAnalysis} id={id} refetch={refetch} updateCompanyDescription={updateStrategy} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='strategy_implementation_id' />
            <Section title="PESTLE Analysis" itemName='pestle_analysis' content={pestleAnalysis} id={id} refetch={refetch} updateCompanyDescription={updateStrategy} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='strategy_implementation_id' />
        </div>
    );
};

export default Strategy;