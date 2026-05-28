import Link from 'next/link';

export default function TimbaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black font-mono px-4 text-center">
      <div className="border border-crimson/50 p-8 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] max-w-xl">
        <h1 className="text-3xl font-bold text-crimson mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          Timba Arcana
        </h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Los dados del destino aún se están tallando y las cartas se están pintando con tinta de demonio...
          <br /><br />
          <span className="text-toxic">Este módulo está en construcción.</span>
        </p>
        <Link 
          href="/"
          className="inline-block border border-toxic text-toxic px-6 py-2 rounded uppercase tracking-widest text-sm hover:bg-toxic/10 transition-colors"
        >
          Volver a la caverna
        </Link>
      </div>
    </div>
  );
}
