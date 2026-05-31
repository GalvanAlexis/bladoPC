import React, { useState, useEffect } from 'react';
import AvatarRenderer from './AvatarRenderer';
import { 
  AvatarConfig, 
  DEFAULT_AVATAR, 
  SKIN_TONES, 
  HAIR_STYLES, 
  HAIR_COLORS, 
  FACE_FEATURES, 
  EXPRESSIONS, 
  OUTFITS 
} from '@/lib/avatarConfig';
import { getAvatarState, savePlayerAvatar } from '@/lib/duelStorage';

interface AvatarCreatorProps {
  onComplete: () => void;
  onCancel?: () => void;
}

export default function AvatarCreator({ onComplete, onCancel }: AvatarCreatorProps) {
  const [config, setConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [activeTab, setActiveTab] = useState<'rostro' | 'ropa' | 'extras'>('rostro');

  useEffect(() => {
    // Cargar config existente si la hay
    const state = getAvatarState();
    if (state.avatar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfig(state.avatar);
    }
  }, []);

  const handleSave = () => {
    if (!config.name.trim()) {
      setConfig(prev => ({ ...prev, name: 'Jugador Sin Nombre' }));
    }
    savePlayerAvatar(config);
    onComplete();
  };

  const updateConfig = (key: keyof AvatarConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const renderSelector = (title: string, key: keyof AvatarConfig, options: string[]) => (
    <div className="mb-6">
      <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">{title}</h3>
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin scrollbar-thumb-crimson/50 scrollbar-track-transparent">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => updateConfig(key, opt)}
            className={`px-3 py-1.5 text-sm uppercase whitespace-nowrap border transition-colors ${
              config[key] === opt 
                ? 'border-toxic text-toxic bg-toxic/10' 
                : 'border-gray-800 text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4 select-none relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] pointer-events-none z-0" />
      
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-crimson/50 shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col md:flex-row z-10 relative">
        {/* Left Column - Preview */}
        <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-900 flex flex-col items-center justify-center bg-black/50">
          <AvatarRenderer config={config} size={220} className="mb-6" />
          
          <div className="w-full">
            <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest text-center">
              Nombre del Peleador
            </label>
            <input 
              type="text" 
              maxLength={15}
              value={config.name}
              onChange={(e) => updateConfig('name', e.target.value)}
              className="w-full bg-black border border-gray-800 text-center text-xl py-2 text-white focus:outline-none focus:border-crimson transition-colors uppercase tracking-widest"
              placeholder="Mortal"
            />
          </div>
        </div>

        {/* Right Column - Controls */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col h-[500px] md:h-auto overflow-y-auto">
          <div className="flex space-x-1 mb-8 border-b border-gray-900 pb-px">
            {(['rostro', 'ropa', 'extras'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 uppercase text-sm tracking-widest transition-colors ${
                  activeTab === tab 
                    ? 'text-white border-b-2 border-crimson bg-crimson/5' 
                    : 'text-gray-600 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {activeTab === 'rostro' && (
              <>
                {renderSelector('Tono de Piel', 'skinTone', SKIN_TONES)}
                {renderSelector('Estilo de Cabello', 'hairStyle', HAIR_STYLES)}
                {renderSelector('Color de Cabello', 'hairColor', HAIR_COLORS)}
              </>
            )}
            
            {activeTab === 'ropa' && (
              <>
                {renderSelector('Atuendo', 'outfit', OUTFITS)}
              </>
            )}
            
            {activeTab === 'extras' && (
              <>
                {renderSelector('Rasgo Facial', 'faceFeature', FACE_FEATURES)}
                {renderSelector('Expresión', 'expression', EXPRESSIONS)}
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-900 flex justify-between items-center">
            {onCancel ? (
              <button 
                onClick={onCancel}
                className="text-gray-500 hover:text-white uppercase text-sm tracking-widest transition-colors"
              >
                ← Volver
              </button>
            ) : <div />}
            
            <button 
              onClick={handleSave}
              className="bg-crimson hover:bg-red-700 text-white px-8 py-3 uppercase tracking-[0.2em] font-bold text-sm transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] border border-red-500"
            >
              ¡A Duelo!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
