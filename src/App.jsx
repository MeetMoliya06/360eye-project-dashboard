import { useState } from 'react';
import { Check, Copy, Unlock } from 'lucide-react';
import { PROJECTS } from './data/projects';

function App() {
  return (
    <div className="app-shell">
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="page-wrap">
        <header className="header-shell">
          <div className="header-row">
            <div>
              <p className="eyebrow">Showcase360 Systems</p>
              <h1>SELECT PROJECT - 360EYE ARCHIVE</h1>
            </div>
            <a className="logout-button" href="/logout">
              <Unlock size={14} />
              LOCK
            </a>
          </div>
          <div className="pixel-divider" />
        </header>

        <main className="main-shell">
          <div className="meta-row">
            <span>{PROJECTS.length} PROJECTS READY</span>
          </div>

          <section className="cartridge-grid" aria-label="Project shelf">
            {PROJECTS.map((project) => (
              <CartridgeCard key={project.projectId} project={project} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

function CartridgeCard({ project }) {
  const [copied, setCopied] = useState('');

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.clearTimeout(copy.timer);
      copy.timer = window.setTimeout(() => setCopied(''), 1200);
    } catch {
      setCopied('');
    }
  };

  return (
    <article className={`cartridge-shell tone-${project.tone}`}>
      <div className="cartridge-card" style={{ '--tilt': `${project.tilt}deg` }}>
        <div className="status-badge">{project.status}</div>
        <div className="cartridge-top" />
        <div className="cartridge-content">
          <div className="label-window">
            <div className={`label-art art-${project.art}`} aria-hidden="true" />
            <div className="label-gloss" aria-hidden="true" />
          </div>

          <h2>{project.title}</h2>
          <p className="credits">Developer: {project.developer}</p>

          <div className="genre-row">
            {project.genres.map((tag) => (
              <span key={tag} className="genre-chip">
                {tag}
              </span>
            ))}
          </div>

          <section className="cheat-panel" aria-label="Card info">
            <div className="cheat-head">
              <span>CARD INFO</span>
              <span>DEMO ACCESS</span>
            </div>

            <InfoRow
              label="PROJECT ID"
              value={project.projectId}
              copied={copied === 'id'}
              onCopy={() => copy(project.projectId, 'id')}
            />

            <InfoRow
              label="STAGING"
              value={project.stagingUrl}
              copied={copied === 'url'}
              onCopy={() => copy(project.stagingUrl, 'url')}
              link
            />

            {project.username ? (
              <InfoRow
                label="USERNAME"
                value={project.username}
                copied={copied === 'username'}
                onCopy={() => copy(project.username, 'username')}
              />
            ) : null}

            <InfoRow
              label="PASSWORD"
              value={project.password}
              copied={copied === 'password'}
              onCopy={() => copy(project.password, 'password')}
            />
          </section>
        </div>

        <div className="cartridge-groove" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value, copied, onCopy, link = false }) {
  return (
    <div className="info-row">
      <div className="info-copy">
        <span className="field-label">{label}</span>
        {link ? (
          <a href={value} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          <span>{value}</span>
        )}
      </div>

      <button type="button" className="icon-btn" onClick={onCopy} aria-label={`Copy ${label}`}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied && <span className="copied-popup">COPIED!</span>}
      </button>
    </div>
  );
}

export default App;
