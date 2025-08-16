import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'

function readJSON(rel) {
  const p = path.join(process.cwd(), 'public', 'data', rel)
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}
function readResults(id) {
  const p = path.join(process.cwd(), 'public', 'data', 'ge2024_results.csv')
  const rows = fs.readFileSync(p,'utf-8').trim().split('\n').slice(1)
    .map(line => line.split(',').map(s=>s.trim()))
    .filter(r => r[0].endsWith(id))
    .map(r => ({ party:r[1], person:r[2], votes:+r[3], share:+r[4], position:+r[5], elected:r[6]==='true' }))
  return rows
}

export async function generateStaticParams() {
  const seats = readJSON('constituencies.json')
  return Object.keys(seats).map(id => ({ id }))
}

export default function Page({ params }) {
  const id = params.id
  const seats = readJSON('constituencies.json')
  const seat = seats[id]
  const res = readResults(id)
  const winner = res.find(r=>r.position===1)

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/">← Back</Link>
      <h1>{seat?.name} ({id})</h1>
      {winner && <p><b>Winner:</b> {winner.person} ({winner.party}) — {winner.share}%</p>}
      <table>
        <thead><tr><th>Party</th><th>Candidate</th><th>Votes</th><th>Share</th><th>Position</th></tr></thead>
        <tbody>
          {res.sort((a,b)=>a.position-b.position).map((r,i)=>(
            <tr key={i}><td>{r.party}</td><td>{r.person}</td><td>{r.votes}</td><td>{r.share}%</td><td>{r.position}</td></tr>
          ))}
        </tbody>
      </table>
      <p><small>Demo data lives in /public/data.</small></p>
    </main>
  )
}
