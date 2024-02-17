const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const server = require("http").Server(app);

app.use(
	rateLimit({
		windowMs: 30000, // 30 seconds
		max: 500,
		message: "You exceeded the rate limit.",
		headers: true,
	})
);

app.use(cors());

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});
// app.get("/port", (req, res) => {
// 	res.send(process.env.PORT);
// });

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
