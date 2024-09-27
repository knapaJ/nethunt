import { d as db, g as gameIdByNaturalId } from './node-map-DHryaG8P.js';

async function getLoggedInUser(cookies) {
  const cookieUser = cookies.get("user");
  if (!cookieUser) return null;
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ username: cookieUser });
  if (!user) return null;
  return user;
}
async function createUser(username, password) {
  const userCollection = db.collection("users");
  const existingUser = await userCollection.findOne({ username });
  if (existingUser) return false;
  await userCollection.insertOne({ username, password, solved_fw: [], solved_nodes: [], found_nodes: [], visible_nodes: ["1"] });
  return true;
}
async function checkLoginUser(username, password) {
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ username, password });
  return !!user;
}
async function addToVisibleNodes(username, node_id) {
  const userCollection = db.collection("users");
  await userCollection.updateOne({ username }, { $push: { visible_nodes: node_id } });
}
async function solvedNode(node, username, firewall = false) {
  for (const neighbor_natural_id of node.neighbours) {
    const neighbor_id = await gameIdByNaturalId(neighbor_natural_id);
    if (!neighbor_id) throw new Error("Neighbor not found");
    await addToVisibleNodes(username, neighbor_id);
  }
  if (firewall) {
    const userCollection = db.collection("users");
    await userCollection.updateOne({ username }, { $push: { solved_fw: await gameIdByNaturalId(node.natural_id) } });
  } else {
    const userCollection = db.collection("users");
    await userCollection.updateOne({ username }, { $push: { solved_nodes: node.natural_id } });
  }
}

export { createUser as a, checkLoginUser as c, getLoggedInUser as g, solvedNode as s };
//# sourceMappingURL=user-DHoF0IZE.js.map
