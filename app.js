document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:5000/top-notifications")

    .then((response) => response.json())

    .then((data) => {

        const container =
            document.getElementById("notifications");

        container.innerHTML = "";

        // COMPANY POWER SCORE
        const companyPower = {

            "Google": 10,
            "Apple": 10,
            "Microsoft": 9,
            "Tesla": 9,
            "Amazon.com Inc.": 9,
            "TSMC": 8,
            "Alphabet Inc. Class A": 9,
            "PayPal Holdings Inc.": 8,
            "Berkshire Hathaway Inc.": 7,
            "Marvell Technology Inc.": 8
        };

        // GROUPING
        const groupedCompanies = {};

        data.forEach((item) => {

            let companyName =
                item.Message.split(" hiring")[0];

            if (!groupedCompanies[companyName]) {

                groupedCompanies[companyName] = {

                    count: 0,
                    latestTimestamp: item.Timestamp,
                    type: item.Type
                };
            }

            groupedCompanies[companyName].count++;

            if (
                new Date(item.Timestamp) >
                new Date(
                    groupedCompanies[companyName]
                    .latestTimestamp
                )
            ) {

                groupedCompanies[
                    companyName
                ].latestTimestamp =
                    item.Timestamp;
            }
        });

        // CONVERT TO ARRAY
        const companies =
            Object.entries(groupedCompanies);

        // SORT
        companies.sort((a, b) => {

            const powerA =
                companyPower[a[0]] || 5;

            const powerB =
                companyPower[b[0]] || 5;

            return powerB - powerA;
        });

        // CREATE CARDS
        companies.forEach(([company, details]) => {

            const card =
                document.createElement("div");

            card.classList.add("card");

            const power =
                companyPower[company] || 5;

            let priorityClass = "low";
            let priorityText = "Low Priority";

            if (power >= 9) {

                priorityClass = "high";
                priorityText = "High Priority";
            }

            else if (power >= 7) {

                priorityClass = "medium";
                priorityText = "Trending";
            }

            card.innerHTML = `

                <div class="priority-bar"></div>

                <div class="company">
                    ${company}
                </div>

                <div class="count">
                    ${details.count} Notifications
                </div>

                <div class="info">
                    Type: ${details.type}
                </div>

                <div class="visit">
                    Campus Visit Updated
                </div>

                <div class="badge ${priorityClass}">
                    ${priorityText}
                </div>

                <div class="time">
                    Latest Update:
                    <br>
                    ${details.latestTimestamp}
                </div>

            `;

            container.appendChild(card);
        });

    })

    .catch((error) => {

        console.log(
            "Error fetching notifications:",
            error
        );
    });

});