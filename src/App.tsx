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
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [abrirCarrito, setAbrirCarrito] = useState(false);
  const [abrirFavoritos, setAbrirFavoritos] = useState(false);
  const [notificacion, setNotificacion] = useState("");

  const [carrito, setCarrito] = useState<any[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  const [tallasSeleccionadas, setTallasSeleccionadas] =
    useState<{ [key: number]: string }>({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const favoritosGuardados =
      localStorage.getItem("favoritos");

    if (favoritosGuardados) {
      setFavoritos(
        JSON.parse(favoritosGuardados)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

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
      tallasSeleccionadas[producto.id];

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

  const productosFiltrados =
    productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
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
      className={`min-h-screen transition-all duration-700 ${
        darkMode
          ? "bg-neutral-950 text-white"
          : "bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 text-neutral-900"
      }`}
    >
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-black tracking-[5px] text-emerald-700">
            VALENTTINO
          </h1>

          <div className="flex gap-4">

            <button
              onClick={() =>
                setAbrirCarrito(true)
              }
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-2xl font-bold shadow-xl"
            >
              🛒 ({carrito.length})
            </button>

            <button
              onClick={() =>
                setAbrirFavoritos(
                  true
                )
              }
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-2xl font-bold shadow-xl"
            >
              ❤️ ({favoritos.length})
            </button>

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="bg-neutral-900 text-white px-5 py-3 rounded-2xl font-bold shadow-xl"
            >
              {darkMode
                ? "☀️"
                : "🌙"}
            </button>

          </div>

        </div>

      </nav>

      {/* NOTIFICACION */}
      {notificacion && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold animate-bounce">
          {notificacion}
        </div>
      )}

      {/* HERO */}
      <section className="text-center py-20 px-6">

        <img
          src="/logo.png"
          alt="VALENTTINO"
          className="w-44 mx-auto mb-8 drop-shadow-2xl"
        />

        <h1 className="text-6xl md:text-7xl font-black tracking-[10px] text-emerald-900">
          VALENTTINO
        </h1>

        <p className="mt-6 text-xl max-w-3xl mx-auto">
          Boinas y gorros premium para este invierno ❄️
        </p>

      </section>

      {/* BUSCADOR */}
      <section className="max-w-7xl mx-auto px-6 mb-10">

        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          className="w-full px-6 py-5 rounded-3xl border shadow-xl"
        />

      </section>

      {/* PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

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
                  className="bg-white rounded-[35px] overflow-hidden shadow-2xl hover:-translate-y-2 transition"
                >

                  <img
                    src={
                      producto.imagen
                    }
                    alt={
                      producto.nombre
                    }
                    className="w-full h-[500px] object-cover"
                  />

                  <div className="p-8">

                    <h3 className="text-3xl font-black">
                      {
                        producto.nombre
                      }
                    </h3>

                    <p className="mt-4 text-neutral-600">
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
                          className="h-full bg-green-500"
                        ></div>

                      </div>

                    </div>

                    <p className="text-4xl font-black text-emerald-700 mt-6">
                      $
                      {producto.precio.toLocaleString()}
                    </p>

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
                            className={`px-5 py-2 rounded-full font-bold ${
                              tallasSeleccionadas[
                                producto.id
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
                              producto.id
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

        <div className="bg-white rounded-[40px] shadow-2xl p-10">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-neutral-50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                📍 Entrega
              </h3>

              <p>
                Entrega presencial coordinada directamente por WhatsApp.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                💳 Métodos de Pago
              </h3>

              <p>
                Transferencia bancaria o efectivo.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-6 shadow-lg">
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

            <div className="bg-neutral-50 rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">
                🔄 Política de Devolución
              </h3>

              <p>
                Se aceptan devoluciones únicamente si el producto está limpio y en buen estado.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-6 shadow-lg md:col-span-2">
              <h3 className="text-2xl font-bold mb-3">
                ⚠️ Garantía
              </h3>

              <p>
                Actualmente no contamos con garantía.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FAVORITOS */}
      {abrirFavoritos && (

        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">

            <div className="flex justify-between items-center mb-8">

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
                      className="bg-emerald-50 rounded-3xl p-5 shadow-xl"
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

        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">

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
                      className="bg-emerald-50 rounded-2xl p-4"
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

                <div className="bg-emerald-100 rounded-2xl p-6 mt-8">

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