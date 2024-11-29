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

const testApi = async (
  url: string,
  totalRequests: number,
  concurrency: number
): Promise<BenchmarkResults> => {
  let successCount = 0;
  let failedCount = 0;
  let totalTime = 0;

  const start = Date.now();
  // Declare promises as an array of Promise<void>
  const promises: Promise<void>[] = [];

  for (let i = 0; i < totalRequests; i++) {
    const request = async () => {
      try {
        const reqStart = Date.now();
        await axios.get(url);
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
      // Clear the array
      promises.length = 0;
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
    // Total time in seconds
    totalTime: (end - start) / 1000,
    averageResponseTime:
      successCount > 0 ? (totalTime / successCount).toFixed(2) : "N/A",
    requestsPerSecond: (successCount / ((end - start) / 1000)).toFixed(2),
  };
};

const runBenchmark = async (
  url: string,
  totalRequests: number,
  concurrency: number
): Promise<BenchmarkResults> => {
  const results = await testApi(url, totalRequests, concurrency);
  return results;
};

export default runBenchmark;
