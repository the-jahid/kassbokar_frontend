"use client";
import React, {  useId, useRef, useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import CreateCompanymodal from "@/components/companies/createCompanymodal";
import { useGetAllCompaniesQuery } from "@/lib/rtkqueryAPI/companies";
import { companytransformData } from "@/lib/transformData";
import CompaniesList from "@/components/companies/companiesList";
import CompanyCard from "@/components/companies/companycard";

const Companies = () => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const { data, isFetching, isLoading, refetch } = useGetAllCompaniesQuery();
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const cards = useMemo(() => companytransformData(data), [data]);

  console.log('cdata', data)

  return (
    <div>
      <div className="flex justify-around py-3 items-center">
        <h2 className="text-primary text-2xl md:text-4xl font-semibold">My companies</h2>
        <CreateCompanymodal refetch={refetch} />
      </div>
      <Separator />
      <CompanyCard active={active} id={id} setActive={setActive} refetch={refetch} />
      <CompaniesList cards={cards} setActive={setActive} id={id} />
    </div>
  );
};

export default Companies;