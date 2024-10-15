'use client';

import { useUpdateIndustryOverviewMutation } from '@/lib/rtkqueryAPI/industryOverview';
import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';

interface IndustryOverviewProps {
    industryOverview?: {
        id?: string;
        industryDescription?: string;
        marketNeeds?: string;
        marketSegementation?: string;
        marketTrends?: string;
        buisnessplanId?: string;
    };
}

const IndustryOverview: React.FC<IndustryOverviewProps> = ({ industryOverview = {} }) => {
    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateIndustryOverview, { isLoading, isError, isSuccess }] = useUpdateIndustryOverviewMutation();

    const {
        id: industryOverviewId = '',
        industryDescription = '',
        marketNeeds = '',
        marketSegementation = '',
        marketTrends = '',
        buisnessplanId = ''
    } = industryOverview || {};

    return (
        <div key={industryOverviewId} className='space-y-5'>
            <Section title="Industry Description" itemName='industry_description' content={industryDescription} id={industryOverviewId} refetch={refetch} updateCompanyDescription={updateIndustryOverview} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='industry_overview_id' />
            <Section title="Market Needs" itemName='market_needs' content={marketNeeds} id={industryOverviewId} refetch={refetch} updateCompanyDescription={updateIndustryOverview} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='industry_overview_id' />
            <Section title="Market Segmentation" itemName='market_segmentation' content={marketSegementation} id={industryOverviewId} refetch={refetch} updateCompanyDescription={updateIndustryOverview} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='industry_overview_id' />
            <Section title="Market Trends" itemName='market_trends' content={marketTrends} id={industryOverviewId} refetch={refetch} updateCompanyDescription={updateIndustryOverview} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='industry_overview_id' />
        </div>
    );
};

export default IndustryOverview;