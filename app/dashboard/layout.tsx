export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-red h-[200px] flex items-center justify-center">
      {children}
    </div>
  );
}
