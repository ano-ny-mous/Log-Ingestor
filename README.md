# Log Ingestor

The Log Ingestor is a Node.js application that allows you to receive and search log messages, storing them in a MongoDB database. It provides an HTTP endpoint for receiving log messages and a search endpoint for querying the logs based on various parameters.

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous.git

2. **Install dependencies:**

   ```bash
   cd log-ingestor
   npm install

3. **Set up MongoDB:**
   Ensure MongoDB is installed and running on your machine.
   Update the MongoDB connection string in index.js to point to your database.

4. **Running the Server:**

   ```bash
   node index.js

  The server will start on port 3000. Ensure MongoDB is running before starting the server.

## Screenshots

![1](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/0a278682-1ae8-440f-b455-e38e56db080b)

![2](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/3bdc98d4-19f9-4f49-aebd-c895e063a5a0)

![3](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/1c2f4ff6-2e43-433a-a593-1ba8406cea64)

![4](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/b5a18d22-7ddb-4ffc-919d-bb6d38457fc8)

![Image 1](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/609f6428-76a9-43c3-a0f8-0fa5ca70e8c5)

![Screenshot (36)0](https://github.com/dyte-submissions/november-2023-hiring-ano-ny-mous/assets/91519560/9e9753bf-e94b-4373-ad56-537d2a5cb661)


## The Log Ingestor supports different types of log messages, including but not limited to:

1. **Error Log:**

   ```json
    {
      "level": "error",
      "message": "Failed to connect to DB",
      "resourceId": "server-1234",
      "timestamp": "2023-09-15T08:00:00Z",
      "traceId": "abc-xyz-123",
      "spanId": "span-456",
      "commit": "5e5342f",
      "metadata": {
          "parentResourceId": "server-0987"
      }
    }

2. **Info Log:**

   ```json
    {
      "level": "info",
      "message": "Application started successfully",
      "resourceId": "server-5432",
      "timestamp": "2023-09-15T08:15:00Z",
      "traceId": "jkl-abc-012",
      "spanId": "span-345",
      "commit": "i9j8k7l",
      "metadata": {
        "parentResourceId": "server-7890"
      }
    }


3. **Warning Log:**

   ```json
    {
      "level": "warning",
      "message": "Warning: Resource usage above normal levels",
      "resourceId": "server-9876",
      "timestamp": "2023-09-15T08:10:00Z",
      "traceId": "ghi-xyz-789",
      "spanId": "span-012",
      "commit": "e4f5g6h",
      "metadata": {
        "parentResourceId": "server-3456"
      }
    }

4. **Debug Log:**

   ```json
    {
      "level": "debug",
      "message": "Processing request: /api/v1/users",
      "resourceId": "server-1234",
      "timestamp": "2023-09-15T08:20:00Z",
      "traceId": "mno-pqr-678",
      "spanId": "span-901",
      "commit": "u8v7w6x",
      "metadata": {
        "parentResourceId": "server-5678"
      }
    }



## Features
**Date Range Search:**

The Log Ingestor supports searching logs within a specified date range. When making a GET request to /search, you can provide startDate and endDate parameters to filter logs based on their timestamps.

**Regular Expression Search:**

You can perform a regular expression search on log fields by providing the query parameter as a regular expression. Set useRegex to true to enable regular expression searching.


## Using Postman

To interact with the Log Ingestor API using Postman, you can follow these steps:

1. **Open Postman:**
   If you don't have Postman installed, you can download and install it from the [official website](https://www.postman.com/).

2. **Send a Log Message:**
   - Set the HTTP method to `POST`.
   - Enter the URL: `http://localhost:3000/log` (or the appropriate URL for your setup).
   - In the request body, provide a JSON object representing the log message. For example:

   ```json
   {
     "level": "info",
     "message": "User authentication successful",
     "resourceId": "server-123",
     "timestamp": "2023-09-16T12:30:00Z",
     "traceId": "xyz-abc-123",
     "spanId": "span-456",
     "commit": "a1b2c3d4",
     "metadata": {
       "userId": "user-789"
     }
   }
Click "Send" to submit the log message.

Feel free to experiment with different requests to explore the capabilities of the Log Ingestor API using Postman.

