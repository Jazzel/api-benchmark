# API Benchmarking Tool

A simple Node.js-based benchmarking tool to test API performance, bandwidth usage, and concurrency handling. This tool allows you to send a specified number of requests to an API endpoint, measure response times, and calculate the server's throughput under different load conditions.

## Features

- Measure the total number of requests sent
- Track successful and failed requests
- Calculate total time taken for the requests
- Compute average response time and requests per second
- Handle concurrency to simulate real-world API load

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jazzel/api-benchmark.git
   cd api-benchmark
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

3. **Compile TypeScript (if applicable):**

   If you're using TypeScript, compile it using:

   ```bash
   npx tsc
   ```

## Usage

You can use the `runBenchmark` function in your TypeScript project to test your API. Here’s how to do it:

### Importing the Tool

```typescript
import runBenchmark from "./api-benchmark/dist"; // Adjust the path as necessary
```

### Demo Code

Here’s an example of how to use the benchmarking tool:

```typescript
const url = "http://localhost:3000/"; // Replace with your API URL
const totalRequests = 1000; // Total number of requests to send
const concurrency = 50; // Number of concurrent requests to send

const main = async () => {
  try {
    const results = await runBenchmark(url, totalRequests, concurrency);
    console.log(`--- Benchmark Results ---`);
    console.log(`Total Requests: ${results.totalRequests}`);
    console.log(`Successful Requests: ${results.successfulRequests}`);
    console.log(`Failed Requests: ${results.failedRequests}`);
    console.log(`Total Time Taken: ${results.totalTime} seconds`);
    console.log(`Average Response Time: ${results.averageResponseTime} ms`);
    console.log(`Requests Per Second: ${results.requestsPerSecond}`);
  } catch (error) {
    console.error("Error running benchmark:", error);
  }
};

main();
```

## Configuration

- **url**: The URL of the API you want to benchmark.
- **totalRequests**: Total number of requests to send.
- **concurrency**: Number of requests to send simultaneously.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for improvements or bug fixes. Your contributions are welcome!
