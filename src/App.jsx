import React from 'react';
import { PROJECTS } from './data/projects';
import Cartridge from './components/Cartridge';
import { Gamepad2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--charcoal)]">
      
      {/* HEADER: Compact, Full-Width Console Header */}
      <header className="w-full relative z-20 border-b border-[rgba(232,184,75,0.2)] bg-[var(--charcoal-mid)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="w-full px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-12">
            
            {/* Branding / Title */}
            <div className="flex items-center gap-4 shrink-0">
              <Gamepad2 size={32} className="text-mustard blink" />
              <div>
                <h1 className="font-pixel text-xl md:text-2xl text-mustard tracking-wide uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] leading-tight">
                  SELECT PROJECT
                </h1>
                <p className="font-mono text-[10px] md:text-xs text-muted mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(58,181,168,0.8)]"></span>
                  SYS_VER: 4.0.1 // STATUS: ONLINE
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN SHELF GRID */}
      <main className="flex-grow w-full relative z-10 px-4 md:px-8 py-8 md:py-12">
        {PROJECTS.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <Gamepad2 size={48} className="text-charcoal-hi mb-4" />
             <h2 className="font-pixel text-mustard mb-2 text-xl">NO DATA FOUND</h2>
             <p className="font-mono text-muted text-xs">ARCHIVE IS EMPTY</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 items-stretch perspective-1000">
            {PROJECTS.map((project) => {
              // Generate a stable random micro-tilt for each cartridge (-1 to +1 deg)
              // We use project.id as a seed to keep it stable across renders
              const pseudoRandom = Math.sin(project.id * 999) * 10000;
              const tiltAngle = (pseudoRandom - Math.floor(pseudoRandom)) * 2 - 1; 

              return (
                <div key={project.id} className="shelf-row h-full">
                  <Cartridge 
                    project={project} 
                    tiltAngle={tiltAngle} 
                  />
                </div>
              )
            })}
          </div>
        )}
      </main>

    </div>
  );
}

export default App;
