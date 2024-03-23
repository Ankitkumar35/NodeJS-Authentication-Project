const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');

const session = require('express-session');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
// app.use(cors());
app.use(session({
  secret: config.jwtSecret,
  resave: false,
  saveUninitialized: true
}));
// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


const PORT = process.env.PORT || 3000;

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/',(req,res)=>res.send("running"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
