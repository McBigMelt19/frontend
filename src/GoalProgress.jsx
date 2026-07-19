import React from 'react';
import './GoalProgress.css';

export default function GoalProgress({ ahorroActual, metaObjetivo }) {
  const porcentajeObjetivo = Math.min((ahorroActual / metaObjetivo) * 100, 100);

  return (
    <section className="card card--hero" aria-label="Progreso del objetivo">
      <span className="card-label">🎯 Objetivo</span>
      <div className="hero-amounts">
        <span className="hero-current">${ahorroActual}</span>
        <span className="hero-separator">/</span>
        <span className="hero-goal">${metaObjetivo}</span>
      </div>
      <div className="progress-track" role="progressbar"
        aria-valuenow={porcentajeObjetivo} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${porcentajeObjetivo}%` }}
        />
      </div>
      <p className="hero-percent">{porcentajeObjetivo.toFixed(1)}% completado</p>
    </section>
  );
}
