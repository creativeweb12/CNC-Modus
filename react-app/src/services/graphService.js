// backend/graphService.js

const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost:7687',  // Default Neo4j connection
  neo4j.auth.basic('neo4j', 'password')  // Replace with your credentials
);

const session = driver.session();

// Function to add CNC data into the knowledge graph
async function addCNCEvent(machine, status, command) {
  try {
    const result = await session.run(
      `
      MERGE (m:Machine {name: $machine})
      CREATE (e:Event {status: $status, command: $command, timestamp: timestamp()})
      MERGE (m)-[:PERFORMED]->(e)
      `,
      { machine, status, command }
    );
    console.log('CNC Event Recorded:', result.summary.counters);
  } catch (error) {
    console.error('Error adding CNC event:', error);
  }
}

// Function to fetch insights from the knowledge graph
async function fetchInsights() {
  try {
    const result = await session.run(
      `
      MATCH (m:Machine)-[:PERFORMED]->(e:Event)
      RETURN m.name AS machine, e.status AS status, e.command AS command, e.timestamp AS timestamp
      ORDER BY e.timestamp DESC LIMIT 10
      `
    );
    return result.records.map(record => ({
      machine: record.get('machine'),
      status: record.get('status'),
      command: record.get('command'),
      timestamp: record.get('timestamp').low,
    }));
  } catch (error) {
    console.error('Error fetching insights:', error);
  }
}

module.exports = { addCNCEvent, fetchInsights };
