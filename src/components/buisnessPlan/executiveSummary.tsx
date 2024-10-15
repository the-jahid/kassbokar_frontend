'use client';
import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';
import { useUpdateExecutiveSummaryMutation } from '@/lib/rtkqueryAPI/executitveSummary';

interface ExecutiveSummaryProps {
    executiveSummary?: {
        id?: string;
        ProblemStateMent?: string;
        ProposedSolution?: string;
        ValueProposition?: string;
        ThreeYearsObective?: string;
        KeysToSuccess?: string;
        createdAt?: string;
        updatedAt?: string;
        buisnessplanId?: string;
    };
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ executiveSummary = {} }) => {
    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateExecutiveSummary, { isLoading, isError, isSuccess }] = useUpdateExecutiveSummaryMutation();

    const {
        id: executiveSummaryId = '',
        ProblemStateMent = '',
        ProposedSolution = '',
        ValueProposition = '',
        ThreeYearsObective = '',
        KeysToSuccess = '',
        
    } = executiveSummary || {};

    return (
        <div key={executiveSummaryId} className='space-y-5'>
            <Section title="Problem Statement" itemName='problem_statement' content={ProblemStateMent} id={executiveSummaryId} refetch={refetch} updateCompanyDescription={updateExecutiveSummary} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='executive_summary_id' />

            <Section title="Proposed Solution" itemName='proposed_solution' content={ProposedSolution} id={executiveSummaryId} refetch={refetch} updateCompanyDescription={updateExecutiveSummary} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='executive_summary_id' />

            <Section title="Value Proposition" itemName='value_proposition' content={ValueProposition} id={executiveSummaryId} refetch={refetch} updateCompanyDescription={updateExecutiveSummary} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='executive_summary_id' />

            <Section title="Three Years Objective" itemName='three_years_objective' content={ThreeYearsObective} id={executiveSummaryId} refetch={refetch} updateCompanyDescription={updateExecutiveSummary} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='executive_summary_id' />

            <Section title="Keys to Success" itemName='keys_to_success' content={KeysToSuccess} id={executiveSummaryId} refetch={refetch} updateCompanyDescription={updateExecutiveSummary} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='executive_summary_id' />
        </div>
    );
};

export default ExecutiveSummary;