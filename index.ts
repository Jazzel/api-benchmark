import axios from "axios";

interface BenchmarkResults {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  // in seconds
  totalTime: number;
  // formatted as string
  averageResponseTime: string;
  // formatted as string
  requestsPerSecond: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const testApi = async (
  url: string,
  totalRequests: number,
  concurrency: number,
  method: HttpMethod,
  headers?: any, // optional headers for the request
  data?: any // optional data for POST and PUT requests
): Promise<BenchmarkResults> => {
  let successCount = 0;
  let failedCount = 0;
  let totalTime = 0;

  const start = Date.now();
  const promises: Promise<void>[] = [];

  for (let i = 0; i < totalRequests; i++) {
    const request = async () => {
      try {
        const reqStart = Date.now();

        // Use the appropriate method for the request
        if (method === "GET") {
          await axios.get(url, headers);
        } else if (method === "POST") {
          await axios.post(url, data, headers);
        } else if (method === "PUT") {
          await axios.put(url, data, headers);
        } else if (method === "DELETE") {
          await axios.delete(url, headers);
        }

        successCount++;
        totalTime += Date.now() - reqStart;
      } catch (err) {
        failedCount++;
      }
    };

    promises.push(request());

    // Handle concurrency
    if (promises.length >= concurrency) {
      await Promise.all(promises);
      promises.length = 0; // Clear the array
    }
  }

  // Wait for the remaining requests to complete
  await Promise.all(promises);

  const end = Date.now();

  // Return results as an object
  return {
    totalRequests,
    successfulRequests: successCount,
    failedRequests: failedCount,
    totalTime: (end - start) / 1000, // Total time in seconds
    averageResponseTime:
      successCount > 0 ? (totalTime / successCount).toFixed(2) : "N/A",
    requestsPerSecond: (successCount / ((end - start) / 1000)).toFixed(2),
  };
};

const runBenchmark = async (
  url: string,
  totalRequests: number,
  concurrency: number,
  method: HttpMethod,
  headers?: any,
  data?: any
): Promise<BenchmarkResults> => {
  const results = await testApi(url, totalRequests, concurrency, method, data);
  return results;
};

export default runBenchmark;
