
class TokenManager {
    saveToken(token: string) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', JSON.stringify(token))
      } else {
       
      }
    }
  
    getToken(): string | null {
      if (typeof window !== 'undefined') {
        let authToken = localStorage.getItem('clerkAuthToken');
        if (authToken) {
          authToken = authToken.replace(/^"|"$/g, ''); // Remove double quotes from both sides
          return authToken
        } else {
        
          return null;
        }

      } else {
      
        return null;
      }
    }
  
    removeToken() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('clerkAuthToken');
      } else {
      
      }
    }
  }
  
  const tokenManager = new TokenManager();
  
  export default tokenManager;