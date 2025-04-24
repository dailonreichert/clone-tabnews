import { Client } from "pg";

async function query(queryObject) {
  const client = await getNewClient();

  try {
    return await client.query(queryObject);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

function getSslValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV == "production" ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: String(process.env.POSTGRES_PASSWORD),
    ssl: getSslValues(),
  });

  await client.connect();

  return client;
}

export default {
  query,
  getNewClient,
};
