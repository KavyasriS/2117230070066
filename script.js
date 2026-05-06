fetch("http://localhost:5000/top-notifications")

    .then((response) => response.json())

    .then((data) => {

        const container =
            document.getElementById("notifications");

        data.forEach((item) => {

            const card =
                document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
            
                <h2 class="type">
                    ${item.Type}
                </h2>

                <p class="message">
                    ${item.Message}
                </p>

                <p class="time">
                    ${item.Timestamp}
                </p>
            `;

            container.appendChild(card);
        });
    })

    .catch((error) => {

        console.log(
            "Error fetching notifications",
            error
        );
    });