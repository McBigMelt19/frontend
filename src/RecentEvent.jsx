import React from 'react';
import './RecentEvent.css';

export default function RecentEvent({ transacciones }) {
    if (!transacciones || transacciones.length === 0) {
        return (
            <section className="card card--recent" aria-label="Eventos recientes">
                <span className="card-label">⏱️ Últimos Movimientos</span>
                <p className="no-events">No hay movimientos recientes.</p>
            </section>
        );
    }

    // KISS: Solo mostramos los últimos 5 movimientos de forma simple
    const ultimosMovimientos = transacciones.slice(0, 5);

    return (
        <section className="card card--recent" aria-label="Eventos recientes">
            <span className="card-label">⏱️ Últimos Movimientos</span>

            <ul className="recent-list">
                {ultimosMovimientos.map((t) => (
                    <li key={t.id} className="recent-item">
                        <div className="recent-info">
                            <span className="recent-desc">* {t.descripcion}</span>
                            <span className="recent-date">{t.fecha}</span>
                        </div>
                        <span className={`recent-amount ${t.monto >= 0 ? 'positivo' : 'negativo'}`}>
                            {t.monto >= 0 ? '+' : '-'}${Math.abs(t.monto)}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
