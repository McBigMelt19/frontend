import React from 'react';
import './NetCashFlow.css';

export default function WeeklyFlow({ ingresosSemana = 0, gastosSemana = 0 }) {
  const flujoNeto = ingresosSemana - gastosSemana;

  // Función para obtener el rango de fechas de la semana actual (Lunes a Domingo)
  const getRangoSemana = () => {
    const hoy = new Date();
    const diaDeLaSemana = hoy.getDay() === 0 ? 7 : hoy.getDay();
    
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - diaDeLaSemana + 1);
    
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);

    const formatearFecha = (fecha) => {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      return `${dia}/${mes}`;
    };

    return `${formatearFecha(lunes)} - ${formatearFecha(domingo)}`;
  };

  return (
    <section className="card card--flujo" aria-label="Flujo de caja neto semanal">
      <span className="card-label">💵 Flujo Neto Semanal ({getRangoSemana()})</span>
      
      <p className={`flujo-numero ${flujoNeto >= 0 ? 'positivo' : 'negativo'}`}>
        {flujoNeto >= 0 ? '+' : ''}${flujoNeto}
      </p>

      <div className="flujo-detalle">
        <span className="flujo-ingreso">↑ Ingresos ${ingresosSemana}</span>
        <span className="flujo-gasto">↓ Gastos ${gastosSemana}</span>
      </div>
    </section>
  );
}
