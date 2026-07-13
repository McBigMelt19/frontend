import React from 'react';
import './TransactionModal.css'; // Reutilizamos el CSS del overlay transparente

export default function DailyLogModal({ isOpen, onClose, fecha }) {
    if (!isOpen || !fecha) return null;

    // Formateamos la fecha para que se vea bonita en el título: "12 de Julio, 2026"
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const tituloFecha = fecha.toLocaleDateString('es-ES', opcionesFecha);

    // LOGS SIMULADOS (Aquí en el futuro harás un fetch(tu_backend/api?date=...))
    const logsSimulados = [
        { id: 1, tipo: 'INCOME', categoria: 'Taller Mecánico', monto: 35, moneda: 'USD', descripcion: 'Frenos Corsa' },
        { id: 2, tipo: 'EXPENSE', categoria: 'Comida Calle', monto: 60000, moneda: 'COP', descripcion: 'Perros calientes' },
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <header className="modal-header">
                    <h3>Bitácora Diaria</h3>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </header>

                <p className="log-date">{tituloFecha}</p>

                <div className="log-list">
                    {logsSimulados.length === 0 ? (
                        <p className="log-empty">No hay transacciones registradas este día.</p>
                    ) : (
                        logsSimulados.map(log => (
                            <div key={log.id} className="log-item">
                                <div className="log-info">
                                    <span className="log-cat">{log.categoria}</span>
                                    <span className="log-desc">{log.descripcion}</span>
                                </div>
                                <div className={`log-monto ${log.tipo === 'INCOME' ? 'text-verde' : 'text-rojo'}`}>
                                    {log.tipo === 'INCOME' ? '+' : '-'} {log.monto} {log.moneda}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}