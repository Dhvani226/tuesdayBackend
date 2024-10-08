const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // or whatever port you're using

// Initialize Prisma Client
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post('/api/application', async (req, res) => {
  const { studentName, schoolName, schoolAddress, schoolCity, schoolState, schoolPincode, teacherName, teacherEmail, modelType, participationType } = req.body;

  try {
    const newApplication = await prisma.scienceDayApplication.create({
      data: {
        studentName,
        schoolName,
        schoolAddress,
        schoolCity,
        schoolState,
        schoolPincode,
        teacherName,
        teacherEmail,
        modelType,
        participationType
      }
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error creating application:', error.message); // Detailed error message
    res.status(500).send('Error creating application');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
