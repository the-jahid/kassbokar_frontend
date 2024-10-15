import React, { useRef, useState } from 'react';
import { Separator } from '../ui/separator';

import { generatebuisnesplanUpdatedata } from '@/lib/updateBuisnessPlanitem';

import { useToast } from '@/hooks/use-toast';

interface SectionProps {
    title: string;
    content?: string;
    id?: string;
    itemName?: string;
    refetch: () => void;
    updateCompanyDescription: any;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    idName:string
}

export const Section: React.FC<SectionProps> = ({ title, content, id, itemName, refetch, updateCompanyDescription, isLoading, isError, isSuccess, idName }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [generatedText, setGeneratedText] = useState<string>('');
    const [pass, setPass] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async (): Promise<void> => {
        const text = `${inputValue} ${content}`;
        const generatedResult = await generatebuisnesplanUpdatedata(text);
        setGeneratedText(JSON.stringify(generatedResult));
        setInputValue('');
    };

    const handleUpdate = async (text: string, itemName: string) => {

    console.log('idName', idName, itemName, id)
       const data =  await updateCompanyDescription({
            [idName as string]: id || 'default_id',
            [itemName as string]: text
        });

       
        toast({
            title: `${title} updated successfully`
        });
        modalRef.current?.close();
        refetch();
    };

    return (
        <div className='glass p-5 rounded-btn'>
            <div className='space-y-3 mb-5'>
                <div className='flex justify-between items-center'>
                    <strong>{title}</strong>
                    <button className="btn" onClick={() => modalRef.current?.showModal()}>Edit</button>

                    {/* MODAL */}
                    <dialog ref={modalRef} id={`my_modal_${title}`} className="modal modal-bottom sm:modal-middle w-[90%] mx-auto rounded-box">
                        <div className='w-full rounded-box bg-white p-5 text-black h-full flex flex-col justify-between'>
                            <div className='flex justify-between items-center my-auto'>
                                <div>
                                    <h3 className="font-bold text-lg">Edit {title}</h3>
                                </div>
                                <form method="dialog">
                                    <button className="btn btn-outline">Close</button>
                                </form>
                            </div>
                            <Separator />
                            <div className='flex-col md:flex md:flex-row justify-between h-[40vh] grow overflow-y-auto'>
                                {/* left side */}
                                <div className='md:basis-3/6 overflow-y-auto p-5 space-y-5'>
                                    <div>
                                        {pass ? generatedText : content}
                                    </div>
                                    <button onClick={() => itemName && handleUpdate(generatedText, itemName)} disabled={!pass} className='btn btn-sm bg-primary'>Update</button>
                                </div>
                                {/* right side */}
                                <div className='flex flex-col justify-between md:basis-3/6 h-full overflow-y-auto p-4 md:border-l-2 space-y-4'>
                                    {/* top section */}
                                    <div className='grow-0'>
                                        <div className='space-y-2'>
                                            <h2 className='font-semibold text-lg'>Suggestions</h2>
                                            <Separator />
                                        </div>
                                        <div>
                                            <div className='md:flex space-x-2 mt-2'>
                                                <button className='btn btn-sm mb-2'>Provide more details</button>
                                                <button className='btn btn-sm mb-2'>Make more concise</button>
                                            </div>
                                            <Separator />
                                        </div>
                                    </div>
                                    {/* mid section */}
                                    <div className='grow overflow-y-auto'>
                                        <p>{generatedText}</p>
                                    </div>
                                    {generatedText && <button onClick={() => setPass(!pass)} className='btn btn-sm'>{pass ? 'take previous' : 'pass left'}</button>}
                                    {/* bottom section */}
                                    <div className="flex items-center px-2 space-x-2 grow-0 border rounded-btn">
                                        <input
                                            type="text"
                                            id="inputField"
                                            className="p-2 grow rounded-btn outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                                            placeholder="Type your questions or edit suggestions here"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            className="btn rounded-btn mt-2 p-2 bg-blue-500 text-white hover:bg-blue-600"
                                            onClick={handleButtonClick}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
                <Separator />
            </div>
            <p className='font-semibold'>{content}</p>
        </div>
    );
};