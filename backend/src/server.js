import app from "./app.js";
import { port } from "./config.js";

// listeing the server
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
