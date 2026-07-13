import React from 'react';
import './Calendar.css';

export default function CalendarStrip({ onDayClick }) {
    // Función matemática para obtener los 7 días de la semana actual (Lunes a Domingo)
    const getSemanaActual = () => {
        const hoy = new Date();
        // En JS, el domingo es 0. Lo ajustamos para que la semana empiece en Lunes (1)
        const diaDeLaSemana = hoy.getDay() === 0 ? 7 : hoy.getDay();

        const lunes = new Date(hoy);
        lunes.setDate(hoy.getDate() - diaDeLaSemana + 1);

        const semana = [];
        for (let i = 0; i < 7; i++) {
            const dia = new Date(lunes);
            dia.setDate(lunes.getDate() + i);
            semana.push(dia);
        }
        return semana;
    };

    const dias = getSemanaActual();
    const nombresDias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const hoyStr = new Date().toDateString(); // Para saber qué día pintar de otro color

    return (
        <section className="calendar-strip" aria-label="Calendario semanal">
            <div className="calendar-container">
                {dias.map((fecha, index) => {
                    const esHoy = fecha.toDateString() === hoyStr;
                    const numeroDia = fecha.getDate();

                    return (
                        <button
                            key={index}
                            className={`calendar-day ${esHoy ? 'calendar-day--hoy' : ''}`}
                            onClick={() => onDayClick(fecha)}
                        >
                            <span className="day-name">{nombresDias[index]}</span>
                            <span className="day-number">{numeroDia}</span>
                            {esHoy && <span className="day-dot"></span>}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}