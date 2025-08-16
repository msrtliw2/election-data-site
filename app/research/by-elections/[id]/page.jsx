import Link from 'next/link'
import data from '../../../public/data/by_elections.json'
import constituencies from '../../../public/data/constituencies.json'

export async function generateStaticParams(){
  return Object.keys(data).map(id=>({id}))
}

export default function Page({ params }){
  const id = params.id
  const seat = constituencies[id]
  const item = data[id]
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
      <p><small>Replace /public/data/by_elections.json with real feed later.</small></p>
    </main>
  )
}
