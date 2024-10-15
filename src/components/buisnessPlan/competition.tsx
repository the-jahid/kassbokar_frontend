
import React from 'react';
import { useForm, Controller, useFieldArray, Control } from 'react-hook-form';
import { Separator } from '../ui/separator';


interface CompetitionProps {
  control: Control<any>
  errors: any;
}

const Competition = ({ control, errors }: CompetitionProps ) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'direct_competitors',
  });

  return (
    <div className="p-5">
         <div className="my-5">
                    <div className='mb-10 space-y-3' >
                    <h2 className='text-xl font-semibold' >Competitive </h2>
                    <Separator  />
          </div>
    </div>
      <div className="mb-5 space-y-6">
        <div className="flex justify-between items-center mb-3">
          <div className='space-y-2' >
            <h2 className="text-lg font-semibold">Direct Competitors</h2>
            <p>Please add each of your direct competitors below, or let the AI generate them (recommended):</p>
          </div>

          <button className='btn btn-outline'>Generate from AI</button>

        </div>
        
        {fields.map((item, index) => (
          <div key={item.id} className="my-5 p-5 border rounded-box">
           <div className=' flex space-x-4' >
           <div className="mb-4 flex-1 ">
              <label className="block mb-2 font-bold">Competitor Name</label>
              <Controller
                name={`direct_competitors.${index}.competitor_name`}
                control={control}
                rules={{ required: 'Please enter the competitor name' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              />
              {errors.direct_competitors?.[index]?.competitor_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.direct_competitors[index].competitor_name.message}
                </p>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label className="block mb-2 font-bold">Locations</label>
              <Controller
                name={`direct_competitors.${index}.locations`}
                control={control}
                rules={{ required: 'Please enter the locations' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              />
              {errors.direct_competitors?.[index]?.locations && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.direct_competitors[index].locations.message}
                </p>
              )}
            </div>
           </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
            type="button"
            className="btn btn-outline"
            onClick={() => append({ competitor_name: '', locations: '' })}
          >
            Add Competitor
          </button>
    </div>
  );
};

export default Competition;