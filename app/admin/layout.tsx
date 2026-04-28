export const metadata = { title: "Admin — Partner Livingku" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`*{box-sizing:border-box}body{margin:0}button{font-family:inherit}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
