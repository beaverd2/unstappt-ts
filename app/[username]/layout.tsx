export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <div className="container mx-auto mt-4 grid grid-cols-2 gap-4 px-4">{children}</div>
}
