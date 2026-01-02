const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const GITHUB_TOKEN = "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"; // keep this secret
const REPO_OWNER = "eXeCutieTTV";
const REPO_NAME = "mangalist";
const WORKFLOW_FILE = "create-js-file.yml";
const BRANCH = "main";

app.post("/create-js", async (req, res) => {
    const { filename, content } = req.body;

    try {
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `token ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ref: BRANCH,
                    inputs: { filename, content }
                })
            }
        );

        if (response.ok) {
            res.json({ success: true, message: `Workflow triggered for ${filename}` });
        } else {
            const text = await response.text();
            res.status(response.status).json({ success: false, message: text });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
