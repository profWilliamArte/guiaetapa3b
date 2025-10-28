import React from 'react';

const ExplicacionContext = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary display-5 fw-bold">
        Evolución del Carrito: De Props a Context API
      </h1>

      <p className="lead text-center mb-5">
        Cómo pasamos de arrastrar props manualmente a usar el Context API para gestionar el carrito de forma global, limpia y escalable.
      </p>

      {/* === 1. El problema: Prop Drilling === */}
      <div className="card mb-5 border-danger">
        <div className="card-header bg-danger text-white">
          <h3 className="mb-0">1. El problema: Prop Drilling</h3>
        </div>
        <div className="card-body">
          <p>
            En un enfoque inicial, el estado del carrito y sus funciones (<code>agregarAlCarrito</code>, <code>eliminarDelCarrito</code>, etc.) se definían en <code>App.jsx</code>.
          </p>
          <p>
            Para que un componente como <code>Movil</code> o <code>Laptop</code> pudiera agregar productos al carrito, había que:
          </p>
          <ul>
            <li>Pasar el estado <code>carrito</code> y las funciones como props desde <code>App</code> → <code>Header</code> → <code>Tienda</code> → <code>ProductoCard</code>.</li>
            <li>Componentes intermedios recibían y reenviaban props sin usarlos, solo para "pasar el testigo".</li>
          </ul>
          <div className="alert alert-warning mt-3">
            <strong>Consecuencias:</strong> Código repetitivo, difícil de mantener, propenso a errores y poco escalable.
          </div>
        </div>
      </div>

      {/* === 2. La solución: React Context API === */}
      <div className="card mb-5 border-success">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">2. La solución: Context API</h3>
        </div>
        <div className="card-body">
          <p>
            El <strong>Context API</strong> permite crear un "almacén global" al que cualquier componente puede acceder directamente, sin pasar props.
          </p>
          <p>
            En nuestro caso, creamos un archivo <code>CarritoContext.jsx</code> con tres partes clave:
          </p>
          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">1. createContext()</div>
                <div className="card-body">
                  <p className="small mb-0">
                    Crea el "canal" por el que fluirán los datos: <code>const CarritoContext = createContext();</code>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">2. CarritoProvider</div>
                <div className="card-body">
                  <p className="small mb-0">
                    Componente que <strong>mantiene el estado</strong> (<code>carrito</code>) y lo expone mediante <code>value</code>.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">3. useCarrito()</div>
                <div className="card-body">
                  <p className="small mb-0">
                    Hook personalizado que usa <code>useContext(CarritoContext)</code> para acceder al estado y funciones desde cualquier componente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 3. Persistencia y funciones reales === */}
      <div className="card mb-5 border-info">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">3. Funcionalidades clave del contexto</h3>
        </div>
        <div className="card-body">
          <p>
            El <code>CarritoProvider</code> no solo almacena el estado, sino que también incluye lógica esencial:
          </p>
          <ul>
            <li>
              <strong>Persistencia con localStorage:</strong> Al cargar, recupera el carrito guardado. Al cambiar, lo guarda automáticamente con <code>useEffect</code>.
            </li>
            <li>
              <strong>Funciones completas:</strong> <code>agregarAlCarrito</code>, <code>eliminarDelCarrito</code>, <code>actualizarCantidad</code>, <code>vaciarCarrito</code> y <code>enviarPedido</code>.
            </li>
            <li>
              <strong>Integración con API:</strong> <code>enviarPedido</code> envía los productos a <code>https://dummyjson.com/carts/add</code> usando <code>fetch</code>.
            </li>
          </ul>
          <p className="mt-3">
            Esto convierte al contexto en un verdadero "centro de control" del carrito.
          </p>
        </div>
      </div>

      {/* === 4. Uso en la aplicación === */}
      <div className="card mb-5 border-dark">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">4. Cómo se integra en la app</h3>
        </div>
        <div className="card-body">
          <h5 className="mb-3">Paso 1: Envolver la app</h5>
          <p>
            En <code>App.jsx</code>, todo el contenido se envuelve con <code>CarritoProvider</code>:
          </p>
          <pre className="bg-black p-3 rounded mb-4">
            <code>
              {`<CarritoProvider>\n  <BrowserRouter>...\n  </BrowserRouter>\n</CarritoProvider>`}
            </code>
          </pre>

          <h5 className="mb-3">Paso 2: Consumir en cualquier componente</h5>
          <p>
            En <code>Movil.jsx</code>, <code>Laptop.jsx</code>, <code>Header.jsx</code>, etc., ya no se reciben props del carrito. En su lugar:
          </p>
          <pre className="bg-black p-3 rounded">
            <code>
              {`import { useCarrito } from '../context/CarritoContext';\n\nconst Movil = () => {\n  const { carrito, agregarAlCarrito } = useCarrito();\n  // ¡Listo! Acceso directo.\n}`}
            </code>
          </pre>
          <p className="mt-3">
            Cualquier componente puede leer el carrito o modificarlo sin depender de su posición en el árbol.
          </p>
        </div>
      </div>

      {/* === 5. Beneficios resumidos === */}
      <div className="card border-primary">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">5. Beneficios del enfoque con Context API</h3>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-black border rounded h-100">
                <h6 className="fw-bold text-success">✅ Elimina Prop Drilling</h6>
                <p className="small mb-0">Nada de pasar props innecesarias.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-black border rounded h-100">
                <h6 className="fw-bold text-success">✅ Código más limpio</h6>
                <p className="small mb-0">Menos props, menos ruido.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-black border rounded h-100">
                <h6 className="fw-bold text-success">✅ Fácil de escalar</h6>
                <p className="small mb-0">Nuevo componente? Solo usa <code>useCarrito()</code>.</p>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="p-3 bg-black border rounded h-100">
                <h6 className="fw-bold text-success">✅ Estado persistente</h6>
                <p className="small mb-0">El carrito sobrevive a recargas gracias a <code>localStorage</code>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplicacionContext;