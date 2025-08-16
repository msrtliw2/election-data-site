import Link from 'next/link'
import constituencies from '../../../public/data/constituencies.json'
import fs from 'node:fs'
import path from 'node:path'

export async function generateStaticParams(){
  return Object.keys(constituencies).map(id=>({id}))
}

function readResults(id){
  const p = path.join(process.cwd(),'public','data','ge2024_results.csv')
  const txt = fs.readFileSync(p,'utf-8').trim().split('\n').slice(1)
  const rows = txt.map(line => line.split(',').map(s=>s.trim()))
    .filter(r => r[0].endsWith(id));
  return rows.map(r => ({party:r[1], person:r[2], votes: Number(r[3]), share: Number(r[4]), position: Number(r[5]), elected: r[6]==='true'}));
}

export default function Page({ params }){
  const id = params.id
  const seat = constituencies[id]
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
      <p><small>Data: demo files in /public/data. Replace with real CSV/JSON later.</small></p>
    </main>
  )
}
