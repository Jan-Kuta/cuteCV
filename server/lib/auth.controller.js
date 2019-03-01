exports.controller = (req, res, provider, user, err) => {
  const io = req.app.get('io')
  if (err) {
    io.in(req.session.socketId).emit(provider, {err: err.message, user: null})
  }
  else {
    req.login(user, (loginErr) => (
      io.in(req.session.socketId).emit(provider, loginErr ? {err: loginErr.message, user: null} : {err: null, user: req.user})
    ))
  }
  res.end()
}
