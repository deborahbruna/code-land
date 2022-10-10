const jwt = require('jsonwebtoken');
const assert = require('assert');

assert(process.env.SECRET, "Missing SECRET environment variable ")
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });
    
  const parts = authHeader.split(' ');
    
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });
    
  const [ scheme, token ] = parts;

  if (!(/Bearer/g.test(scheme)))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;

    return next();
  })

};