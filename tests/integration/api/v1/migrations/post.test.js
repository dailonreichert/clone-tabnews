test("requisição POST para api/v1/migrations deverá retornar status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: 'POST'
  });

  expect(response.status).toBe(200);

  const respondeBody = await response.json();

  console.log(respondeBody);

  expect(Array.isArray(respondeBody)).toBe(true);
});
