import React, { useState } from 'react';
import './TransactionModal.css'; // Crearemos un CSS pequeño para esto

export default function TransactionModal({ isOpen, onClose, tipoModal, carteraInfo, onSave }) {
    // Estados del formulario
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Si no está abierto, no renderiza nada (optimización de memoria)
    if (!isOpen) return null;

    // Lógica dinámica: Qué colores y textos usar según si es INGRESO o EGRESO
    const esIngreso = tipoModal === 'INCOME';
    const colorTema = esIngreso ? 'var(--dash-verde)' : 'var(--dash-rojo)';
    const titulo = esIngreso ? 'Registrar Ingreso' : 'Registrar Gasto';

    // Categorías generales (4 globales + Otros)
    const categoriasIngreso = ['Salario / Ingresos fijos', 'Ventas / Negocios', 'Inversiones', 'Regalos / Bonos', 'Otros...'];
    const categoriasGasto = ['Alimentación', 'Vivienda y Servicios', 'Transporte', 'Ocio y Entretenimiento', 'Otros...'];

    const opcionesCategoria = esIngreso ? categoriasIngreso : categoriasGasto;

    // Manejador para asegurar que el monto sea positivo y tenga máximo 2 decimales
    const handleMontoChange = (e) => {
        let val = e.target.value;

        // No permitir signos negativos
        if (val.startsWith('-', ',')) {
            val = val.replace('-', '');
        }

        // Limitar a máximo 2 decimales
        if (val.includes('.')) {
            const partes = val.split('.');
            if (partes[1].length > 2) {
                val = `${partes[0]}.${partes[1].substring(0, 2)}`;
            }
        }

        setMonto(val);
    };

    // Manejador del envío
    const handleSubmit = (e) => {
        e.preventDefault();
        // Empaquetamos la data como un JSON limpio
        const formData = {
            tipo: tipoModal,
            moneda: carteraInfo.id, // 'usd', 'cop', 'ves'
            monto: parseFloat(monto),
            categoria: categoria,
            descripcion: descripcion,
            fecha: new Date().toISOString()
        };

        onSave(formData); // Pasamos los datos al componente padre

        // Limpiamos y cerramos
        setMonto('');
        setCategoria('');
        setDescripcion('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Detenemos la propagación para que dar clic dentro del modal no lo cierre */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <header className="modal-header">
                    <h3 style={{ color: colorTema }}>
                        {titulo} en {carteraInfo.nombre}
                    </h3>
                    <button className="btn-close" onClick={onClose}>✕</button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Monto ({carteraInfo.simbolo})</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={monto}
                            onChange={handleMontoChange}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select required value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="" disabled>Selecciona una opción...</option>
                            {opcionesCategoria.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descripción (Opcional)</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ej: Cambio de aceite Motul"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        style={{ backgroundColor: colorTema }}
                    >
                        Guardar Transacción
                    </button>
                </form>
            </div>
        </div>
    );
}