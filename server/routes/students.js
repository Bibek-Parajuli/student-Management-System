const express= require('express');
const stdRouter=express.Router();
const sampleStudents = {
    CSIT: {
      First: [
        { id: 1, name: 'John Doe', roll: 1 },
        { id: 2, name: 'Jane Smith', roll: 2 },
      ],
      Second: [
        { id: 3, name: 'Bob Wilson', roll: 1 },
        { id: 4, name: 'Alice Brown', roll: 2 },
      ],
    },
    BCA: {
      First: [
        { id: 5, name: 'Mike Johnson', roll: 1 },
        { id: 6, name: 'Sarah Davis', roll: 2 },
      ],
    },
    BIM: {
      First: [
        { id: 7, name: 'David Miller', roll: 1 },
        { id: 8, name: 'Emma Wilson', roll: 2 },
      ],
    },
  };
stdRouter.get('/list', (req,res)=>{
    res.json({sampleStudents});
}) 

 module.exports= stdRouter;