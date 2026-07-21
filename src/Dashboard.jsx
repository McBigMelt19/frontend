import { useState } from 'react'
import TransactionModal from './TransactionModal';
import CalendarStrip from './CalendarStrip';
import DailyLogModal from './DailyLogModal';
import RecentEvent from './RecentEvent';
import GoalProgress from './GoalProgress';
import NetCashFlow from './NetCashFlow';
import TopLeaks from './TopLeaks';
import WeeklyFlow from './WeeklyFlow';
import WalletsState from './WalletsState';
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
  
  // Datos para Flujo Semanal
  ingresosSemana: 25,
  gastosSemana: 15,

  // ── MÉTRICA 5: Carteras Multi-moneda ──────────────────────
  carteras: [
    { id: 'usd', nombre: 'Dólares', saldo: 430, ingresos: 50, egresos: 10, simbolo: 'USD 🇺🇸' },
    { id: 'cop', nombre: 'Pesos', saldo: 150000, ingresos: 80000, egresos: 30000, simbolo: 'COP 🇨🇴 ' },
    { id: 'ves', nombre: 'Bolívares', saldo: 1200, ingresos: 500, egresos: 150, simbolo: 'Bs 🇻🇪' }
  ],

  // ── MÉTRICA 6: Movimientos Recientes ──────────────────────
  transaccionesRecientes: [
    { id: 1, descripcion: 'Comida en la calle', monto: -15, fecha: 'Hoy, 12:30 PM' },
    { id: 2, descripcion: 'Pago freelance', monto: 120, fecha: 'Ayer, 4:00 PM' },
    { id: 3, descripcion: 'Transporte', monto: -5, fecha: '17 Jul, 8:15 AM' },
    { id: 4, descripcion: 'Suscripción', monto: -10, fecha: '16 Jul, 9:00 PM' },
    { id: 5, descripcion: 'Venta de artículo', monto: 45, fecha: '15 Jul, 2:30 PM' },
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
  // Los cálculos derivados ahora se hacen dentro de cada componente (KISS).

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
            MÉTRICAS DEL DASHBOARD (Componentes Modulares)
        ════════════════════════════════════════════════════ */}
        <GoalProgress ahorroActual={datos.ahorroActual} metaObjetivo={datos.metaObjetivo} />
        
        <NetCashFlow ingresosMes={datos.ingresosMes} gastosMes={datos.gastosMes} />
        
        <TopLeaks fugas={datos.fugas} />
        
        <WeeklyFlow ingresosSemana={datos.ingresosSemana} gastosSemana={datos.gastosSemana} />
        
        <WalletsState carteras={datos.carteras} abrirModal={abrirModal} />
        
        <RecentEvent transacciones={datos.transaccionesRecientes} />


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


