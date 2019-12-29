const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.resolve('public')));

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});