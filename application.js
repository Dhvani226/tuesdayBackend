const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Parse JSON bodies

app.post('/api/application', async (req, res) => {
  try {
    const newApplication = await prisma.scienceDayApplication.create({
      data: {
        studentName: req.body.studentName,
        schoolName: req.body.schoolName,
        schoolAddress: req.body.schoolAddress,
        schoolCity: req.body.schoolCity,
        schoolState: req.body.schoolState,
        schoolPincode: req.body.schoolPincode,
        teacherName: req.body.teacherName,
        teacherEmail: req.body.teacherEmail,
        modelType: req.body.modelType,
        participationType: req.body.participationType,
        createdAt: new Date(),
      },
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
