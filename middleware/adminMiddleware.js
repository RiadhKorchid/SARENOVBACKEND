import jwt from 'jsonwebtoken';
import { refreshToken } from '../../SARENOV-Backend/controllers/authControllers.js';
export default function authMiddleware(req, res, next) {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Check if the header starts with 'Bearer '
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  // Extract the token
  const accessToken = tokenParts[1];
  try {
    // Verify the token using your JWT secret or public key
    const decodedToken = jwt.verify(accessToken, process.env.SECRET_ADMIN_TOKEN);
    // The decodedToken will contain the payload of the JWT
    // You can use this information for authentication or authorization

    // If authentication is successful, you can proceed to the next middleware
    // If not, you can return an error response or perform any other necessary action

    // Call the next middleware or route handler
    req.decodedToken=decodedToken;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Invalid token' });
  }
}
