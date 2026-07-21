import './globals.css';

export const metadata = {
  title: 'SCM - Software de Creación de Materiales',
  description: 'Motor heurístico para el descubrimiento de polímeros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
