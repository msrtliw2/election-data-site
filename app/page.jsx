export default function Page() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1>election-data.io (starter)</h1>
      <p>Three sections:</p>
      <ol>
        <li><a href="/constituencies/E14000530">Election Data</a></li>
        <li><a href="/polls">Polling</a></li>
        <li><a href="/research/by-elections/E14000530">Research Hub</a></li>
      </ol>
      <p>Use the postcode bar soon. For now pick a constituency from data.</p>
    </main>
  );
}
