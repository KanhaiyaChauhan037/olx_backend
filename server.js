const express = require('express');
const mongoose = require('mongoose');
const classifiedsRoutes = require('./routes/classRoute');

const app = express();
const port = 3000;

app.use(express.json());

mongoose
     .connect("mongodb+srv://kch:kch@mock-15.utcr2qa.mongodb.net/", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
     .then(() => console.log('Connected to MongoDB'))
     .catch((err) => console.error('Failed to connect to MongoDB:', err));


app.use('/api', classifiedsRoutes);

app.listen(port, () => {
     console.log(`Server running on port ${port}`);
});
