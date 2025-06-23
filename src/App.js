import React, { useState } from "react";

export default function CalculadoraComisiones() {
  const [tipoProducto, setTipoProducto] = useState("Telemedida");
  const [subProducto, setSubProducto] = useState("CMW 3.0");
  const [precioVenta, setPrecioVenta] = useState(100);
  const [porcentajeComision, setPorcentajeComision] = useState(10);
  const [objetivoMensual, setObjetivoMensual] = useState(2500);
  const [ventasAcumuladas, setVentasAcumuladas] = useState(8);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const comisionPorVenta = (precioVenta * porcentajeComision) / 100;
    const totalComisiones = ventasAcumuladas * comisionPorVenta;
    const ventasNecesarias = Math.ceil(objetivoMensual / comisionPorVenta);
    const progreso = Math.min((totalComisiones / objetivoMensual) * 100, 100);

    setResultado({ comisionPorVenta, totalComisiones, ventasNecesarias, progreso });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Calculadora de Comisiones</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Entradas</h2>
            <label className="block mb-2 text-gray-700">Tipo de Producto Vendido</label>
            <select className="w-full p-3 border rounded mb-5" value={tipoProducto} onChange={e => setTipoProducto(e.target.value)}>
              <option>Telemedida</option>
              <option>Batería</option>
              <option>Optimización</option>
            </select>

            {tipoProducto === "Telemedida" && (
              <>
                <label className="block mb-2 text-gray-700">Subproducto</label>
                <select className="w-full p-3 border rounded mb-5" value={subProducto} onChange={e => setSubProducto(e.target.value)}>
                  <option>CMW 3.0</option>
                  <option>CMW 6.1 -450Kw</option>
                  <option>CMW 631 +450 Kw</option>
                </select>
              </>
            )}

            <label className="block mb-2 text-gray-700">Precio de Venta al Cliente (€)</label>
            <input type="number" className="w-full p-3 border rounded mb-5" value={precioVenta} onChange={e => setPrecioVenta(Number(e.target.value))} />

            <label className="block mb-2 text-gray-700">% de Comisión Asignado</label>
            <input type="number" className="w-full p-3 border rounded mb-5" value={porcentajeComision} onChange={e => setPorcentajeComision(Number(e.target.value))} />

            <label className="block mb-2 text-gray-700">Objetivo Mensual Deseado (€)</label>
            <input type="number" className="w-full p-3 border rounded mb-5" value={objetivoMensual} onChange={e => setObjetivoMensual(Number(e.target.value))} />

            <label className="block mb-2 text-gray-700">Ventas Acumuladas</label>
            <input type="number" className="w-full p-3 border rounded mb-5" value={ventasAcumuladas} onChange={e => setVentasAcumuladas(Number(e.target.value))} />

            <button onClick={calcular} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg font-medium">Calcular</button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Resultados</h2>
            {resultado && (
              <div className="space-y-4 text-gray-800">
                <p><strong>Comisión por Venta:</strong> {resultado.comisionPorVenta.toFixed(2)} €</p>
                <p><strong>Total Acumulado en Comisiones:</strong> {resultado.totalComisiones.toFixed(2)} €</p>
                <p><strong>Ventas Necesarias para el Objetivo:</strong> {resultado.ventasNecesarias}</p>
                <div>
                  <strong>Progreso</strong>
                  <div className="w-full bg-gray-300 rounded h-5 mt-1">
                    <div
                      className="bg-green-500 h-5 rounded"
                      style={{ width: `${resultado.progreso}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-center mt-1 font-semibold">{resultado.progreso.toFixed(0)} %</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
