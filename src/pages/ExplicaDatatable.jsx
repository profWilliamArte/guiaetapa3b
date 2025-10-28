import React from 'react';

const ExplicaDatatable = () => {
  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">Componente <code>Tablas</code> – Explicación Paso a Paso</h1>
        <p className="lead text-muted">
          Cómo se construye una tabla interactiva con PrimeReact: desde la carga de datos hasta la edición en línea.
        </p>
      </header>

      {/* 1. Carga de datos y estado inicial */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">1. Carga de datos desde la API</h5>
        </div>
        <div className="card-body">
          <p>
            El componente inicia con tres estados principales:
          </p>
          <ul>
            <li><code>datos</code>: almacena la lista de productos.</li>
            <li><code>loading</code>: muestra un spinner mientras se cargan los datos.</li>
            <li><code>error</code>: captura y muestra errores de red.</li>
          </ul>
          <p>
            La función <code>getDatos()</code> usa <code>fetch</code> para obtener productos de <code>https://dummyjson.com/products</code>.
            Se ejecuta una sola vez con <code>useEffect</code>.
          </p>
        </div>
      </div>

      {/* 2. Cálculo de métricas con useMemo */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">2. Cálculo eficiente de totales</h5>
        </div>
        <div className="card-body">
          <p>
            Se usan dos <code>useMemo</code> para evitar cálculos innecesarios:
          </p>
          <ul>
            <li><strong>Categorías únicas:</strong> extrae y ordena las categorías para usarlas en el <code>Dropdown</code> de filtros.</li>
            <li><strong>Totales de inventario:</strong> suma el stock total y el valor total del inventario (precio × stock).</li>
          </ul>
          <p>
            Estos valores se actualizan solo cuando cambia <code>datos</code>, mejorando el rendimiento.
          </p>
        </div>
      </div>

      {/* 3. Filtros y controles de usuario */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">3. Filtros y personalización de la vista</h5>
        </div>
        <div className="card-body">
          <p>
            El componente ofrece tres formas de interacción:
          </p>
          <ul>
            <li>
              <strong>Filtro global:</strong> un campo de texto que busca en todos los campos usando <code>FilterMatchMode.CONTAINS</code>.
            </li>
            <li>
              <strong>Filtro por categoría:</strong> un <code>Dropdown</code> que filtra exactamente por categoría (<code>FilterMatchMode.EQUALS</code>).
            </li>
            <li>
              <strong>Tamaño de la tabla:</strong> un <code>SelectButton</code> permite cambiar entre tamaños (pequeño, normal, grande).
            </li>
          </ul>
          <p>
            Los filtros se gestionan en el estado <code>filters</code>, que se pasa directamente a <code>DataTable</code>.
          </p>
        </div>
      </div>

      {/* 4. Diseño visual y plantillas */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">4. Plantillas personalizadas para columnas</h5>
        </div>
        <div className="card-body">
          <p>
            Cada columna especial usa una función <em>template</em> para mostrar datos de forma amigable:
          </p>
          <ul>
            <li><code>imageBodyTemplate</code>: muestra la miniatura del producto.</li>
            <li><code>ratingBodyTemplate</code>: renderiza estrellas usando <code>Rating</code>.</li>
            <li><code>stockSeverityTemplate</code>: muestra el stock con un badge de color (verde, amarillo o rojo) según la cantidad.</li>
            <li><code>subtotalTemplate</code>: calcula y muestra el valor total del producto en inventario (precio × stock).</li>
          </ul>
          <p>
            Además, se usan funciones auxiliares como <code>formatCurrency</code> y <code>formatNumber</code> para dar formato a los números.
          </p>
        </div>
      </div>

      {/* 5. Edición en línea */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">5. Edición de filas en tiempo real</h5>
        </div>
        <div className="card-body">
          <p>
            La tabla permite editar los campos <strong>Stock</strong> y <strong>Precio</strong> directamente:
          </p>
          <ul>
            <li>Se activa con <code>editMode="row"</code>.</li>
            <li>Cada celda editable usa <code>editor=textEditor</code>, que renderiza un <code>InputNumber</code> con validación numérica.</li>
            <li>Al guardar, se ejecuta <code>onRowEditComplete</code>, que recibe los nuevos datos y el índice.</li>
          </ul>
          <p>
            En este ejemplo, los cambios se <strong>simulan en consola</strong> (ideal para conectar luego con una API real).
          </p>
        </div>
      </div>

      {/* 6. Paginación, orden y estilo */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">6. Comportamiento básico de la tabla</h5>
        </div>
        <div className="card-body">
          <p>
            La <code>DataTable</code> incluye funcionalidades estándar:
          </p>
          <ul>
            <li><strong>Paginación:</strong> 5 filas por defecto, con opciones para 10, 25 o 50.</li>
            <li><strong>Ordenamiento:</strong> todas las columnas numéricas y de texto son ordenables.</li>
            <li><strong>Orden inicial:</strong> las filas se ordenan por <code>stock</code> de mayor a menor.</li>
            <li><strong>Diseño:</strong> filas rayadas (<code>stripedRows</code>) para mejor legibilidad.</li>
          </ul>
        </div>
      </div>

      {/* 7. Resumen de componentes usados */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">7. Componentes de PrimeReact utilizados</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <ul className="list-unstyled">
                <li>• <code>DataTable</code></li>
                <li>• <code>Column</code></li>
                <li>• <code>InputText</code></li>
                <li>• <code>InputNumber</code></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <ul className="list-unstyled">
                <li>• <code>Dropdown</code></li>
                <li>• <code>SelectButton</code></li>
                <li>• <code>Rating</code></li>
                <li>• <code>Card</code></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <ul className="list-unstyled">
                <li>• <code>IconField</code> / <code>InputIcon</code></li>
                <li>• <code>FilterMatchMode</code></li>
              </ul>
            </div>
          </div>
          <p className="text-muted">
            Todo se integra con React estándar (<code>useState</code>, <code>useEffect</code>, <code>useMemo</code>) y estilos de Bootstrap.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplicaDatatable;