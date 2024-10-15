'use client'

import { useToast } from "@/hooks/use-toast";
import { useDeleteCompanyMutation } from "@/lib/rtkqueryAPI/companies";
import { motion } from "framer-motion";
import Image from "next/image";
import { useId } from "react";

interface Card {
    company_id:string,
    description: string;
    title: string;
    src: string;
    content: () => JSX.Element;
  }
  
  interface CompaniesListProps {
    cards: Card[];
    setActive: (card: Card | boolean | null) => void,
    id:string
  }

  const CompaniesList: React.FC<CompaniesListProps> = ({ cards, setActive, id }) => {
    const { toast } = useToast()

    const [deleteCompany, {isSuccess}] = useDeleteCompanyMutation()

   
    
  

    return (
        <ul className="w-full mx-auto  gap-4  h-[80vh] overflow-y-auto ">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
              
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              view
            </motion.button>
          </motion.div>
        ))}
      </ul>
    )
}


export default CompaniesList