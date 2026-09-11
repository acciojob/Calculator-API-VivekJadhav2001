const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "main.html"));
});

// Check whether numbers are valid
function validateNumbers(req, res) {
    const { num1, num2 } = req.body;

    // Invalid data types
    if (
        typeof num1 !== "number" ||
        typeof num2 !== "number" ||
        Number.isNaN(num1) ||
        Number.isNaN(num2)
    ) {
        res.json({
            status: "error",
            message: "Invalid data types"
        });

        return false;
    }

    // Underflow
    if (num1 < -1000000 || num2 < -1000000) {
        res.json({
            status: "error",
            message: "Underflow"
        });

        return false;
    }

    // Overflow
    if (num1 > 1000000 || num2 > 1000000) {
        res.json({
            status: "error",
            message: "Overflow"
        });

        return false;
    }

    return true;
}

// Addition
app.post("/add", (req, res) => {
    if (!validateNumbers(req, res)) return;

    const { num1, num2 } = req.body;
    const sum = num1 + num2;

    if (sum < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }

    if (sum > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        });
    }

    res.json({
        status: "success",
        message: "the sum of given two numbers",
        sum: sum
    });
});

// Subtraction
app.post("/sub", (req, res) => {
    if (!validateNumbers(req, res)) return;

    const { num1, num2 } = req.body;
    const difference = num1 - num2;

    if (difference < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }

    if (difference > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        });
    }

    res.json({
        status: "success",
        message: "the difference of given two numbers",
        difference: difference
    });
});

// Multiplication
app.post("/multiply", (req, res) => {
    const { num1, num2 } = req.body;

    if (
        typeof num1 !== "number" ||
        typeof num2 !== "number" ||
        Number.isNaN(num1) ||
        Number.isNaN(num2)
    ) {
        return res.json({
            status: "error",
            message: "Invalid data types"
        });
    }

    if (num1 < -1000000 || num2 < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }

    if (num1 > 1000000 || num2 > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        });
    }

    const result = num1 * num2;

    if (result < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }

    if (result > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        });
    }

    return res.json({
        status: "success",
        message: "The product of given numbers",
        result: result
    });
});

// Division
app.post("/divide", (req, res) => {
    if (!validateNumbers(req, res)) return;

    const { num1, num2 } = req.body;

    // Division by zero
    if (num2 === 0) {
        return res.json({
            status: "error",
            message: "Cannot divide by zero"
        });
    }

    const result = num1 / num2;

    if (result < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }

    if (result > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        });
    }

    res.json({
        status: "success",
        message: "The division of given numbers",
        result: result
    });
});

module.exports = app;