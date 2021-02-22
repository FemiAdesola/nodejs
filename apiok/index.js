if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const teamRouter = require('./routes/team');
const methodOverride = require('method-override');
const logger = require('./middleware/logger');


// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology: true  });
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', ()=> console.log('Connected to Mongoose'));

app.use('./middleware', logger)

app.use('/', indexRouter);
app.use('/team', teamRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
