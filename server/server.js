const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get("/api", (req, res) => {
    res.json([
        {
            "id": 1,
            "companyName": 'ABC',
            "projectBudget": '$50000',
            "bidMoney": '$2400',
            "projectDeadline": '26th January 2028',
            "deliverTargetDate": '16th December 2027'
        },
        {
            "id": 2,
            "companyName": 'DEF',
            "projectBudget": '$60000',
            "bidMoney": '$3400',
            "projectDeadline": '30th January 2028',
            "deliverTargetDate": '20th December 2027'
        },
        {
            "id": 3,
            "companyName": 'GHI',
            "projectBudget": '$70000',
            "bidMoney": '$4400',
            "projectDeadline": '10th February 2028',
            "deliverTargetDate": '25th December 2027'
        },
        {
            "id": 4,
            "companyName": 'XYZ',
            "projectBudget": '$70000',
            "bidMoney": '$4400',
            "projectDeadline": '10th February 2028',
            "deliverTargetDate": '25th December 2027'
        },
        {
            "id": 5,
            "companyName": 'CFD',
            "projectBudget": '$70000',
            "bidMoney": '$4400',
            "projectDeadline": '10th February 2028',
            "deliverTargetDate": '25th December 2027'
        },
        {
            "id": 6,
            "companyName": 'ANO',
            "projectBudget": '$70000',
            "bidMoney": '$4400',
            "projectDeadline": '10th February 2028',
            "deliverTargetDate": '25th December 2027'
        }
    ]);
});

app.listen(4000, () => {
    console.log("Server Started on port 4000");
});
