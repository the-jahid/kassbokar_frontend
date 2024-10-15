// 'use client'

// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { Control} from 'react-hook-form';
// import { Separator } from '../ui/separator';
// import { cn } from '@/lib/utils';

// interface OverviewProps {
//   control: Control<any>;
//   errors: any;
// }

// const Overview = ({ control, errors }: OverviewProps) => {
    
//   return (
//     <div className='space-y-6' >

//       <div className='mb-10 space-y-3' >
//         <h2 className='text-xl font-semibold' >Overview</h2>
//         <Separator  />
//       </div>

//       <div className='space-y-5'>
//         <p>Is this a new or existing company?</p>
//         <div className='space-x-4'>
//           <Controller
//             name="is_new_company"
//             control={control}
//             render={({ field }) => (
//               <select 
//                 {...field}
//                 className='select select-bordered'
//               >
//                 <option value='new'>New</option>
//                 <option value='existing'>Existing</option>
//               </select>
//             )}
//           />
//         </div>
//       </div>

//    <div>
//    <label className="block mb-2 font-bold">
//         Describe what your company is/does
//     </label>

//     <Controller
//         name="company_description"
//         control={control}
//         rules={{ required: 'Please provide a description of your company' }}
//         render={({ field }) => (
//           <>
//             <textarea
//               {...field}
//               className="shadow appearance-none border rounded-box w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {errors.company_description && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.company_description.message}
//               </p>
//             )}
//           </>
//         )}
//       />
//    </div>
//    <div className="my-5">
//   <label className="block mb-2 font-bold">
//     What is the main goal of your business plan?
//   </label>

//   <Controller
//     name="main_goal_of_buisness_plan"
//     control={control}
//     defaultValue="business_funding"
//     rules={{ required: 'Please select the main goal of your business plan' }}
//     render={({ field }) => (
//       <>
//         <select {...field}  className='select select-bordered'>
       
//           <option value="business_funding">Business Funding</option>
//           <option value="business_growth">Business Growth</option>
//           <option value="market_research">Market Research</option>
//           <option value="other">Other</option>
//         </select>
//         {errors.main_goal_of_business_plan && (
//           <p className="mt-2 text-sm text-red-600">
//             {errors.main_goal_of_business_plan.message}
//           </p>
//         )}
//       </>
//     )}
//   />
// </div>
//    <div className="my-5">
//       <label className="block mb-2 font-bold">
//            Select language for your plan
//       </label>

//       <Controller
//         name="selected_language_for_plan"
//         control={control}
//         defaultValue="english"
//         rules={{ required: 'Please select a language' }}
//         render={({ field }) => (
//           <>
//             <select {...field} className='select select-bordered'>
              
//               <option value="english">English</option>
//               <option value="farsi">Farsi</option>
//               <option value="spanish">Spanish</option>
//             </select>
//             {errors.selected_language_for_plan && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.selected_language_for_plan.message}
//               </p>
//             )}
//           </>
//         )}
//       />
//     </div>
   
//   </div>
//   );
// };





// export default Overview

interface OverviewProps {
  control: Control<any>;
  errors: any;
}


'use client'

import React from 'react'
import { useFormContext, Controller, Control } from 'react-hook-form'
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

const Overview = ({ control, errors }: OverviewProps) => {
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Provide an overview of your business and its goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <Label htmlFor="is_new_company">Company Status</Label>
            <Controller
              name="is_new_company"
              control={control}
              rules={{ required: 'Please select the company status' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Company</SelectItem>
                    <SelectItem value="existing">Existing Company</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.is_new_company && (
              <p className="mt-2 text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.is_new_company.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="company_description">Company Description</Label>
            <Controller
              name="company_description"
              control={control}
              rules={{ 
                required: 'Please provide a description of your company',
                minLength: { value: 50, message: 'Description should be at least 50 characters long' }
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Describe what your company does, its mission, and its unique value proposition..."
                  className="min-h-[100px]"
                />
              )}
            />
            {errors.company_description && (
              <p className="mt-2 text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.company_description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="main_goal_of_business_plan">Main Goal of Business Plan</Label>
            <Controller
              name="main_goal_of_business_plan"
              control={control}
              rules={{ required: 'Please select the main goal of your business plan' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business_funding">Business Funding</SelectItem>
                    <SelectItem value="business_growth">Business Growth</SelectItem>
                    <SelectItem value="market_research">Market Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.main_goal_of_business_plan && (
              <p className="mt-2 text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.main_goal_of_business_plan.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="selected_language_for_plan">Plan Language</Label>
            <Controller
              name="selected_language_for_plan"
              control={control}
              rules={{ required: 'Please select a language for your plan' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="farsi">Farsi</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.selected_language_for_plan && (
              <p className="mt-2 text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.selected_language_for_plan.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Overview










