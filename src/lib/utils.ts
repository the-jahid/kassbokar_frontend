import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toNormalCase = (text: string) => {
  return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const getCookieValue = (name: string) => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }
  return null;
};


export const baseQuery = () => {
 

  return fetchBaseQuery({
    baseUrl: process.env.BACKEND_SERVER,
    prepareHeaders: (headers) => {

      const sessionCookie = getCookieValue('__session');
      
    if (sessionCookie) {
      headers.set('Authorization', `Bearer ${sessionCookie}`);
     
    }
    return headers;
    },
  })
}

