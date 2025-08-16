
# election-data.io starter (no backend)

## What this is
A working Next.js site with three sections:
- Constituency results pages
- Polls page with a line chart
- Research Hub by-election page

All data lives in `/public/data` (CSV/JSON). Replace the demo files with your real ones.

## How to deploy
1) Push this folder to a new GitHub repo
2) Go to vercel.com/new → Import your repo → Deploy
3) Add your custom domain in Vercel → follow the DNS prompts

## How to update data
- Edit `public/data/ge2024_results.csv` for results
- Edit `public/data/constituencies.json` for seat names
- Edit `public/data/polls.json` for polls
- Edit `public/data/by_elections.json` for by-elections

Vercel redeploys automatically when you push changes.
