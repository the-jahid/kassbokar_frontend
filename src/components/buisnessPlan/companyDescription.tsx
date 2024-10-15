'use client';



import { useUpdateCompanyDescriptionMutation } from '@/lib/rtkqueryAPI/companyDescription';
import { useGetBuisnessPlanQuery } from '@/lib/rtkqueryAPI/buisnessPlan';
import { Section } from './updatebuisnessPlanModal';

interface CompanyDescriptionProps {
    companyDescription?: {
        id?: string;
        overview?: string;
        products?: string;
        mission?: string;
        vision?: string;
        values?: string;
        buisnessplanId?: string;
    };
}


const CompanyDescription: React.FC<CompanyDescriptionProps> = ({ companyDescription = {} }) => {

    const selectedcompanyId = localStorage.getItem('selectedCompanyId')

    const { refetch } = useGetBuisnessPlanQuery(selectedcompanyId || '');
    const [updateCompanyDescription, { isLoading, isError, isSuccess }] = useUpdateCompanyDescriptionMutation();

    const {
        id,
        overview,
        products,
        mission,
        vision,
        values,
        buisnessplanId
    } = companyDescription;

    return (
        <div key={id} className='space-y-5'>
            <Section title="Overview" itemName='overview' content={overview} id={id} refetch={refetch} updateCompanyDescription={updateCompanyDescription} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='company_description_id' />
            <Section title="Products" itemName='products' content={products} id={id} refetch={refetch} updateCompanyDescription={updateCompanyDescription} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='company_description_id' />
            <Section title="Mission" itemName='mission' content={mission} id={id} refetch={refetch} updateCompanyDescription={updateCompanyDescription} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='company_description_id' />
            <Section title="Vision" itemName='vision' content={vision} id={id} refetch={refetch} updateCompanyDescription={updateCompanyDescription} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='company_description_id' />
            <Section title="Values" itemName='values' content={values} id={id} refetch={refetch} updateCompanyDescription={updateCompanyDescription} isLoading={isLoading} isError={isError} isSuccess={isSuccess} idName='company_description_id' />
        </div>
    );
};

export default CompanyDescription;