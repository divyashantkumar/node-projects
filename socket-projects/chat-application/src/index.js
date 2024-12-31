import { server } from "./app.js";

const PORT = process.env.PORT || 3000;



server.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server is running on localhost AND listening on port " + PORT)
});
