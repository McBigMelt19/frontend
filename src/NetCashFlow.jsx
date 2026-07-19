import React from 'react';
import './NetCashFlow.css';

export default function NetCashFlow({ ingresosMes, gastosMes }) {
  const flujoNeto = ingresosMes - gastosMes;

  return (
    <section className="card card--flujo" aria-label="Flujo de caja neto">
      <span className="card-label">💵 Flujo Neto del Mes 01/07-31/07/2026</span>
      
      <p className={`flujo-numero ${flujoNeto >= 0 ? 'positivo' : 'negativo'}`}>
        {flujoNeto >= 0 ? '+' : ''}${flujoNeto}
      </p>

      <div className="flujo-detalle">
        <span className="flujo-ingreso">↑ Ingresos ${ingresosMes}</span>
        <span className="flujo-gasto">↓ Gastos ${gastosMes}</span>
      </div>
    </section>
  );
}
