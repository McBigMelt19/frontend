import React from 'react';
import './WeeklyFlow.css';

export default function WeeklyFlow({ ahorradoEsteMes, ingresosMes }) {
  const tasaAhorro = ingresosMes > 0
    ? Math.round((ahorradoEsteMes / ingresosMes) * 100)
    : 0;

  return (
    <section className="card card--tasa" aria-label="Flujo semanal">
      <span className="card-label">📈 Flujo Semanal</span>

      <p className="tasa-numero">{tasaAhorro}%</p>
      <p className="tasa-detalle">de tus ingresos fue al fondo</p>

      <div className="tasa-barra-track">
        <div
          className="tasa-barra-fill"
          style={{ width: `${Math.min(tasaAhorro, 100)}%` }}
        />
      </div>

      <p className="tasa-referencia">
        ${ahorradoEsteMes} de ${ingresosMes} este mes
      </p>
    </section>
  );
}
