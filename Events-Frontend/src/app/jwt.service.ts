

export class JwtService{
    isTokenExpired(token: string): boolean {
        if (!token) return true; // If no token is provided, consider it expired.
    
        try {
          // Decode the JWT payload (Base64 URL-decoded)
          const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(payload)
          // Extract the expiration time (`exp`) in seconds
          const expirationDate = payload.exp * 1000; // Convert to milliseconds
            console.log(expirationDate)
          // Compare expiration date with current time
          return Date.now() > expirationDate;
        } catch (error) {
          console.error('Invalid token format:', error);
          return true; // If the token cannot be decoded, consider it expired.
        }
      }

}