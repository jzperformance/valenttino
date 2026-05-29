import { useEffect, useState } from "react";

const productos = [
  {
    id: 1,
    nombre: "Boina Negra Premium",
    imagen: "/boina-negra.jpg",
    descripcion:
      "Boina elegante de lana ideal para invierno y outfits modernos.",
    precio: 9990,
    stock: 8,
    categoria: "boina",
  },
  {
    id: 2,
    nombre: "Boina Beige Clásica",
    imagen: "/boina-beige.jpg",
    descripcion:
      "Diseño cómodo y moderno con distintos colores disponibles.",
    precio: 8990,
    stock: 5,
    categoria: "boina",
  },
  {
    id: 3,
    nombre: "Gorro Verde Lana",
    imagen: "/gorro-verde.jpg",
    descripcion:
      "Gorro cómodo y abrigador perfecto para días fríos.",
    precio: 7990,
    stock: 7,
    categoria: "gorro",
  },
  {
    id: 4,
    nombre: "Gorro Blanco Invierno",
    imagen: "/gorro-blanco.jpg",
    descripcion:
      "Estilo moderno y suave para combinar con cualquier outfit.",
    precio: 10990,
    stock: 3,
    categoria: "gorro",
  },
];

export default function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [busqueda, setBusqueda] =
    useState("");

  const [categoria, setCategoria] =
    useState("todos");

  const [abrirCarrito, setAbrirCarrito] =
    useState(false);

  const [abrirFavoritos, setAbrirFavoritos] =
    useState(false);

  const [chatAbierto, setChatAbierto] =
    useState(false);

  const [mensajeIA, setMensajeIA] =
    useState("");

  const [notificacion, setNotificacion] =
    useState("");

  const [carrito, setCarrito] = useState<
    any[]
  >([]);

  const [favoritos, setFavoritos] =
    useState<any[]>([]);

  const [tallasSeleccionadas, setTallasSeleccionadas] =
    useState<{ [key: number]: string }>(
      {}
    );

  const [tiempo, setTiempo] = useState({
    horas: 2,
    minutos: 10,
    segundos: 45,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);

  useEffect(() => {
    const html =
      document.documentElement;

    if (darkMode) {
      html.classList.add("dark");

      document.body.style.backgroundColor =
        "#020617";

      document.body.style.color =
        "white";
    } else {
      html.classList.remove("dark");

      document.body.style.backgroundColor =
        "#f0fdf4";

      document.body.style.color =
        "#111827";
    }
  }, [darkMode]);

  useEffect(() => {
    const favoritosGuardados =
      localStorage.getItem(
        "favoritos"
      );

    if (favoritosGuardados) {
      setFavoritos(
        JSON.parse(
          favoritosGuardados
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo((prev) => {
        let {
          horas,
          minutos,
          segundos,
        } = prev;

        if (segundos > 0) {
          segundos--;
        } else if (minutos > 0) {
          minutos--;
          segundos = 59;
        } else if (horas > 0) {
          horas--;
          minutos = 59;
          segundos = 59;
        }

        return {
          horas,
          minutos,
          segundos,
        };
      });
    }, 1000);

    return () =>
      clearInterval(intervalo);
  }, []);

  const mostrarNotificacion = (
    texto: string
  ) => {
    setNotificacion(texto);

    setTimeout(() => {
      setNotificacion("");
    }, 2500);
  };

  const seleccionarTalla = (
    productoId: number,
    talla: string
  ) => {
    setTallasSeleccionadas({
      ...tallasSeleccionadas,
      [productoId]: talla,
    });
  };

  const agregarCarrito = (
    producto: any
  ) => {
    const talla =
      tallasSeleccionadas[
        producto.id
      ];

    if (!talla) {
      mostrarNotificacion(
        "⚠️ Selecciona una talla"
      );
      return;
    }

    const existe = carrito.find(
      (item) =>
        item.id === producto.id &&
        item.talla === talla
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id &&
          item.talla === talla
            ? {
                ...item,
                cantidad:
                  item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          talla,
          cantidad: 1,
        },
      ]);
    }

    mostrarNotificacion(
      "🛒 Producto agregado"
    );
  };

  const quitarProducto = (
    id: number,
    talla: string
  ) => {
    setCarrito(
      carrito.filter(
        (item) =>
          !(
            item.id === id &&
            item.talla === talla
          )
      )
    );
  };

  const agregarFavorito = (
    producto: any
  ) => {
    const existe =
      favoritos.find(
        (item) =>
          item.id === producto.id
      );

    if (!existe) {
      setFavoritos([
        ...favoritos,
        producto,
      ]);

      mostrarNotificacion(
        "❤️ Agregado a favoritos"
      );
    }
  };

  const responderIA = () => {
    const texto =
      mensajeIA.toLowerCase();

    if (
      texto.includes("boina") ||
      texto.includes("elegante")
    ) {
      return "Te recomiendo nuestras boinas premium 🖤";
    }

    if (
      texto.includes("frio") ||
      texto.includes("invierno")
    ) {
      return "Los gorros de lana son ideales ❄️";
    }

    return "Tenemos boinas y gorros premium disponibles ✨";
  };

  const productosFiltrados =
    productos.filter(
      (producto) => {
        const coincideBusqueda =
          producto.nombre
            .toLowerCase()
            .includes(
              busqueda.toLowerCase()
            );

        const coincideCategoria =
          categoria ===
            "todos" ||
          producto.categoria ===
            categoria;

        return (
          coincideBusqueda &&
          coincideCategoria
        );
      }
    );

  const total = carrito.reduce(
    (acc, item) =>
      acc +
      item.precio *
        item.cantidad,
    0
  );

  const mensajeWhatsapp =
    encodeURIComponent(`
Hola, quiero pedir:

${carrito
  .map(
    (item) =>
      `• ${item.nombre}
Talla: ${item.talla}
Cantidad: ${item.cantidad}
Subtotal: $${
        item.precio *
        item.cantidad
      }`
  )
  .join("\n\n")}

Total: $${total}
`);

  return (
    <div
      className={`min-h-screen overflow-hidden transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white"
          : "bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 text-neutral-900"
      }`}
    >

      {/* FONDO */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>

      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-neutral-900/70 border-b border-white/20 shadow-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-black tracking-[5px] text-emerald-700">
            VALENTTINO
          </h1>

          <div className="hidden md:flex gap-4">

            <button
              onClick={() =>
                setAbrirCarrito(true)
              }
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-2xl font-bold shadow-xl"
            >
              🛒 Carrito (
              {carrito.length})
            </button>

            <button
              onClick={() =>
                setAbrirFavoritos(
                  true
                )
              }
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-2xl font-bold shadow-xl"
            >
              ❤️ Favoritos (
              {favoritos.length})
            </button>

          </div>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            aria-label="Cambiar modo oscuro"
            className={`px-5 py-3 rounded-2xl font-bold shadow-xl transition-all duration-500
            ${
              darkMode
                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                : "bg-neutral-900 text-white hover:bg-black"
            }`}
          >
            {darkMode
              ? "☀️ Modo Claro"
              : "🌙 Modo Oscuro"}
          </button>

        </div>

      </nav>

      {/* NOTIFICACIÓN */}
      {notificacion && (
        <div className="fixed top-6 right-6 z-[999] bg-emerald-700 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce font-bold">
          {notificacion}
        </div>
      )}

      {/* BOTÓN WHATSAPP */}
      <a
        href="https://wa.me/56933676168"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-2xl animate-bounce"
      >
        💬
      </a>

      {/* CHAT IA */}
      <div className="fixed left-6 bottom-6 z-50">

        {!chatAbierto ? (

          <button
            onClick={() =>
              setChatAbierto(
                true
              )
            }
            className="bg-emerald-700 text-white px-6 py-4 rounded-full shadow-2xl font-bold"
          >
            🧠 IA Ayuda
          </button>

        ) : (

          <div className="w-80 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-5">

            <div className="flex justify-between items-center mb-4">

              <h3 className="font-black text-xl">
                Asistente IA
              </h3>

              <button
                onClick={() =>
                  setChatAbierto(
                    false
                  )
                }
              >
                ✕
              </button>

            </div>

            <input
              type="text"
              placeholder="¿Qué buscas?"
              value={mensajeIA}
              onChange={(e) =>
                setMensajeIA(
                  e.target.value
                )
              }
              className="w-full px-4 py-3 rounded-2xl border dark:bg-neutral-800"
            />

            <div className="mt-4 bg-emerald-50 dark:bg-neutral-800 rounded-2xl p-4 text-sm">
              {mensajeIA
                ? responderIA()
                : "Pregúntame sobre estilos ✨"}
            </div>

          </div>

        )}

      </div>

      {/* HERO */}
      <section className="text-center py-20 px-6">

        <img
          src="/logo.png"
          alt="VALENTTINO"
          loading="lazy"
          className="w-44 mx-auto mb-8 drop-shadow-2xl animate-pulse hover:scale-110 transition duration-700"
        />

        <h1 className="text-6xl md:text-7xl font-black tracking-[10px] text-emerald-900 dark:text-white">
          VALENTTINO
        </h1>

        <p className="mt-6 text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
          Boinas y gorros premium para este invierno ❄️
        </p>

        <div className="mt-10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl px-8 py-6 inline-block shadow-2xl">

          <p className="text-red-500 font-black mb-3">
            🔥 Oferta Especial
          </p>

          <p className="text-4xl font-black">
            {String(
              tiempo.horas
            ).padStart(
              2,
              "0"
            )}
            :
            {String(
              tiempo.minutos
            ).padStart(
              2,
              "0"
            )}
            :
            {String(
              tiempo.segundos
            ).padStart(
              2,
              "0"
            )}
          </p>

        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-10">

          <input
            type="text"
            aria-label="Buscar productos"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
            className="w-full px-6 py-5 rounded-3xl border shadow-xl dark:bg-neutral-900"
          />

        </div>

        {loading ? (

          <div className="text-center text-3xl font-black">
            Cargando productos...
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-12">

            {productosFiltrados.map(
              (producto) => (

                <div
                  key={producto.id}
                  className={`rounded-[35px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-green-300/50
                  ${
                    darkMode
                      ? "bg-neutral-900 border border-neutral-700"
                      : "bg-white/70 border border-white/50"
                  }`}
                >

                  <img
                    src={
                      producto.imagen
                    }
                    alt={
                      producto.nombre
                    }
                    loading="lazy"
                    className="w-full h-[500px] object-cover hover:scale-110 transition duration-700"
                  />

                  <div className="p-8">

                    <h3 className="text-3xl font-black">
                      {
                        producto.nombre
                      }
                    </h3>

                    <p className="mt-4 opacity-80">
                      {
                        producto.descripcion
                      }
                    </p>

                    <div className="mt-5">

                      <div className="flex justify-between mb-2">

                        <span>
                          Stock
                        </span>

                        <span>
                          {
                            producto.stock
                          }
                          /10
                        </span>

                      </div>

                      <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden">

                        <div
                          style={{
                            width: `${producto.stock * 10}%`,
                          }}
                          className="h-full bg-green-500 rounded-full"
                        ></div>

                      </div>

                    </div>

                    <div className="mt-6">

                      <p className="text-4xl font-black text-emerald-700">
                        $
                        {producto.precio.toLocaleString()}
                      </p>

                    </div>

                    {/* TALLAS */}
                    <div className="flex gap-3 mt-6">

                      {[
                        "S",
                        "M",
                        "L",
                      ].map(
                        (
                          talla
                        ) => (

                          <button
                            key={
                              talla
                            }
                            onClick={() =>
                              seleccionarTalla(
                                producto.id,
                                talla
                              )
                            }
                            className={`px-5 py-2 rounded-full font-bold
                            ${
                              tallasSeleccionadas[
                                producto
                                  .id
                              ] ===
                              talla
                                ? "bg-emerald-700 text-white"
                                : "bg-emerald-100 text-emerald-900"
                            }`}
                          >
                            {
                              talla
                            }
                          </button>

                        )
                      )}

                    </div>

                    {/* BOTONES */}
                    <div className="flex flex-col gap-4 mt-8">

                      <button
                        onClick={() =>
                          agregarCarrito(
                            producto
                          )
                        }
                        className="bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold"
                      >
                        Agregar al Carrito 🛒
                      </button>

                      <button
                        onClick={() =>
                          agregarFavorito(
                            producto
                          )
                        }
                        className="bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-bold"
                      >
                        ❤️ Favorito
                      </button>

                      <a
                        href={`https://wa.me/56933676168?text=${encodeURIComponent(
                          `Hola, quiero consultar por:

Producto: ${producto.nombre}
Talla: ${
                            tallasSeleccionadas[
                              producto
                                .id
                            ] ||
                            "No seleccionada"
                          }
Precio: $${producto.precio.toLocaleString()}`
                        )}`}
                        target="_blank"
                        className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-center"
                      >
                        Consultar por WhatsApp
                      </a>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* INFO */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-white/60 dark:bg-neutral-900/70 backdrop-blur-xl rounded-[40px] shadow-2xl p-10">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                📍 Entrega
              </h3>

              <p>
                Entrega presencial coordinada directamente por WhatsApp.
              </p>

            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                💳 Métodos de Pago
              </h3>

              <p>
                Transferencia bancaria o efectivo.
              </p>

            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                📞 Contacto
              </h3>

              <p>
                +56 9 3367 6168
              </p>

              <p>
                +56 9 4055 9447
              </p>

              <p>
                donosomartin707@gmail.com
              </p>

            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                🔄 Política de Devolución
              </h3>

              <p>
                Se aceptan devoluciones únicamente si el producto está limpio.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FAVORITOS */}
      {abrirFavoritos && (

        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">

          <div
            className={`w-full max-w-md h-full overflow-y-auto shadow-2xl p-6
            ${
              darkMode
                ? "bg-neutral-950 text-white"
                : "bg-white text-black"
            }`}
          >

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-black">
                ❤️ Favoritos
              </h2>

              <button
                onClick={() =>
                  setAbrirFavoritos(
                    false
                  )
                }
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            {favoritos.length ===
            0 ? (

              <p>
                No tienes favoritos aún.
              </p>

            ) : (

              <div className="space-y-5">

                {favoritos.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={
                        index
                      }
                      className={`rounded-3xl p-5 shadow-xl
                      ${
                        darkMode
                          ? "bg-neutral-800"
                          : "bg-emerald-50"
                      }`}
                    >

                      <h3 className="font-black text-xl">
                        {
                          item.nombre
                        }
                      </h3>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      )}

      {/* CARRITO */}
      {abrirCarrito && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">

          <div className="bg-white dark:bg-neutral-900 w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-black">
                🛒 Carrito
              </h2>

              <button
                onClick={() =>
                  setAbrirCarrito(
                    false
                  )
                }
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            {carrito.length ===
            0 ? (

              <p>
                Tu carrito está vacío.
              </p>

            ) : (

              <div className="space-y-4">

                {carrito.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={
                        index
                      }
                      className="bg-emerald-50 dark:bg-neutral-800 rounded-2xl p-4"
                    >

                      <h3 className="font-black">
                        {
                          item.nombre
                        }
                      </h3>

                      <p>
                        Talla:{" "}
                        {
                          item.talla
                        }
                      </p>

                      <p>
                        Cantidad:{" "}
                        {
                          item.cantidad
                        }
                      </p>

                      <button
                        onClick={() =>
                          quitarProducto(
                            item.id,
                            item.talla
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl mt-4"
                      >
                        Eliminar
                      </button>

                    </div>

                  )
                )}

                <div className="bg-emerald-100 dark:bg-neutral-800 rounded-2xl p-6 mt-8">

                  <h3 className="text-2xl font-black">
                    Total
                  </h3>

                  <p className="text-4xl font-black text-emerald-700 mt-3">
                    $
                    {total.toLocaleString()}
                  </p>

                </div>

                <a
                  href={`https://wa.me/56933676168?text=${mensajeWhatsapp}`}
                  target="_blank"
                  className="block text-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg mt-8"
                >
                  Procesar Pedido
                </a>

              </div>

            )}

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="text-center py-10">

        <p className="font-semibold">
          © 2026 VALENTTINO — Todos los derechos reservados.
        </p>

        <p className="mt-2 text-neutral-500">
          Soporte técnico:
          jz.performance.hks@gmail.com
        </p>

      </footer>

    </div>
  );
}