// backend/insightsService.js

const { DgraphClientStub, DgraphClient, Operation, Query } = require("dgraph-js");
const grpc = require("grpc");

// Initialize Dgraph client
const stub = new DgraphClientStub("localhost:9080", grpc.credentials.createInsecure());
const dgraphClient = new DgraphClient(stub);

/**
 * Fetch CNC machine performance insights from Dgraph
 * @returns {Promise<Object>} Aggregated CNC insights
 */
const getCNCInsights = async () => {
  const query = `
    {
      insights(func: has(machine_status)) {
        uid
        machine_name
        total_runtime
        total_errors
        last_maintenance
      }
    }
  `;

  const txn = dgraphClient.newTxn();
  try {
    const res = await txn.query(query);
    const insights = res.getJson();
    return insights;
  } catch (error) {
    console.error("Error querying Dgraph:", error);
    throw error;
  } finally {
    await txn.discard();
  }
};

module.exports = { getCNCInsights };
