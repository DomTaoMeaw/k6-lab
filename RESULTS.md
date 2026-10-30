# K6 lab results

## Part 0

- Step 0.1, http_req_duration: **278.83 ms** (avg and p(95))
- Step 0.2, requests, rate and p(95), and why the rate stays below 5: 80 requests, 3.81 req/s, p(95) = 268.97 ms. The rate stays below 5 because each VU waits for the HTTP response and then sleeps for 1 second before starting the next iteration.
- Step 0.3, iterations: 20 iterations shared among 5 VUs. All 20 iterations completed successfully in 5.7 seconds. Checks passed 100%, with an average response time of 257.96 ms and p(95) of 265.70 ms.
- Step 0.4, Pizza API: POST request with Authorization token returned HTTP 200. All 3 checks passed (100%). The pizza name was defined and all ingredients were vegetarian. Average response time was 348.31 ms.
- Step 0.5, No Token: The API returned HTTP 401 when the Authorization token was missing. The status check passed (100%), and http_req_failed was 0.00% because 401 was configured as an expected status. Average response time was 270.6 ms.
- Step 0.6, Thresholds: With the default P95 threshold of 1500 ms, the test passed with an actual P95 of 253.76 ms and exit code 0. I then reduced the threshold to 300 ms. The test still passed because the actual P95 was 258.29 ms, which was below 300 ms. Both runs had 100% checks and 0% failed requests.
- Step 0.7, rules that passed, p(95), p(99), exit code after your change:
- Step 0.8, what was wrong, and how the checks showed it:

## Part A results

| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
| ---- | ------------ | ----- | ----- | ----- | --- | ------ | ------ |
| A1 | Smoke | 1 | | | | | |
| A2 | Average load | 3 | | | | | |
| A3 | Stress | 5 | | | | | |
| A4 | Spike | 5 | | | | | |
| A5 | Soak | 2 | | | | | |

## Part B

1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 
9.