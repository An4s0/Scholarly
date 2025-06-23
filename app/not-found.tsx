export default function NotFound() {
  return (
    <div className="h-[calc(100vh-70px)] flex items-center justify-center bg-zinc-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-800">404</h1>
        <p className="mt-4 text-lg text-zinc-600">Page Not Found</p>
        <p className="mt-2 text-sm text-zinc-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}