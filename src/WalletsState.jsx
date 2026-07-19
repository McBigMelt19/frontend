import React from 'react';
import './WalletsState.css';

export default function WalletsState({ carteras, abrirModal }) {
  return (
    <section className="card card--carteras" aria-label="Estado de las carteras">
      <span className="card-label">💼 Carteras Físicas / Digitales</span>

      <div className="carteras-layout">
        {carteras.map((cartera) => (
          <div key={cartera.id} className="cartera-item">
            <div className="cartera-header">
              <span className="cartera-nombre">{cartera.nombre}</span>
              <span className="cartera-saldo">
                {cartera.simbolo}{cartera.saldo.toLocaleString()}
              </span>
            </div>

            <div className="cartera-flujos">
              <div
                className="flujo-box flujo-box--in"
                role="button"
                tabIndex="0"
                onClick={() => abrirModal('INCOME', cartera)}
                style={{ cursor: 'pointer' }}
              >
                <span className="flujo-icon">↓</span>
                {cartera.simbolo}{cartera.ingresos.toLocaleString()}
              </div>

              <div
                className="flujo-box flujo-box--out"
                role="button"
                tabIndex="0"
                onClick={() => abrirModal('EXPENSE', cartera)}
                style={{ cursor: 'pointer' }}
              >
                <span className="flujo-icon">↑</span>
                {cartera.simbolo}{cartera.egresos.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
