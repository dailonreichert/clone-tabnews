import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowdMethod = ["GET", "POST"];

  if (!allowdMethod.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} not allowd`,
    });
  }

  const dbClient = await database.getNewClient();

  try {
    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);

      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }

    return response.status(405).end();
  } catch (error) {
    console.error(error);

    throw error;
  } finally {
    await dbClient.end();
  }
}
