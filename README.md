# Apply Bot

> AI-powered job application assistant - describe what you want, it handles the rest.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Website](https://applybot.dev) | [Video Demo](#video-demo) | [Setup Guide](docs/setup.md) | [Issues](https://github.com/anthropics/apply-bot/issues)

---

## Video Demo

<!-- TODO: Add demo video -->
*Coming soon*

---

## Features

- **Natural Language Control** - Just describe the jobs you want
- **Real Browser Integration** - Uses your actual browser session
- **Privacy-First** - All data stored locally
- **Smart Filtering** - Whitelist/blacklist companies, skip certain jobs
- **Application Tracking** - Track all submissions in one place
- **Session Logging** - Detailed logs of AI actions and reasoning

## Quick Example

```
You: "Apply to Software Engineer positions in Vancouver posted in last 24 hours on LinkedIn"

Bot: Searches, filters, and applies automatically based on your resume and preferences.
```

## Requirements

- Node.js 21+
- Chrome/Edge browser
- MCP-compatible AI tool (Claude Desktop, Cursor, VSCode, Windsurf, etc.)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/anthropics/apply-bot.git
cd apply-bot

# Install dependencies
npm install

# Start the dashboard
npm run dev
```

See the full [Setup Guide](docs/setup.md) for detailed instructions.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js
- **Browser Automation**: Playwright MCP Server
- **AI**: Any MCP-compatible LLM

## Project Structure

```
apply-bot/
├── src/           # React frontend
├── data/          # Local data storage
│   ├── applied.json      # Application records
│   ├── knowledge.json    # AI memory
│   ├── prompts.json      # Prompt templates
│   ├── job-filters.json  # Filter settings
│   └── logs.json         # Session logs
└── server.js      # Express backend
```

## Contributing

PRs welcome! See [Contributing Guide](CONTRIBUTING.md).

## License

MIT - see [LICENSE](LICENSE)

---

**Disclaimer**: Use responsibly and comply with platform terms of service.
