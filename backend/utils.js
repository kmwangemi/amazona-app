import jwt from 'jsonwebtoken';

// generating token with 30days expiry
export const generateToken = user => {
   return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
   },
      process.env.JWT_SECRET || 'somethingsecret',
      {
         expiresIn: '30d'
      }
   );
}

// isAuth middleware
export const isAuth = (req, res, next) => {
   const authorization = req.headers.authorization;
   if (authorization) {
      // get token from header and starts at index 7
      const token = authorization.slice(7, authorization.length) // Bearer XXXXX
      // decrypt the token
      jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
         if (err) {
            res.status(401).send({message: 'Invalid Token'});
         } else {
            req.user = decode;
            next();
         }
      })
   } else {
      res.status(401).send({ message: 'No token' })
   }
}

// isAdmin middleware
export const isAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401).send({ message: 'Invalid Admin Token'})
   }
}