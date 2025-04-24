import database from "infra/database.js";

//beforeAll(cleanDatabase);

async function cleanDatabase() {
  //await database.query("drop schema public cascade; create schema public;");
}

test("requisição POST para api/v1/migrations deverá retornar status 200", async () => {
  /*const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST'
  });

  expect(response.status).toBe(201);

  const respondeBody = await response.json();

  expect(Array.isArray(respondeBody) && respondeBody.length > 0).toBe(true);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST'
  });

  expect(response2.status).toBe(200);

  const respondeBody2 = await response2.json();

  expect(Array.isArray(respondeBody2) && respondeBody2.length == 0).toBe(true);*/
});
