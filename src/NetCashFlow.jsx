import React from 'react';
import './NetCashFlow.css';

export default function NetCashFlow({ ingresosMes, gastosMes }) {
  const flujoNeto = ingresosMes - gastosMes;

  // Obtener el nombre del mes actual en español
  const getMesActual = () => {
    const fecha = new Date();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    return mes.charAt(0).toUpperCase() + mes.slice(1); // Capitaliza la primera letra
  };

  return (
    <section className="card card--flujo" aria-label="Flujo de caja neto">
      <span className="card-label">💵 Flujo Neto ({getMesActual()})</span>
      
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
