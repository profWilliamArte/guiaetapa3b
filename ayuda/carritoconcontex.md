#  Crear la Etapa 3B: Carrito con Context API

🎯 Objetivo
Migrar la gestión del carrito desde App.jsx (con props) a un sistema centralizado usando React Context API, para resolver el problema del “prop drilling” y introducir el concepto  estado global en aplicaciones más grandes.

📚 Por qué ahora es el momento ideal

1) Ya dominan la versión básica:
    Tienen claro cómo funciona el carrito, cómo se pasa el estado y las funciones por props, y cuáles son sus limitaciones.

2) Entienden el problema:
    Al pasar el carrito por múltiples componentes, ven que se vuelve engorroso → esto crea la necesidad de Context.

3) Preparación natural para Redux o Zustand:
    Context es la puerta de entrada a patrones de estado global.



🔧 Qué implementar en la Etapa 3B

Componentes                                         Cambio
---------------------------------------------------------------------------------------------
App.jsx                 Ya no gestiona el estado del carrito. Solo renderiza el CarritoProvider.

CarritoContext.js       Nuevo archivo: 
                        define el contexto, el provider y las funciones de gestión.

Header.jsx              Usa useContext(CarritoContext)  para acceder al carrito y funciones.

Cardprod.jsx            Usa useContext para agregar productos.

Tienda.jsx              Ya no recibe carrito ni agregarAlCarrito como props.

CarritoOffcanvas.jsx    Usa useContext para leer y modificar el carrito.


🛠️ Pasos clave para la migración
    Crear CarritoContext.js
    Mover el estado (carrito, setCarrito) y todas las funciones (agregar, eliminar, etc.) al CarritoProvider.
    Reemplazar todas las props por useContext en los componentes.
    Mantener la persistencia con localStorage dentro del CarritoProvider.
    Agregar confirmaciones y envío a DummyJSON (ya lo tienen listo).
    Añadir badge visual y Offcanvas (también ya lo tienen).
    


📌 Ventajas de esta etapa
    ✅ Elimina el “prop drilling”.
    ✅ Mejora la mantenibilidad del código.
    ✅ Introduce un patrón de estado global.
    ✅ Refuerza el uso de hooks (useContext, useReducer opcional).
    ✅ Prepara para herramientas como Redux Toolkit o Zustand.


    “En la Etapa 3A, el carrito viajaba como una mochila por todos los componentes.
        Ahora, en la Etapa 3B, vamos a crear un ‘centro de control’ (el Context) donde cualquier componente puede ir a buscarlo sin tener que pasarlo de mano en mano.” 










