test("requisição GET para api/v1/status deverá retornar status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
});

test("valida os valores da requisição GET para api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const updatedAtISO = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();

  expect(responseBody.updated_at).toEqual(updatedAtISO);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});
