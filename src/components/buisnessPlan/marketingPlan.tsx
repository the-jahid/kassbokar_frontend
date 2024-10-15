'use client';

import { useUpdateMarketingPlanMutation } from '@/lib/rtkqueryAPI/marketingPlan';
import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';

interface MarketingPlanProps {
    marketingPlan?: {
        id?: string;
        contentMarketingSeo?: string;
        educationalWebinarsWorkshop?: string;
        influencerMarketing?: string;
        localizedDigitalMarketingCampaigns?: string;
        strategicPartnerShipBuisnessIncubators?: string;
        buisnessplanId?: string;
    };
}

const MarketingPlan: React.FC<MarketingPlanProps> = ({ marketingPlan = {} }) => {
    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateMarketingPlan, { isLoading, isError, isSuccess }] = useUpdateMarketingPlanMutation();

    const {
        id,
        contentMarketingSeo,
        educationalWebinarsWorkshop,
        influencerMarketing,
        localizedDigitalMarketingCampaigns,
        strategicPartnerShipBuisnessIncubators,
        buisnessplanId
    } = marketingPlan;

    return (
        <div key={id} className='space-y-5'>
            <Section title="Content Marketing SEO" itemName='content_marketing_seo' content={contentMarketingSeo} id={id} refetch={refetch} updateCompanyDescription={updateMarketingPlan} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='marketing_plan_id' />

            <Section title="Educational Webinars Workshop" itemName='educationl_webinar_workshop' content={educationalWebinarsWorkshop} id={id} refetch={refetch} updateCompanyDescription={updateMarketingPlan} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='marketing_plan_id' />

            <Section title="Influencer Marketing" itemName='influencer_marketing' content={influencerMarketing} id={id} refetch={refetch} updateCompanyDescription={updateMarketingPlan} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='marketing_plan_id' />

            <Section title="Localized Digital Marketing Campaigns" itemName='localized_digital_marketing_campaigns' content={localizedDigitalMarketingCampaigns} id={id} refetch={refetch} updateCompanyDescription={updateMarketingPlan} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='marketing_plan_id' />

            <Section title="Strategic Partnership Buisness Incubators" itemName='strategic_partnership_buisness_incubators' content={strategicPartnerShipBuisnessIncubators} id={id} refetch={refetch} updateCompanyDescription={updateMarketingPlan} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='marketing_plan_id' />
        </div>
    );
};

export default MarketingPlan;