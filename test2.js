// api/trigger-workflow.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    //if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const { filename, content } = req.body;

    const repoOwner = "eXeCutieTTV";
    const repoName = "mangalist";
    const workflowId = "upload-generated-file.yml";
    const token = process.env.GH_TOKEN; // stored safely on server
    console.log(token);

    const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/dispatches`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ref: "main",
                inputs: { filename, content },
            }),
        }
    );

    const json = await response.json();
    res.status(response.ok ? 200 : 500).json(json);
}
