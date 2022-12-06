const jwt =  require('jsonwebtoken');

module.exports = {
  checkApi: (req, res, next) => {

    let except = [
      '/api/login',
      '/api/cek-login',
    ]

    if (except.indexOf(req.originalUrl) >= 0) next();

    let bearerHeader = req.header('authorization');
    if (typeof bearerHeader === 'undefined') return res.status(401).send({
      message: 'No credentials sent!'
    })

    let bearer = bearerHeader.split(' ');
    if (bearer.length != 2) return res.status(400).send({
      message: 'Bearer invalid'
    })

    bearer = bearer[1];
    let decoded = '';
    try {
      decoded = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
      req.setSession = decoded
    } catch (err) {
      return res.status(502).send({
        message: err.message
      })
    }

    next();

  }
}