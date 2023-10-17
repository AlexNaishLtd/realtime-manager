
export default function MissingPage() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mt-10 text-white lg:mt-0"><div className="font-medium text-8xl">404</div>
          <div className="mt-5 text-xl font-medium lg:text-3xl">Ah. This page has gone missing.</div>
          <button onClick={() => window.history.back()} className="transition duration-200 border rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none px-4 py-3 mt-10 text-white border-white hover:bg-white hover:text-primary">Back to Home</button>
        </div>
      </div>
    </div>
  )
}