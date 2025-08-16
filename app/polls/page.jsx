import Link from 'next/link'
import polls from '../../public/data/polls.json'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Legend, Tooltip, CategoryScale } from 'chart.js'
ChartJS.register(LineElement, PointElement, LinearScale, Legend, Tooltip, CategoryScale);

export default function Page(){
  const parties = ['LAB','CON','REF','LD','GRN']
  const labels = polls.map(p=>p.fieldwork_end)
  const datasets = parties.map(party => ({
    label: party,
    data: polls.map(p => p.shares[party] ?? null),
    borderWidth: 2,
    fill: false
  }))
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/">← Back</Link>
      <h1>Polling (demo)</h1>
      <Line data={{ labels, datasets }} />
      <table>
        <thead><tr><th>Pollster</th><th>End</th><th>Sample</th><th>LAB</th><th>CON</th><th>REF</th><th>LD</th><th>GRN</th></tr></thead>
        <tbody>
          {polls.map((p,i)=>(
            <tr key={i}>
              <td>{p.pollster}</td><td>{p.fieldwork_end}</td><td>{p.sample}</td>
              <td>{p.shares.LAB}</td><td>{p.shares.CON}</td><td>{p.shares.REF}</td><td>{p.shares.LD}</td><td>{p.shares.GRN}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><small>Replace /public/data/polls.json with your real data later.</small></p>
    </main>
  )
}
