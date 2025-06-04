interface ChartErrorProps {
  message?: string;
}
export function ChartError({ message = "No se pudieron cargar los datos del gráfico." }: ChartErrorProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-red-500 p-4">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <p className="font-semibold">Error</p>
      <p>{message}</p>
    </div>
  );
}