
import React from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { Separator } from '../ui/separator';

interface TeamProps {
  control: Control<any>;
  errors: any;
}

const Team = ({ control, errors }: TeamProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'management_team_members',
  });

  return (
    <div>
        <div className="my-5">
                    <div className='mb-10 space-y-3' >
                    <h2 className='text-xl font-semibold' >Competitive </h2>
                    <Separator  />
          </div>
    </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Management Team Members</h2>
        <p>For each key person on your current team, including yourself, complete the information below.</p>
      </div>

      <div>
        {fields.map((item, index) => (
          <div key={item.id} className="my-5 p-5 border rounded-box">
           <div className='flex space-x-4' >
           <div className="mb-4 flex-1 ">
              <label className="block mb-2 font-bold">Name</label>
              <Controller
                name={`management_team_members.${index}.name`}
                control={control}
                rules={{ required: 'Please enter the name' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              />
              {errors.management_team_members?.[index]?.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.management_team_members[index].name.message}
                </p>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label className="block mb-2 font-bold">Title</label>
              <Controller
                name={`management_team_members.${index}.title`}
                control={control}
                rules={{ required: 'Please enter the title' }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              />
              {errors.management_team_members?.[index]?.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.management_team_members[index].title.message}
                </p>
              )}
            </div>
           </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">Background</label>
              <Controller
                name={`management_team_members.${index}.background`}
                control={control}
                rules={{ required: 'Please enter the background' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              />
              {errors.management_team_members?.[index]?.background && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.management_team_members[index].background.message}
                </p>
              )}
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
           <button
          type="button"
          className="btn btn-outline mb-4"
          onClick={() => append({ name: '', title: '', background: '' })}
        >
          Add Team Member
        </button>
      </div>
    </div>
  );
};

export default Team;