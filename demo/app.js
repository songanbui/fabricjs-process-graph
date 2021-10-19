const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/demo', express.static(path.join(__dirname)));
app.use('/index.js', express.static(path.join(__dirname, '/../index.js')));
app.use('/src', express.static(path.join(__dirname, '/../src')));
app.use('/bower_components', express.static(path.join(__dirname, '/../bower_components')));
app.use('/dist', express.static(path.join(__dirname, '/../dist')));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Demo app listening on port 3000!');
});

module.exports = app;
