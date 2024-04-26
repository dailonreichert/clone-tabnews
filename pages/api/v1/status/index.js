import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");

  const openedConectionsResult = await database.query({
    text: "select count(*)::int from pg_stat_activity where datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  const maxConnectionsResult = await database.query("show max_connections;");

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionResult.rows[0].server_version,
        opened_connections: openedConectionsResult.rows[0].count,
        max_connections: parseInt(maxConnectionsResult.rows[0].max_connections),
      },
    },
  });
}

export default status;
