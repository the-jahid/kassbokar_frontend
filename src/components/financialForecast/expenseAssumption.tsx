'use client'

import { useGetExpenseAssumptionQuery } from "@/lib/rtkqueryAPI/expenseAssumption"
import { Separator } from "../ui/separator"


const ExpenseAssumption = ({ financial_forecast_id }: { financial_forecast_id: string }) => {

  const {data, isLoading, isError, isSuccess} = useGetExpenseAssumptionQuery(financial_forecast_id) // i will get financial forecast id from localstorage

  const { capitalExpenditure, capitalExpenditureAssumptions, initialCapital, initialCapitalAssumptions, workingCapital, workingCapitalAssumptions, operatingExpenses } = data || {}

  return (
    <div className="glass p-5 rounded-box  space-y-10" >
      <div className=" space-y-10 " >
       <div className="space-y-3 " >
          <h2 className="text-2xl font-semibold" >Capital Requirements</h2>
          <Separator />
       </div>

       <div className="space-y-4 glass rounded-btn "  >
        <div className="p-4  space-y-2 ">
              <p className="text-lg font-semibold" >Initial Capital</p>
              <div className="space-x-4 border p-3 flex w-fit rounded-btn " >
                <input type="text" value={initialCapital} className="outline-none"  />
                <p className="font-bold">$USD</p>
              </div>
          </div>
          <div className="p-4  bg-white  space-y-2" >
            <p className="text-lg font-semibold"  >Assumption</p>
            <textarea value={initialCapitalAssumptions} rows={5}  className="w-full border rounded-sm p-4" />
          </div>
       </div>
       <div className=" glass rounded-btn  space-y-4"  >
        <div className="p-4  space-y-2 ">
              <p className="text-lg font-semibold" >Working Capital</p>
              <div className="space-x-4 border p-3 flex w-fit rounded-btn " >
                <input type="text" value={workingCapital} className="outline-none"  />
                <p className="font-bold">$USD</p>
              </div>
          </div>
          <div className=" p-4 bg-white  space-y-2" >
            <p className="text-lg font-semibold"  >Assumption</p>
            <textarea value={workingCapitalAssumptions} rows={5}  className="w-full border rounded-sm p-4" />
          </div>
       </div> 
       <div className="space-y-4 glass rounded-btn " >
        <div className=" p-4  space-y-2 ">
              <p className="text-lg font-semibold" >Capital Expenditure</p>
              <div className="space-x-4 border p-3 flex w-fit rounded-btn " >
                <input type="text" value={capitalExpenditure} className="outline-none"  />
                <p className="font-bold">$USD</p>
              </div>
          </div>
          <div className=" p-4  bg-white  space-y-2" >
            <p className="text-lg font-semibold"  >Assumption</p>
            <textarea value={capitalExpenditureAssumptions} rows={5}  className="w-full border rounded-sm p-4" />
          </div>
       </div>
      </div>

      <div>
          <div className="space-y-3 " >
              <h2 className="text-2xl font-semibold" >Operating expenses</h2>
              <Separator />
          </div>

        <div className="space-y-10" >
            {
              operatingExpenses?.map((item) => <div className="space-y-5 glass p-5 rounded-btn" >
                  <label className="space-y-2" >
                    <h3 className="text-md font-semibold" >Category</h3>
                    <input type="text" value={item.category} className="border p-2 rounded-btn" />
                  </label>

                  <div className="space-x-4 flex flex-wrap " >
                    <label className="space-y-2">
                      <h3 className="text-md font-semibold" >Amount</h3>
                      <input type="text" value={item.amount} className="border p-2 rounded-btn" />
                    </label>

                    <label className="space-y-2">
                      <h3 className="text-md font-semibold" >Growth rate</h3>
                      <input type="text" value={item.growthRate} className="border p-2 rounded-btn" />
                    </label>

                    <label className="space-y-2">
                      <h3 className="text-md font-semibold" >Growth rate unit</h3>
                      <input type="text" value={item.growthRateUnit} className="border p-2 rounded-btn" />
                    </label>
                  </div>

                  <div>
                    <label className="space-y-2" >
                        <h3 className="text-md font-semibold" >Assumptions</h3>
                        <textarea rows={5} value={item.assumptions} className="border p-2 rounded-btn w-full  " />
                    </label>
                  </div>

              </div> )
            }
        </div>
      </div>
    </div>
  )
}

export default ExpenseAssumption


