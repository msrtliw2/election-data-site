import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'

function readJSON(rel) {
  const p = path.join(process.cwd(), 'public', 'data', rel)
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

export async function generateStaticParams() {
  const byes = readJSON('by_elections.json')
  return Object.keys(byes).map(id => ({ id }))
}

export default function Page({ params }) {
  const id = params.id
  const byes = readJSON('by_elections.json')
  const seats = readJSON('constituencies.json')
  const seat = seats[id]
  const item = byes[id]

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/">← Back</Link>
      <h1>By-election toolkit</h1>
      <h2>{seat?.name} ({id})</h2>
      <p><b>Cause:</b> {item?.cause} — <b>Status:</b> {item?.status}</p>
      <h3>Candidates</h3>
      <ul>
        {item?.candidates?.map((c,i)=>(<li key={i}>{c.name} — {c.party}</li>))}
      </ul>
      <p><small>Data from /public/data/*.json — replace later with real feeds.</small></p>
    </main>
  )
}
