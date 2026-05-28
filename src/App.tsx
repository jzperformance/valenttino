export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 text-neutral-900 relative">

      {/* FONDO ANIMADO */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-80 h-80 bg-green-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-lime-200 opacity-20 rounded-full blur-3xl animate-bounce"></div>

      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* IMAGEN DECORATIVA */}
        <div className="absolute top-10 right-10 opacity-20 hidden md:block">

          <img
            src="/hero.jpg"
            alt="VALENTTINO"
            className="w-[340px] h-[340px] object-cover rounded-[40px] shadow-2xl"
          />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">

          {/* LOGO */}
          <div className="flex justify-center mb-8">
            <img
              src="/logo.png"
              alt="Logo VALENTTINO"
              className="w-44 md:w-56 drop-shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-[10px] text-emerald-900">
            VALENTTINO
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Boinas y gorros de lana perfectos para el frío,
            brindando comodidad, estilo y abrigo para este invierno ❄️
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

            <a
              href="https://wa.me/56933676168"
              target="_blank"
              className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl text-white"
            >
              Consultar por WhatsApp
            </a>

            <a
              href="#productos"
              className="bg-white/70 backdrop-blur-md hover:bg-white transition px-8 py-4 rounded-2xl font-bold text-lg border border-white/50 shadow-xl"
            >
              Ver Productos
            </a>

          </div>

        </div>
      </section>

      {/* PRODUCTOS */}
      <section
        id="productos"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-emerald-700 font-semibold mb-3">
            Colección Invierno
          </p>

          <h2 className="text-5xl font-black text-neutral-800">
            Nuestros Productos
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* BOINA */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl border border-white/50 hover:-translate-y-2 hover:shadow-green-200 transition duration-300">

            <div className="overflow-hidden">
              <img
                src="/boina.jpg"
                alt="Boina de lana"
                className="w-full h-[500px] object-cover hover:scale-110 transition duration-700"
              />
            </div>

            <div className="p-8">

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-3xl font-black text-emerald-900">
                  🧢 Boina de Lana
                </h3>

                <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                  Stock Disponible
                </span>

              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Diseños modernos y elegantes en distintos colores.
                Perfectas para mantener tu estilo durante el invierno.
              </p>

              <div className="flex gap-3 flex-wrap mb-8">

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

              <a
                href="https://wa.me/56933676168?text=Hola,%20quiero%20consultar%20por%20la%20boina%20de%20lana"
                target="_blank"
                className="w-full block text-center bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl font-bold text-lg shadow-xl"
              >
                Consultar Disponibilidad
              </a>

            </div>
          </div>

          {/* GORRO */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-2xl border border-white/50 hover:-translate-y-2 hover:shadow-emerald-200 transition duration-300">

            <div className="overflow-hidden">
              <img
                src="/gorro.jpg"
                alt="Gorro de lana"
                className="w-full h-[500px] object-cover hover:scale-110 transition duration-700"
              />
            </div>

            <div className="p-8">

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-3xl font-black text-emerald-900">
                  🎩 Gorro de Lana
                </h3>

                <span className="bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold">
                  Stock Disponible
                </span>

              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                Gorros cómodos y abrigadores para todo tipo de clima.
                Distintos colores y estilos disponibles.
              </p>

              <div className="flex gap-3 flex-wrap mb-8">

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

              <a
                href="https://wa.me/56940559447?text=Hola,%20quiero%20consultar%20por%20el%20gorro%20de%20lana"
                target="_blank"
                className="w-full block text-center bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl font-bold text-lg shadow-xl"
              >
                Consultar Disponibilidad
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* INFORMACIÓN */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl p-10">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[5px] text-emerald-700 font-semibold mb-4">
              Información
            </p>

            <h2 className="text-5xl font-black text-neutral-800">
              Compra Fácil y Rápida
            </h2>

          </div>

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