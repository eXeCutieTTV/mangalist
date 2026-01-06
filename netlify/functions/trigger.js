// Netlify Node 18+ function
const fetch = (...args) => import('node-fetch').then(m => m.default(...args));

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
        }

        const body = JSON.parse(event.body || '{}');
        const { filename, content } = body || {};
        if (!filename || typeof content !== 'string') {
            return { statusCode: 400, body: JSON.stringify({ message: 'filename and content required' }) };
        }

        const base = filename.split('/').pop();
        const safe = base.replace(/[^A-Za-z0-9._-]/g, '_');
        const finalName = safe.endsWith('.js') ? safe : safe + '.js';

        const payload = {
            ref: 'main',
            inputs: { filename: finalName, content: content }
        };

        const OWNER = process.env.GH_OWNER;
        const REPO = process.env.GH_REPO;
        const WORKFLOW = process.env.GH_WORKFLOW || 'upload-generated-file.yml';
        const TOKEN = process.env.GH_TOKEN;

        if (!OWNER || !REPO || !TOKEN) {
            return { statusCode: 500, body: JSON.stringify({ message: 'Server not configured' }) };
        }

        const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW}/dispatches`;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (resp.status === 204) {
            return { statusCode: 200, body: JSON.stringify({ message: 'Workflow dispatch accepted' }) };
        }

        const text = await resp.text();
        return { statusCode: resp.status, body: JSON.stringify({ message: 'GitHub API error', detail: text }) };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Server error', error: err.message }) };
    }
};
