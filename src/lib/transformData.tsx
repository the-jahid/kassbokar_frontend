import React from 'react';

interface InputData {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  title: string;
  updatedAt: string;
  userId: string;
}

interface Card {
  company_id: string,
  description: string;
  title: string;
  src: string;
  content: () => JSX.Element;
}

export const companytransformData = (data: InputData[] | undefined): Card[] => {
  if (!data) {
    return [];
  }

  return data.map(item => ({
    company_id: item.id,
    description: item.description,
    title: item.title,
    src: item.image,
    content: () => (
      <p>
        {item.description}
      </p>
    ),
  }));
};

