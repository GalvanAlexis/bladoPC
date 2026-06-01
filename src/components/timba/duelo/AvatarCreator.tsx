import React, { useState, useEffect } from 'react';
import AvatarRenderer from './AvatarRenderer';
import { 
  AvatarConfig, 
  DEFAULT_AVATAR, 
  WarriorClass,
  WARRIOR_CLASSES,
  WARRIOR_EMOJIS
} from '@/lib/avatarConfig';
import { getAvatarState, savePlayerAvatar } from '@/lib/duelStorage';

interface AvatarCreatorProps {
  onComplete: () => void;
  onCancel?: () => void;
}

export default function AvatarCreator({ onComplete, onCancel }: AvatarCreatorProps) {
  const [config, setConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [step, setStep] = useState<'class' | 'name'>('class');

  useEffect(() => {
    const state = getAvatarState();
    if (state.avatar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfig(state.avatar);
    }
  }, []);

  const handleSelectClass = (wClass: WarriorClass) => {
    setConfig(prev => ({
      ...prev,
      warriorClass: wClass,
      ...WARRIOR_CLASSES[wClass]
    }));
  };

  const handleSave = () => {
    if (!config.name.trim()) {
      setConfig(prev => ({ ...prev, name: 'Jugador Sin Nombre' }));
    }
    savePlayerAvatar(config);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4 select-none relative w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] pointer-events-none z-0" />
      
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-crimson/50 shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col z-10 relative">
        <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-black/50 border-b border-gray-900">
          <AvatarRenderer config={config} size={200} className="mb-4" />
          <h2 className="text-xl text-crimson uppercase tracking-[0.2em] font-bold">
            {config.warriorClass ? config.warriorClass : 'Personalizado'}
          </h2>
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          {step === 'class' ? (
            <>
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4 text-center">Selecciona tu Clase de Guerrero</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {(Object.keys(WARRIOR_CLASSES) as WarriorClass[]).map(wClass => (
                  <button
                    key={wClass}
                    onClick={() => handleSelectClass(wClass)}
                    className={`flex flex-col items-center justify-center p-4 border transition-all ${
                      config.warriorClass === wClass
                        ? 'border-toxic bg-toxic/10 scale-105'
                        : 'border-gray-800 hover:border-gray-500 hover:bg-gray-900'
                    }`}
                  >
                    <span className="text-3xl mb-2">{WARRIOR_EMOJIS[wClass]}</span>
                    <span className={`uppercase text-xs tracking-wider ${config.warriorClass === wClass ? 'text-toxic font-bold' : 'text-gray-400'}`}>
                      {wClass}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center mt-auto">
                {onCancel ? (
                  <button onClick={onCancel} className="text-gray-500 hover:text-white uppercase text-sm tracking-widest transition-colors">
                    ← Volver
                  </button>
                ) : <div></div>}
                <button 
                  onClick={() => setStep('name')}
                  className="bg-crimson hover:bg-red-700 text-white px-8 py-3 uppercase tracking-[0.2em] font-bold text-sm transition-all border border-red-500"
                >
                  Siguiente →
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-8 text-center">Bautiza a tu Campeón</h3>
              <div className="w-full max-w-md mx-auto mb-12">
                <input 
                  type="text" 
                  maxLength={15}
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black border border-gray-800 text-center text-2xl py-4 text-white focus:outline-none focus:border-crimson transition-colors uppercase tracking-widest"
                  placeholder="Tu Nombre"
                  autoFocus
                />
              </div>
              <div className="flex justify-between items-center mt-auto">
                <button onClick={() => setStep('class')} className="text-gray-500 hover:text-white uppercase text-sm tracking-widest transition-colors">
                  ← Atrás
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-crimson hover:bg-red-700 text-white px-8 py-3 uppercase tracking-[0.2em] font-bold text-sm transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] border border-red-500"
                >
                  ¡A Duelo!
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
