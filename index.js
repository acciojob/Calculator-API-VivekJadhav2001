const http = require("http");

const LIMIT = 1000000;

const app = http.createServer((req, res) => {
    // Allow JSON responses
    res.setHeader("Content-Type", "application/json");

    // GET /
    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;

        return res.end(
            JSON.stringify({
                message: "Hello world!"
            })
        );
    }

    // Only handle POST requests from here
    if (req.method !== "POST") {
        res.statusCode = 404;

        return res.end(
            JSON.stringify({
                status: "error",
                message: "Not Found"
            })
        );
    }

    // Read request body
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        let data;

        try {
            data = JSON.parse(body);
        } catch (error) {
            res.statusCode = 400;

            return res.end(
                JSON.stringify({
                    status: "error",
                    message: "Invalid data types"
                })
            );
        }

        const { num1, num2 } = data;

        // Validate data types
        if (
            typeof num1 !== "number" ||
            typeof num2 !== "number" ||
            Number.isNaN(num1) ||
            Number.isNaN(num2)
        ) {
            res.statusCode = 400;

            return res.end(
                JSON.stringify({
                    status: "error",
                    message: "Invalid data types"
                })
            );
        }

        // Input underflow
        if (num1 < -LIMIT || num2 < -LIMIT) {
            res.statusCode = 400;

            return res.end(
                JSON.stringify({
                    status: "error",
                    message: "Underflow"
                })
            );
        }

        // Input overflow
        if (num1 > LIMIT || num2 > LIMIT) {
            res.statusCode = 400;

            return res.end(
                JSON.stringify({
                    status: "error",
                    message: "Overflow"
                })
            );
        }

        // ADD
        if (req.url === "/add") {
            const sum = num1 + num2;

            if (sum < -LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Underflow"
                    })
                );
            }

            if (sum > LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Overflow"
                    })
                );
            }

            res.statusCode = 200;

            return res.end(
                JSON.stringify({
                    status: "success",
                    message: "the sum of given two numbers",
                    sum: sum
                })
            );
        }

        // SUB
        if (req.url === "/sub") {
            const difference = num1 - num2;

            if (difference < -LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Underflow"
                    })
                );
            }

            if (difference > LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Overflow"
                    })
                );
            }

            res.statusCode = 200;

            return res.end(
                JSON.stringify({
                    status: "success",
                    message: "the difference of given two numbers",
                    difference: difference
                })
            );
        }

        // MULTIPLY
        if (req.url === "/multiply") {
            const result = num1 * num2;

            if (result < -LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Underflow"
                    })
                );
            }

            if (result > LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Overflow"
                    })
                );
            }

            res.statusCode = 200;

            return res.end(
                JSON.stringify({
                    status: "success",
                    message: "The product of given numbers",
                    result: result
                })
            );
        }

        // DIVIDE
        if (req.url === "/divide") {
            if (num2 === 0) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Cannot divide by zero"
                    })
                );
            }

            const result = num1 / num2;

            if (result < -LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Underflow"
                    })
                );
            }

            if (result > LIMIT) {
                res.statusCode = 400;

                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "Overflow"
                    })
                );
            }

            res.statusCode = 200;

            return res.end(
                JSON.stringify({
                    status: "success",
                    message: "The division of given numbers",
                    result: result
                })
            );
        }

        // Unknown endpoint
        res.statusCode = 404;

        return res.end(
            JSON.stringify({
                status: "error",
                message: "Not Found"
            })
        );
    });
});

module.exports = app;