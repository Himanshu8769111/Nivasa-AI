import React, { useState, useEffect } from 'react';
import { Sparkles, Mic, MicOff, Send, Cpu, Volume2, ArrowRight } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import { ImpactPreviewModal } from '../components/ImpactPreviewModal';

export const AICommandView: React.FC = () => {
  const { runNLCommand, currentPlan, setCurrentPlan } = useLivingOS();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const presetQueries = [
    "I am leaving for two hours.",
    "I am going to sleep.",
    "Make the house energy efficient.",
    "Prepare the room for studying.",
    "Turn everything off except what is necessary.",
    "What is wasting electricity right now?",
    "Why is my energy usage higher tonight?"
  ];

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const handleVoiceToggle = () => {
    if (!speechSupported) {
      alert("Web Speech API is not supported in this browser engine, switching to natural text fallback mode.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleExecuteQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleExecuteQuery = (query: string) => {
    if (!query.trim()) return;
    runNLCommand(query);
    setInputText('');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Conversational Reasoning Engine
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">AI Command Center</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            "Your home should understand you, not just obey you."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Console & Sample Queries */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-indigo-500/30 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" /> Gemma Local Intent Engine
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {isListening ? 'Listening Voice...' : 'Ready'}
              </span>
            </div>

            {isListening && (
              <div className="flex items-center justify-center gap-2 py-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/40">
                <Volume2 className="w-6 h-6 text-cyan-400 animate-bounce" />
                <div className="flex items-end gap-1.5 h-8">
                  <span className="w-1.5 bg-cyan-400 rounded-full animate-pulse h-5"></span>
                  <span className="w-1.5 bg-indigo-400 rounded-full animate-pulse h-8" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 bg-emerald-400 rounded-full animate-pulse h-4" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 bg-cyan-400 rounded-full animate-pulse h-7" style={{ animationDelay: '0.3s' }}></span>
                </div>
                <span className="text-xs font-mono text-cyan-300 ml-2">Listening to speech...</span>
              </div>
            )}

            <form 
              onSubmit={(e) => { e.preventDefault(); handleExecuteQuery(inputText); }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or speak e.g. 'I am going to sleep'..."
                className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-sm rounded-2xl px-4 py-3.5 border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isListening
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700'
                }`}
                title="Trigger Voice Microphone"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold p-3.5 rounded-2xl transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              TRY SAMPLE NATURAL INTENTS
            </h3>

            <div className="flex flex-col gap-2.5">
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExecuteQuery(q)}
                  className="text-left bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 p-3.5 rounded-2xl text-xs md:text-sm text-slate-200 font-medium transition-all flex items-center justify-between group"
                >
                  <span>"{q}"</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Proposed Action Plan & Impact Preview */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {currentPlan ? (
            <ImpactPreviewModal 
              plan={currentPlan} 
              onClose={() => setCurrentPlan(null)} 
            />
          ) : (
            <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white">Select or Type an Intent</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                NIVASA AI will reason over your home's digital twin, formulate a multi-device plan, and calculate an Impact Preview.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
