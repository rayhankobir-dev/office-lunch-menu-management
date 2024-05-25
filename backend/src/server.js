import app from "./app.js";
import { port } from "./config.js";
import { connectDB } from "./helpers/db.js";

// listeing the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
