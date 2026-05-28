import Link from 'next/link';

export default function CebarMatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black font-mono px-4 text-center">
      <div className="border border-sulfur/50 p-8 rounded-lg shadow-[0_0_30px_rgba(147,51,234,0.3)] max-w-xl">
        <h1 className="text-3xl font-bold text-sulfur mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]">
          Cebador de Mate
        </h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          El agua se está calentando y Blado está buscando la yerba en los rincones más oscuros de la biblioteca...
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
