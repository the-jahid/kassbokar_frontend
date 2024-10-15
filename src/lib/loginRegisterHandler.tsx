
'use server'
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
// import tokenManager from "./tokenManager";

const handleUserRegistrationOrLogin = async () => {

  const user = await currentUser();
    let token
  if (!user) {
    console.error('No user found');
    
  }

  try {
    const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
      email: user?.emailAddresses[0].emailAddress,
      oauthId: user?.id,
    });

    console.log('User registered:', response.data);
  } catch (registerError) {
   

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email: user?.emailAddresses[0].emailAddress,
        oauthId: user?.id,
      });
      console.log('User logged in:', response.data.token);
      token = response.data.token
    
    } catch (loginError) {
      if (axios.isAxiosError(loginError)) {
        console.error('Axios error logging in user:', loginError.response?.data || loginError.message);
      } else {
        console.error('Unexpected error logging in user:', loginError);
      }
    }
  }

  return token
};

export default handleUserRegistrationOrLogin;