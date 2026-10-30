
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'https://quickpizza.grafana.com/api/pizza';
  const payload = JSON.stringify({ mustBeVegetarian: true });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    responseCallback: http.expectedStatuses(401),
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 401': (r) => r.status === 401,
  });

  sleep(1);
}
