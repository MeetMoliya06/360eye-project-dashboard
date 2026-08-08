import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Gamepad2, Check, ExternalLink } from 'lucide-react';
import { STATUS_LABELS } from '../data/projects';

const Cartridge = ({ project, tiltAngle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [animatingPass, setAnimatingPass] = useState(false);

  const handleReveal = () => {
    setAnimatingPass(true);
    setShowPassword(!showPassword);
    setTimeout(() => setAnimatingPass(false), 300); // match css animation duration
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  // Convert "COMPLETE" to status-complete class name format
  const statusClass = `status-${project.status.toLowerCase().replace(' ', '')}`;

  return (
    <div 
      className="cartridge w-full h-full max-w-sm mx-auto flex flex-col group relative"
      style={{ 
        transform: `rotate(${tiltAngle}deg)`, 
        transformOrigin: 'bottom center'
      }}
    >
      {/* Top sticker color bleed */}
      <div 
        className="h-2 w-full absolute top-0 left-0 rounded-t-lg z-0" 
        style={{ backgroundColor: project.labelColor, opacity: 0.15 }}
      ></div>

      <div className="p-5 flex flex-col h-full z-10">
        
        {/* Cartridge Header Info */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
             <div className="cart-number" style={{ backgroundColor: project.labelColor }}>
               #{project.id}
             </div>
             <div className="font-pixel text-[8px] text-muted uppercase tracking-widest mt-1">
               {project.year} REL.
             </div>
          </div>
          <div className={`status-badge ${statusClass}`}>
            {STATUS_LABELS[project.status]}
          </div>
        </div>

        {/* Thumbnail / Label Area */}
        <div 
          className="cartridge-label w-full aspect-video bg-charcoal-hi mb-4 flex items-center justify-center group-hover:border-opacity-100 transition-colors"
          style={{ borderColor: project.accentColor }}
        >
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
             <div className="font-pixel text-muted text-xs flex flex-col items-center gap-2">
                <Gamepad2 size={24} />
                <span>NO DISC</span>
             </div>
          )}
        </div>

        {/* Title & Credits */}
        <div className="mb-4 flex-grow">
          <h3 
            className="font-pixel text-lg mb-2 truncate" 
            style={{ color: project.labelColor, textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}
          >
            {project.title}
          </h3>
          <p className="font-body text-xs text-ivory font-medium mb-1">
            {project.subtitle}
          </p>
          <p className="font-pixel text-[7px] text-muted tracking-wide uppercase">
            DEV: <span className="text-cream">{project.developer}</span>
          </p>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.genres.map(genre => (
            <span key={genre} className="genre-chip" style={{ borderColor: project.accentColor }}>
              {genre}
            </span>
          ))}
        </div>

        {/* Cheat Code Panel (Credentials) */}
        <div className="cheat-panel mt-auto relative">
          <div className="cheat-panel-label mb-2 flex items-center gap-1">
             <Gamepad2 size={10} className="text-mustard" /> CHEAT CODES
          </div>
          
          {/* Project ID */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[9px] text-muted uppercase mr-2">SYS.ID</span>
              <span className="text-cream">{project.projectId}</span>
            </div>
            <button 
              onClick={() => copyToClipboard(project.projectId, 'id')}
              className="text-muted hover:text-mustard transition-colors relative"
              title="Copy ID"
            >
              {copiedId ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
              {copiedId && <span className="copied-popup">COPIED!</span>}
            </button>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[9px] text-muted uppercase mr-2">SYS.PW</span>
              
              <div className="relative overflow-hidden w-24">
                 {/* The actual password */}
                 <span className={`text-cream absolute inset-0 ${showPassword ? (animatingPass ? 'password-reveal-anim' : 'opacity-100') : 'opacity-0'} pointer-events-none`}>
                   {project.password}
                 </span>
                 {/* The dots */}
                 <span className={`password-dots absolute inset-0 ${!showPassword ? (animatingPass ? 'password-hide-anim' : 'opacity-100') : 'opacity-0'} pointer-events-none`}>
                   ••••••••
                 </span>
                 {/* Spacer to keep height */}
                 <span className="opacity-0">{project.password}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleReveal}
                className="flex items-center justify-center text-muted hover:text-coral transition-colors"
                title={showPassword ? "Hide Password" : "Insert Coin to Reveal"}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button 
                onClick={() => copyToClipboard(project.password, 'pass')}
                className="text-muted hover:text-mustard transition-colors relative"
                title="Copy Password"
              >
                {copiedPass ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
                {copiedPass && <span className="copied-popup">COPIED!</span>}
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <div className="cartridge-connector-pins">
         {Array.from({ length: 15 }).map((_, i) => (
           <span key={i} style={{ opacity: Math.random() * 0.5 + 0.3 }}></span>
         ))}
      </div>
    </div>
  );
};

export default Cartridge;
