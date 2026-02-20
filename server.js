import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const GH_TOKEN = process.env.GH_TOKEN;
const UPDATE_KEY = process.env.UPDATE_KEY || "";
const REPO_OWNER = process.env.GH_REPO_OWNER || "eXeCutieTTV";
const REPO_NAME = process.env.GH_REPO_NAME || "mangalist";
const GENERATED_FOLDER = process.env.GH_FOLDER || "generated";

if (!GH_TOKEN) {
    throw new Error("Missing GH_TOKEN in .env");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(express.static(__dirname));

function githubHeaders(extraHeaders = {}) {
    return {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GH_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...extraHeaders
    };
}

async function githubRequest(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: githubHeaders(options.headers || {})
    });

    const raw = await response.text();
    let data = null;
    try {
        data = raw ? JSON.parse(raw) : null;
    } catch {
        data = raw;
    }

    if (!response.ok) {
        const message = data?.message || response.statusText || "Unknown GitHub API error";
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

function parseGeneratedTimestamp(name) {
    const match = name.match(/^generated_(\d+)\.json$/);
    return match ? Number(match[1]) : -1;
}

app.get("/api/generated/latest", async (_req, res) => {
    try {
        const listUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${GENERATED_FOLDER}`;
        const files = await githubRequest(listUrl);

        if (!Array.isArray(files)) {
            return res.status(500).json({ message: "Unexpected GitHub response for generated folder" });
        }

        const newest = files
            .filter((file) => file.name.endsWith(".json"))
            .sort((a, b) => parseGeneratedTimestamp(b.name) - parseGeneratedTimestamp(a.name))[0];

        if (!newest) {
            return res.status(404).json({ message: "No generated JSON files found" });
        }

        const fileData = await githubRequest(newest.url);
        if (typeof fileData?.content !== "string") {
            return res.status(500).json({ message: "Invalid file payload from GitHub" });
        }

        const decoded = Buffer.from(fileData.content, "base64").toString("utf8");
        const parsed = JSON.parse(decoded);

        return res.json({
            name: newest.name,
            data: parsed
        });
    } catch (error) {
        return res
            .status(error.status || 500)
            .json({ message: error.message || "Failed to fetch latest generated file" });
    }
});

app.post("/api/generated", async (req, res) => {
    try {
        if (!UPDATE_KEY) {
            return res.status(500).json({ message: "Server update key is not configured" });
        }

        const providedKey = req.header("x-update-key");
        if (providedKey !== UPDATE_KEY) {
            return res.status(401).json({ message: "Invalid updater key" });
        }

        const payload = req.body?.data;
        if (!payload || typeof payload !== "object") {
            return res.status(400).json({ message: "Invalid request body: expected JSON object in data" });
        }

        const timestamp = Date.now();
        const filename = `generated_${timestamp}.json`;
        const content = JSON.stringify(payload, null, 2);
        const encodedContent = Buffer.from(content, "utf8").toString("base64");
        const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${GENERATED_FOLDER}/${filename}`;

        const result = await githubRequest(fileUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Add ${filename}`,
                content: encodedContent
            })
        });

        return res.json({
            ok: true,
            filename,
            commitSha: result?.commit?.sha || null
        });
    } catch (error) {
        return res
            .status(error.status || 500)
            .json({ message: error.message || "Failed to write generated file" });
    }
});

app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`mangalist server listening on http://localhost:${PORT}`);
});
