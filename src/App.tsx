import { useState } from "react";

const productos = [
  {
    nombre: "Boina Negra Premium",
    imagen: "/boina-negra.jpg",
    descripcion:
      "Boina elegante y abrigadora ideal para invierno.",
  },
  {
    nombre: "Boina Beige Clásica",
    imagen: "/boina-beige.jpg",
    descripcion:
      "Diseño moderno y cómodo con distintos estilos.",
  },
  {
    nombre: "Gorro Verde Lana",
    imagen: "/gorro-verde.jpg",
    descripcion:
      "Gorro cómodo y perfecto para días fríos.",
  },
  {
    nombre: "Gorro Blanco Invierno",
    imagen: "/gorro-blanco.jpg",
    descripcion:
      "Estilo premium y abrigo para cualquier ocasión.",
  },
];

export default function App() {

  const [carrito, setCarrito] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [abrirCarrito, setAbrirCarrito] = useState(false);

  const agregarCarrito = (producto: string) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarProducto = (index: number) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero consultar por estos productos: ${carrito.join(", ")}`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 overflow-hidden">

      {/* CARRITO */}
      {abrirCarrito && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6 shadow-2xl">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-black text-emerald-900">
                🛒 Tu Carrito
              </h2>

              <button
                onClick={() => setAbrirCarrito(false)}
                className="text-3xl font-black"
              >
                ✕
              </button>

            </div>

            {carrito.length === 0 ? (

              <div className="text-center py-20">

                <p className="text-neutral-500 text-lg">
                  Tu carrito está vacío.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {carrito.map((producto, index) => (

                  <div
                    key={index}
                    className="bg-emerald-100 rounded-2xl p-4 flex justify-between items-center"
                  >

                    <p className="font-bold text-emerald-900">
                      {producto}
                    </p>

                    <button
                      onClick={() => eliminarProducto(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      X
                    </button>

                  </div>

                ))}

                <a
                  href={`https://wa.me/56933676168?text=${mensajeWhatsapp}`}
                  target="_blank"
                  className="block text-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold mt-8"
                >
                  Procesar Pedido por WhatsApp
                </a>

              </div>

            )}

          </div>

        </div>
      )}

      {/* HERO */}
      <section className="text-center py-24 px-6 relative">

        <div className="absolute top-0 left-0 w-80 h-80 bg-green-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <img
          src="/logo.png"
          alt="VALENTTINO"
          className="w-44 mx-auto mb-8 relative z-10"
        />

        <h1 className="text-6xl md:text-7xl font-black text-emerald-900 tracking-[8px] relative z-10">
          VALENTTINO
        </h1>

        <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto relative z-10">
          Boinas y gorros de lana para este invierno ❄️
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center relative z-10">

          <button
            onClick={() => setAbrirCarrito(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
          >
            Abrir Carrito 🛒
          </button>

          <a
            href="#productos"
            className="bg-white hover:bg-neutral-100 px-8 py-4 rounded-2xl font-bold shadow-xl"
          >
            Ver Productos
          </a>

        </div>

      </section>

      {/* BUSCADOR */}
      <div className="max-w-7xl mx-auto px-6 mb-16">

        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-5 rounded-2xl border border-green-200 shadow-xl outline-none focus:ring-4 focus:ring-green-300"
        />

      </div>

      {/* PRODUCTOS */}
      <section
        id="productos"
        className="max-w-7xl mx-auto px-6 pb-24"
      >

        <div className="grid md:grid-cols-2 gap-10">

          {productosFiltrados.map((producto, index) => (

            <div
              key={index}
              className="bg-white rounded-[30px] overflow-hidden shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-3xl font-black text-emerald-900">
                    {producto.nombre}
                  </h2>

                  <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                    Stock
                  </span>

                </div>

                <p className="text-neutral-600 mb-6">
                  {producto.descripcion}
                </p>

                <div className="flex gap-3 mb-8 flex-wrap">

                  <span className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm">
                    Talla S
                  </span>

                  <span className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm">
                    Talla M
                  </span>

                  <span className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm">
                    Talla L
                  </span>

                </div>

                <div className="flex flex-col gap-4">

                  <button
                    onClick={() => agregarCarrito(producto.nombre)}
                    className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold"
                  >
                    Agregar al Carrito 🛒
                  </button>

                  <a
                    href={`https://wa.me/56933676168?text=Hola,%20quiero%20consultar%20por%20${encodeURIComponent(producto.nombre)}`}
                    target="_blank"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold text-center"
                  >
                    Consultar Disponibilidad
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* INFO */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-3">
              📍 Entrega
            </h3>

            <p className="text-neutral-600">
              Entrega presencial coordinada directamente
              por WhatsApp.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-3">
              💳 Métodos de Pago
            </h3>

            <p className="text-neutral-600">
              Transferencia bancaria o efectivo.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-3">
              📞 Contacto
            </h3>

            <p className="text-neutral-600">
              +56 9 3367 6168
            </p>

            <p className="text-neutral-600">
              +56 9 4055 9447
            </p>

            <p className="text-neutral-600 break-all">
              donosomartin707@gmail.com
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-3">
              🔄 Política de Devolución
            </h3>

            <p className="text-neutral-600">
              Se aceptan devoluciones únicamente si el producto
              está limpio, en buen estado y explicando claramente
              el motivo.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-red-200 md:col-span-2 hover:scale-105 transition">

            <h3 className="text-2xl font-bold mb-3">
              ⚠️ Garantía
            </h3>

            <p className="text-neutral-600">
              Actualmente no contamos con garantía.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-10">

        <p className="text-neutral-700 font-semibold">
          © 2026 VALENTTINO — Todos los derechos reservados.
        </p>

        <p className="text-neutral-500 mt-2">
          Soporte técnico: jz.performance.hks@gmail.com
        </p>

      </footer>

    </div>
  );
}

