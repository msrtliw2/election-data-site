import './styles/globals.css'
export const metadata = { title: 'election-data.io starter' }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
