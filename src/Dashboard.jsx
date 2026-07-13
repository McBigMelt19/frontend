import { useState } from 'react'
import TransactionModal from './TransactionModal';
import CalendarStrip from './CalendarStrip';
import DailyLogModal from './DailyLogModal';
import './Dashboard.css'

// ============================================================
//  DATOS DE EJEMPLO — Edita estos valores para probar el dashboard
//  Cuando conectes tu backend, reemplaza estos con estado real
//  o con llamadas a tu API (useEffect + fetch/axios)
// ============================================================
const DATOS_INICIALES = {
  // ── MÉTRICA 1: Barra de Progreso del Objetivo ─────────────
  ahorroActual: 1250,   // Cuánto llevas ahorrado ($)
  metaObjetivo: 1500,  // Tu meta total ($)

  // ── MÉTRICA 2: Flujo de Caja Neto ─────────────────────────
  ingresosMes: 100,    // Total de ingresos del mes ($)
  gastosMes: 30,       // Total de gastos del mes ($)

  // ── MÉTRICA 3: Top 3 Fugas de Capital ─────────────────────
  // Nombre de la categoría y cuánto gastaste en ella este mes
  fugas: [
    { categoria: 'Comida en la calle', monto: 45 },
    { categoria: 'Transporte', monto: 28 },
    { categoria: 'Suscripciones', monto: 18 },
  ],

  // ── MÉTRICA 4: Tasa de Ahorro Mensual ─────────────────────
  // Cuánto de tus ingresos de este mes destinaste al fondo del carro ($)
  ahorradoEsteMes: 70,

  // ── MÉTRICA 5: Carteras Multi-moneda ──────────────────────
  carteras: [
    { id: 'usd', nombre: 'Dólares', saldo: 430, ingresos: 50, egresos: 10, simbolo: 'USD 🇺🇸' },
    { id: 'cop', nombre: 'Pesos', saldo: 150000, ingresos: 80000, egresos: 30000, simbolo: 'COP 🇨🇴 ' },
    { id: 'ves', nombre: 'Bolívares', saldo: 1200, ingresos: 500, egresos: 150, simbolo: 'Bs 🇻🇪' }
  ]
}


// ============================================================
//  COMPONENTE PRINCIPAL — Dashboard 20/80
// ============================================================
export default function Dashboard() {
  // Aquí puedes reemplazar useState por useEffect + fetch
  // para cargar los datos desde tu backend
  const [datos] = useState(DATOS_INICIALES)
  // 2. NUEVOS ESTADOS PARA EL MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ tipo: '', cartera: null });

  // 3. NUEVOS ESTADOS PARA EL MODAL DE LA BITÁCORA
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // 3. Función para abrir el modal con la configuración correcta
  const abrirModal = (tipo, cartera) => {
    setModalConfig({ tipo, cartera });
    setModalOpen(true);
  };

  // 5. NUEVA FUNCIÓN PARA ABRIR EL MODAL DE BITÁCORA
  const handleDiaClick = (fecha) => {
    setFechaSeleccionada(fecha);
    setLogModalOpen(true);
  };

  // 4. Función para recibir los datos cuando le den a "Guardar"
  const handleGuardarTransaccion = (nuevaTransaccion) => {
    console.log("Datos listos para enviar al backend:", nuevaTransaccion);
    // Aquí luego meteremos el fetch/axios para enviarlo a Node.js
    // Por ahora, solo cerramos el modal
    setModalOpen(false);
  };
  // ── Cálculos derivados (no los toques a menos que cambies la lógica) ──
  const porcentajeObjetivo = Math.min((datos.ahorroActual / datos.metaObjetivo) * 100, 100)
  const flujoNeto = datos.ingresosMes - datos.gastosMes
  const totalFugas = datos.fugas.reduce((acc, f) => acc + f.monto, 0)
  const tasaAhorro = datos.ingresosMes > 0
    ? Math.round((datos.ahorradoEsteMes / datos.ingresosMes) * 100)
    : 0

  return (
    <main className="dash-root">

      {/* ── ENCABEZADO ──────────────────────────────────────── */}
      <header className="dash-header">
        <h1 className="dash-title">Wallet By JuanJo</h1>
      </header>

      {/* NUEVA SECCIÓN 1: CALENDARIO ────────────── */}
      <CalendarStrip onDayClick={handleDiaClick} />

      <div className="dash-grid">

        {/* ════════════════════════════════════════════════════
            MÉTRICA 1 — BARRA DE PROGRESO DEL OBJETIVO (Hero)
            Fórmula: (Ahorro Actual / Meta) * 100
            Para cambiar la meta o el ahorro → edita DATOS_INICIALES
        ════════════════════════════════════════════════════ */}
        <section className="card card--hero" aria-label="Progreso del objetivo">
          <span className="card-label">🎯 Objetivo</span>

          <div className="hero-amounts">
            {/* Monto actual */}
            <span className="hero-current">${datos.ahorroActual}</span>
            <span className="hero-separator">/</span>
            {/* Meta */}
            <span className="hero-goal">${datos.metaObjetivo}</span>
          </div>

          {/* Barra de progreso — el ancho es porcentajeObjetivo % */}
          <div className="progress-track" role="progressbar"
            aria-valuenow={porcentajeObjetivo} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="progress-fill"
              style={{ width: `${porcentajeObjetivo}%` }}
            />
          </div>

          {/* Porcentaje numérico */}
          <p className="hero-percent">{porcentajeObjetivo.toFixed(1)}% completado</p>
        </section>


        {/* ════════════════════════════════════════════════════
            MÉTRICA 2 — FLUJO DE CAJA NETO (Ingresos − Gastos)
            Verde si positivo, rojo si negativo
            Para cambiar → edita ingresosMes y gastosMes en DATOS_INICIALES
        ════════════════════════════════════════════════════ */}
        <section className="card card--flujo" aria-label="Flujo de caja neto">
          <span className="card-label">💵 Flujo Neto del Mes 01/07-31/07/2026</span>

          {/* Número grande — color automático según signo */}
          <p className={`flujo-numero ${flujoNeto >= 0 ? 'positivo' : 'negativo'}`}>
            {flujoNeto >= 0 ? '+' : ''}${flujoNeto}
          </p>

          {/* Desglose ingresos / gastos */}
          <div className="flujo-detalle">
            <span className="flujo-ingreso">↑ Ingresos ${datos.ingresosMes}</span>
            <span className="flujo-gasto">↓ Gastos ${datos.gastosMes}</span>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            MÉTRICA 3 — TOP 3 FUGAS DE CAPITAL (Gráfica de dona)
            Cada segmento de color representa una categoría
            Para cambiar categorías → edita el array "fugas" en DATOS_INICIALES
            Colores de cada segmento → variable CSS --fuga-color-N en Dashboard.css
        ════════════════════════════════════════════════════ */}
        <section className="card card--fugas" aria-label="Top 3 fugas de capital">
          <span className="card-label">🕳️ Top 3 Fugas</span>

          <div className="fugas-layout">
            {/* Gráfica de dona SVG — simple, sin librerías externas */}
            <DonaChart fugas={datos.fugas} total={totalFugas} />

            {/* Leyenda lateral */}
            <ul className="fugas-leyenda">
              {datos.fugas.map((fuga, i) => (
                <li key={fuga.categoria} className="fuga-item">
                  {/* Punto de color — el índice "i" determina qué color CSS toma */}
                  <span className={`fuga-dot fuga-dot--${i}`} aria-hidden="true" />
                  <div className="fuga-texto">
                    <span className="fuga-categoria">{fuga.categoria}</span>
                    <span className="fuga-monto">${fuga.monto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            MÉTRICA 4 — TASA DE AHORRO MENSUAL
            Fórmula: (Ahorrado Este Mes / Ingresos del Mes) * 100
            Para cambiar → edita ahorradoEsteMes e ingresosMes en DATOS_INICIALES
        ════════════════════════════════════════════════════ */}
        <section className="card card--tasa" aria-label="Tasa de ahorro mensual">
          <span className="card-label">📈 Tasa de Ahorro</span>

          {/* Porcentaje de ahorro — número prominente */}
          <p className="tasa-numero">{tasaAhorro}%</p>
          <p className="tasa-detalle">
            de tus ingresos fue al fondo
          </p>

          {/* Mini barra de referencia — rellena según tasa */}
          <div className="tasa-barra-track">
            <div
              className="tasa-barra-fill"
              style={{ width: `${Math.min(tasaAhorro, 100)}%` }}
            />
          </div>

          {/* Referencia: monto ahorrado vs ingresos */}
          <p className="tasa-referencia">
            ${datos.ahorradoEsteMes} de ${datos.ingresosMes} este mes
          </p>
        </section>

        {/* ════════════════════════════════════════════════════
            MÉTRICA 5 — ESTADO DE CARTERAS
            Muestra el saldo y el flujo de cada moneda individual.
        ════════════════════════════════════════════════════ */}
        <section className="card card--carteras" aria-label="Estado de las carteras">
          <span className="card-label">💼 Carteras Físicas / Digitales</span>

          <div className="carteras-layout">
            {datos.carteras.map((cartera) => (
              <div key={cartera.id} className="cartera-item">

                {/* Parte superior: Nombre de la moneda y Saldo Total */}
                <div className="cartera-header">
                  <span className="cartera-nombre">{cartera.nombre}</span>
                  <span className="cartera-saldo">
                    {cartera.simbolo}{cartera.saldo.toLocaleString()}
                  </span>
                </div>

                {/* Parte inferior: Cuadros Verde (Ingresos) y Rojo (Egresos) */}
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

        {/* ════════════════════════════════════════════════════
            MÉTRICA 6 — PROXIMOS PAGOS
            Muestra el saldo y el flujo de cada moneda individual.
        ════════════════════════════════════════════════════ */}
        <section className="card card--carteras" aria-label="Estado de las carteras">
          <span className="card-label">💼 Carteras Físicas / Digitales</span>
          <div className="carteras-layout">
            <div className="proximos-pagos">

            </div>
          </div>
        </section>



      </div>{/* /dash-grid */}
      {/* 5. INCRUSTAR EL COMPONENTE MODAL AL FINAL DEL MAIN */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tipoModal={modalConfig.tipo}
        carteraInfo={modalConfig.cartera || {}} // Evita errores si es null
        onSave={handleGuardarTransaccion}
      />

      {/* NUEVO: Modal de la bitácora diaria */}
      <DailyLogModal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        fecha={fechaSeleccionada}
      />
    </main>
  )
}


// ============================================================
//  SUB-COMPONENTE: Gráfica de Dona SVG
//  Recibe: fugas (array) y total (número)
//  No necesitas editar esto para cambiar los datos —
//  solo edita el array "fugas" en DATOS_INICIALES
// ============================================================
function DonaChart({ fugas, total }) {
  // Colores internos de cada segmento (mismo orden que fugas)
  // Para cambiar colores → edita también --fuga-color-0/1/2 en Dashboard.css
  const COLORES = ['#7c3aed', '#0ea5e9', '#f59e0b']

  const RADIO = 40    // radio exterior del círculo
  const GROSOR = 14   // grosor del anillo
  const CIRCUNF = 2 * Math.PI * RADIO
  const CX = 56, CY = 56  // centro del SVG

  let offsetAcumulado = 0

  return (
    <svg
      width="112"
      height="112"
      viewBox="0 0 112 112"
      aria-hidden="true"
      className="dona-svg"
    >
      {/* Pista de fondo — usa el color de borde del sistema (--border) */}
      <circle
        cx={CX} cy={CY} r={RADIO}
        fill="none"
        stroke="var(--border, #e5e4e7)"
        strokeWidth={GROSOR}
      />

      {/* Segmentos de cada categoría */}
      {fugas.map((fuga, i) => {
        const fraccion = total > 0 ? fuga.monto / total : 0
        const dasharray = fraccion * CIRCUNF
        const dashoffset = CIRCUNF - offsetAcumulado * CIRCUNF

        offsetAcumulado += fraccion

        return (
          <circle
            key={fuga.categoria}
            cx={CX} cy={CY} r={RADIO}
            fill="none"
            stroke={COLORES[i] || '#fff'}
            strokeWidth={GROSOR}
            strokeDasharray={`${dasharray} ${CIRCUNF - dasharray}`}
            strokeDashoffset={dashoffset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        )
      })}

      {/* Texto central: total gastado en fugas */}
      <text x={CX} y={CY - 5} textAnchor="middle" className="dona-label-monto">
        ${total}
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" className="dona-label-sub">
        fugas
      </text>
    </svg>
  )
}
