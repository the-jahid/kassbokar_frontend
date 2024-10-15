'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Clock, ChevronDown } from "lucide-react";

interface Expert {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rate: number;
  tags: string[];
}

const expertsData: Expert[] = [
  {
    id: 1,
    name: "Mike Scanlin",
    role: "Early-stage VC at Mistral Venture Partners",
    company: "Mistral Venture Partners",
    image: "/placeholder.svg?height=80&width=80",
    rate: 3.33,
    tags: ["Fundraising", "Strategy"]
  },
  {
    id: 2,
    name: "Stuart MacDonald",
    role: "Former CMO at FreshBooks and Expedia",
    company: "FreshBooks and Expedia",
    image: "/placeholder.svg?height=80&width=80",
    rate: 5.00,
    tags: ["Marketing", "Strategy"]
  },
  {
    id: 3,
    name: "Seth Berman",
    role: "Head of Growth Marketing at Stripe",
    company: "Stripe",
    image: "/placeholder.svg?height=80&width=80",
    rate: 5.83,
    tags: ["Marketing", "Strategy"]
  }
];

const ExpertCard = React.memo(({ expert, expandedCard, handleCardClick, handleBookCall }: { expert: Expert, expandedCard: number | null, handleCardClick: (id: number) => void, handleBookCall: (expert: Expert) => void }) => (
  <motion.div
    key={expert.id}
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ scale: 1.05 }}
    onClick={() => handleCardClick(expert.id)}
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <motion.img 
          src={expert.image} 
          alt={expert.name} 
          className="w-16 h-16 rounded-full mr-4"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
        <div>
          <h2 className="text-xl font-semibold">{expert.name}</h2>
          <p className="text-gray-600">{expert.role}</p>
        </div>
      </div>
      <AnimatePresence>
        {expandedCard === expert.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 mb-4">{expert.company}</p>
            <div className="mb-4">
              {expert.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  whileHover={{ scale: 1.1, backgroundColor: '#e2e8f0' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">${expert.rate.toFixed(2)} / minute</span>
        <Button onClick={(e) => {
          e.stopPropagation();
          handleBookCall(expert);
        }}>
          Book a Call
        </Button>
      </div>
    </div>
    <motion.div
      className="bg-gray-100 p-4 flex justify-center items-center"
      initial={false}
      animate={{ rotate: expandedCard === expert.id ? 180 : 0 }}
    >
      <ChevronDown />
    </motion.div>
  </motion.div>
));

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedExpert: Expert | null;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ isOpen, setIsOpen, selectedExpert, selectedDate, setSelectedDate }) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Book a Call with {selectedExpert?.name}</DialogTitle>
      </DialogHeader>
      <motion.div 
        className="grid gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="mr-2" />
          <select className="border rounded-md p-2 w-full appearance-none">
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>01:00 PM</option>
            <option>02:00 PM</option>
            <option>03:00 PM</option>
            <option>04:00 PM</option>
            <option>05:00 PM</option>
          </select>
          <ChevronDown className="absolute right-4 pointer-events-none" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => {
              alert(`Booking confirmed with ${selectedExpert?.name}`);
              setIsOpen(false);
            }}
            className="w-full"
          >
            Confirm Booking
          </Button>
        </motion.div>
      </motion.div>
    </DialogContent>
  </Dialog>
);

export default function AnimatedExpertBooking() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleBookCall = useCallback((expert: Expert) => {
    setSelectedExpert(expert);
    setIsOpen(true);
  }, []);

  const handleCardClick = useCallback((id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  }, [expandedCard]);

  const experts = useMemo(() => expertsData, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Book an Expert
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {experts.map((expert) => (
          <ExpertCard 
            key={expert.id}
            expert={expert}
            expandedCard={expandedCard}
            handleCardClick={handleCardClick}
            handleBookCall={handleBookCall}
          />
        ))}
      </motion.div>
      <BookingDialog 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedExpert={selectedExpert}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}