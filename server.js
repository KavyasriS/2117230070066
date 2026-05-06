const express = require("express");
const axios = require("axios");
const cors = require("cors");

const Log = require("../logger");

const app = express();

app.use(cors());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYXZ5YXNyaS5zLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsImV4cCI6MTc3ODA1MDAyOCwiaWF0IjoxNzc4MDQ5MTI4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTIyN2ViMGItYzhkNC00YzY3LWFjOTQtN2ZmODU5N2NjZjUxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2F2eWFzcmlzIiwic3ViIjoiNDNiZmU5NzQtMWNhMS00NDRmLWEzNDEtMDgxYmI0YmY5ZDUxIn0sImVtYWlsIjoia2F2eWFzcmkucy4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJuYW1lIjoia2F2eWFzcmlzIiwicm9sbE5vIjoiMjExNzIzMDA3MDA2NiIsImFjY2Vzc0NvZGUiOiJCVENEcVQiLCJjbGllbnRJRCI6IjQzYmZlOTc0LTFjYTEtNDQ0Zi1hMzQxLTA4MWJiNGJmOWQ1MSIsImNsaWVudFNlY3JldCI6IkRZdUdxS0V2cUdHWmR6RXcifQ.qOFND4Q9kiTEnKoWA81XsCfS4KRbDHz3qhzXa-T7mdA";
const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1
};

app.get("/top-notifications", async (req, res) => {

    try {

        // LOG 1
        Log(
            "backend",
            "info",
            "route",
            "Request received for notifications"
        );

        // FETCH API
        const response = await axios.get(
            "http://20.207.122.201/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        // LOG 2
        Log(
            "backend",
            "info",
            "api",
            "Notifications fetched successfully"
        );

        const notifications =
            response.data.notifications;

        notifications.sort((a, b) => {

            if (
                priorityMap[b.Type] !==
                priorityMap[a.Type]
            ) {

                return (
                    priorityMap[b.Type] -
                    priorityMap[a.Type]
                );
            }

            return (
                new Date(b.Timestamp) -
                new Date(a.Timestamp)
            );
        });

        // LOG 3
        Log(
            "backend",
            "info",
            "sorting",
            "Notifications sorted successfully"
        );

        const top10 = notifications.slice(0, 10);

        // LOG 4
        Log(
            "backend",
            "info",
            "response",
            "Top 10 notifications sent"
        );

        res.json(top10);

    } catch (error) {

        // ERROR LOG
        Log(
            "backend",
            "error",
            "api",
            error.message
        );

        res.status(500).json({
            error: "Failed to fetch notifications"
        });
    }
});

app.listen(5000, () => {

    Log(
        "backend",
        "info",
        "server",
        "Server started on port 5000"
    );

    console.log("Server running");
});