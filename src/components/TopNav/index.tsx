import Link from "next/link"

export const TopNav = () => {
  return (
    <div className="border-b border-white/[0.08] mb-8 px-[50px] md:px-[80px]">
      <div className="flex items-center h-[70px] relative">
        <Link href="/">
          <span className="text-lg text-white">Realtime Manager</span>
        </Link>
      </div>
    </div>
  )
}