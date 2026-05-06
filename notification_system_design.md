# Stage 1

## Approach

Fetched notifications from API using Axios.

Notifications are prioritized based on:

Placement > Result > Event

Then notifications are sorted by latest timestamp.

Top 10 notifications are displayed.

## Scalability

For future scalability, priority queue or heap-based
approach can be used for efficient maintenance
of top notifications.