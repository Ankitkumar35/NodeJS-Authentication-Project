const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = new express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});