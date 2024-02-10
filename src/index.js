import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";

const PORT = process.env.PORT || 8080;

async function main() {
  await createAdminUser();
  app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });

  console.log("Environment:", process.env.NODE_ENV);
}

main();
