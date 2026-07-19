import React from 'react';
import './TopLeaks.css';

export default function TopLeaks({ fugas }) {
  const totalFugas = fugas.reduce((acc, f) => acc + f.monto, 0);

  return (
    <section className="card card--fugas" aria-label="Top 3 fugas de capital">
      <span className="card-label">🕳️ Top 3 Fugas</span>

      <div className="fugas-layout">
        <DonaChart fugas={fugas} total={totalFugas} />

        <ul className="fugas-leyenda">
          {fugas.map((fuga, i) => (
            <li key={fuga.categoria} className="fuga-item">
              <span className={`fuga-dot fuga-dot--${i}`} aria-hidden="true" />
              <div className="fuga-texto">
                <span className="fuga-categoria">{fuga.categoria}</span>
                <span className="fuga-monto">${fuga.monto}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Sub-componente para la dona
function DonaChart({ fugas, total }) {
  const COLORES = ['#7c3aed', '#0ea5e9', '#f59e0b'];
  const RADIO = 40;
  const GROSOR = 14;
  const CIRCUNF = 2 * Math.PI * RADIO;
  const CX = 56, CY = 56;

  let offsetAcumulado = 0;

  return (
    <svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true" className="dona-svg">
      <circle cx={CX} cy={CY} r={RADIO} fill="none" stroke="var(--border, #e5e4e7)" strokeWidth={GROSOR} />
      {fugas.map((fuga, i) => {
        const fraccion = total > 0 ? fuga.monto / total : 0;
        const dasharray = fraccion * CIRCUNF;
        const dashoffset = CIRCUNF - offsetAcumulado * CIRCUNF;
        offsetAcumulado += fraccion;

        return (
          <circle
            key={fuga.categoria} cx={CX} cy={CY} r={RADIO} fill="none"
            stroke={COLORES[i] || '#fff'} strokeWidth={GROSOR}
            strokeDasharray={`${dasharray} ${CIRCUNF - dasharray}`} strokeDashoffset={dashoffset}
            strokeLinecap="butt" style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        );
      })}
      <text x={CX} y={CY - 5} textAnchor="middle" className="dona-label-monto">${total}</text>
      <text x={CX} y={CY + 12} textAnchor="middle" className="dona-label-sub">fugas</text>
    </svg>
  );
}
