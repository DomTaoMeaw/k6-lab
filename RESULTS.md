# K6 lab results

## Part 0

- Step 0.1, http_req_duration: **278.83 ms** (avg and p(95))
- Step 0.2, requests, rate and p(95), and why the rate stays below 5: 80 requests, 3.81 req/s, p(95) = 268.97 ms. The rate stays below 5 because each VU waits for the HTTP response and then sleeps for 1 second before starting the next iteration.
- Step 0.3, iterations: 20 iterations shared among 5 VUs. All 20 iterations completed successfully in 5.7 seconds. Checks passed 100%, with an average response time of 257.96 ms and p(95) of 265.70 ms.
- Step 0.4, Pizza API: POST request with Authorization token returned HTTP 200. All 3 checks passed (100%). The pizza name was defined and all ingredients were vegetarian. Average response time was 348.31 ms.
- Step 0.5, No Token: The API returned HTTP 401 when the Authorization token was missing. The status check passed (100%), and http_req_failed was 0.00% because 401 was configured as an expected status. Average response time was 270.6 ms.
- Step 0.6, Thresholds: Ran the test with 3 VUs for 30 seconds. With the default P95 threshold of 1500 ms, the test passed. The measured p95 was 388.93 ms and the exit code was 0. Then, I changed P95 to 300 ms. The test failed because the measured p95 was 376.86 ms, which exceeded the threshold. The exit code was 99. All checks passed (100%), and `http_req_failed` was 0.00% in both runs.
- Step 0.7, rules that passed, p(95), p(99), exit code after your change:
  - Original requirement: All rules passed. p(95) = 380.41 ms and p(99) = 389.54 ms. The failure rate was 0.00%. Exit code = 0.
  - After changing p(95) from 1000 ms to 300 ms: The p(95) rule failed because the measured value was 373.08 ms. The p(99), request failure rate, and checks rules passed. Exit code = 99.
- Step 0.8, Bug Hunt:
  - Before fixing: 195/225 checks passed (86.66%). The no pepperoni check passed 67/75 times, and the no knife needed check passed 53/75 times.
  - The problem was the ingredient and tool names in the request. The API uses `Pepperoni` and `Knife`, so I changed the values from lowercase to the exact names returned by the API.
  - After fixing: All 225/225 checks passed (100%). All three checks passed, and the HTTP request failure rate was 0%.
  - Testing with 5 VUs for 20 seconds found the problem because it checked many pizza recommendations. A single manual request might not show the problem every time.

## Part A results

| Step | Test type    | Users | Req/s | p(95)   | Max      | Failed | Checks |
| ---- | ------------ | ----- | ----- | ------- | -------- | ------ | ------ |
| A1   | Smoke        | 1     | 0.535 | 377.39ms | 393.47ms | 0% | 100% |
| A2   | Average load | 3     | 1.314 | 361.44ms | 393.57ms | 0% | 100% |
| A3   | Stress       | 5     | 2.17  | 365ms    | 385ms    | 0% | 100% |
| A4   | Spike        | 5     | 1.05  | 364ms    | 383ms    | 0% | 100% |
| A5   | Soak         | 2     | 0.98  | 384ms    | 424ms    | 0% | 100% |

## Part B

1. 
| Step | Test type    | Users | Req/s | p(95)   | Max      | Failed | Checks |
| ---- | ------------ | ----- | ----- | ------- | -------- | ------ | ------ |
| A1   | Smoke        | 1     | 0.535 | 377.39ms | 393.47ms | 0% | 100% |
| A2   | Average load | 3     | 1.314 | 361.44ms | 393.57ms | 0% | 100% |
| A3   | Stress       | 5     | 2.17  | 365ms    | 385ms    | 0% | 100% |
| A4   | Spike        | 5     | 1.05  | 364ms    | 383ms    | 0% | 100% |
| A5   | Soak         | 2     | 0.98  | 384ms    | 424ms    | 0% | 100% |
2. Each user waits for a response and sleeps for 1 second before sending the next request. This reduces the request rate.
3. No significant increase occurred. The p(95) changed from 361.44 ms to 365 ms, so the system remained stable within the tested limit of 5 users.
4. It returned close to the normal level in about 20 seconds after the spike.
5. No. The response time stayed similar, and the error rate remained at 0%. A longer test could reveal a memory leak.
6. The average can hide slow requests. The p(95) shows the response time that 95% of requests meet or stay below.
7. Internet latency can affect response time. Also, a public server may have different workloads from other users.
8. It could overload the server, affect real users, and violate the website's terms of use.
9. Vague: The shopping app should load quickly.
- Testable: With 3 concurrent users, 95% of product searches must finish within 1 second, with less than 1% request failures.
K6 thresholds:

thresholds: {
  http_req_duration: ['p(95)<1000'],
  http_req_failed: ['rate<0.01'],
  checks: ['rate>0.99'],
}