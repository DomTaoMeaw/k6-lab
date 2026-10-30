import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const url = 'https://quickpizza.grafana.com/api/pizza';

  const payload = JSON.stringify({
    mustBeVegetarian: true,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token abcdef0123456789',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'pizza name is defined': (r) => r.json('pizza.name') !== undefined,
    'all ingredients are vegetarian': (r) =>
      r.json('pizza.ingredients').every((ingredient) => ingredient.vegetarian === true),
  });

  sleep(1);
}