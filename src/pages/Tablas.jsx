import React, { useEffect, useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatCurrency, formatNumber } from '../util/funciones';
import { Rating } from 'primereact/rating';
import { SelectButton } from 'primereact/selectbutton';
import { FilterMatchMode } from 'primereact/api'; // Asegúrate de importar esto
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
const API = 'https://dummyjson.com/products?limit=300';
const Tablas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [globalTotals, setGlobalTotals] = useState({});

    // cambio de tamaño de la tabla
    const [sizeOptions] = useState([
        { label: 'Pequeña', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Grande', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);

    // filtros
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({

        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        category: { value: null, matchMode: FilterMatchMode.EQUALS }, // Se usa EQUALS para selección de categoría
        price: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    // Estado local para almacenar el valor seleccionado en el Dropdown de categoría
    const [categoryFilter, setCategoryFilter] = useState(null);


    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    // EXTRAER Y PREPARAR CATEGORÍAS con useMemo para el Dropdown
    const categories = useMemo(() => {
        // Obtenemos categorías únicas y las convertimos al formato { label: 'cat', value: 'cat' }
        const cats = [...new Set(datos.map(p => p.category))];
        return cats.sort().map(cat => ({ label: cat.toUpperCase(), value: cat }));
    }, [datos]);


    // totales para la estadistica
    // ✅ NUEVO: CÁLCULO DE MÉTRICAS DE INVENTARIO USANDO REDUCE
const totales = useMemo(() => {
    return datos.reduce((acc, product) => ({
        // Usamos la sintaxis de objeto conciso ({...})
        totalStock: acc.totalStock + product.stock,
        totalInventoryValue: acc.totalInventoryValue + (product.price * product.stock),
    }), {
        // Inicialización del acumulador (acc)
        totalStock: 0,
        totalInventoryValue: 0,
    });
}, [datos]);





    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }


    // templates
    const imageBodyTemplate = (product) => {
        return <img src={product.thumbnail} alt={product.title} className="img-fluid " width={80} />;
    };
    const subtotalTemplate = (product) => {
        return formatCurrency(product.price * product.stock);
    };
    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };
    const getSeverity = (stock) => {
        if (stock > 50) return 'success';    // verde
        else if (stock > 10 && stock <= 50) return 'warning';  // amarillo
        else if (stock <= 10) return 'danger';   // rojo
        return null;
    };

    // Plantilla para la columna que muestra indicador color según stock
    const stockSeverityTemplate = (rowData) => {
        const severity = getSeverity(rowData.stock);
        return (
            <span className={`badge bg-${severity}`}>
                {rowData.stock}
            </span>
        );
    };


    // 2. FUNCIÓN PARA EL FILTRO DE CATEGORÍA
    const onCategoryFilterChange = (value) => {
        setCategoryFilter(value); // Actualiza el estado local del Dropdown

        let _filters = { ...filters };
        // 3. Aplica el valor al filtro de categoría (clave: 'category')
        _filters['category'].value = value;

        setFilters(_filters); // Actualiza los filtros de la DataTable
    };


    // filtros
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };



    const textEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="decimal"
                showButtons
                min={0}
            />
        );
    };

    const onRowEditComplete = (e) => {
        let _datos = [...datos];
        let { newData, index } = e;

        const payload = {
            id: newData.id,
            title: newData.title,
            stock: newData.stock,
            price: newData.price
        };

        // 1. SIMULACIÓN: Mostrar los datos que se enviarían al backend
        console.log("--- Simulación de envío al Backend ---");
        console.log(`Enviando actualización para el producto ID: ${newData.id}`);
        console.log("Nuevos datos:", payload);


    };
    return (
        <div className="container-fluid">
           
            {/* Estadísticas Rápidas */}
            <div className="row my-4">
                <div className="col-md-3 mb-3">
                    <div className="card border-0 bg-primary text-white">
                        <div className="card-body text-center">
                            <i className="pi pi-box fs-1 "></i>
                            <h4 className="mt-2">{datos.length}</h4>
                            <p className="mb-0">Total Productos</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 bg-success text-white">
                        <div className="card-body text-center">
                            <i className="pi pi-chart-line fs-1 "></i>
                            <h4 className="mt-2">{formatCurrency(totales.totalInventoryValue)}</h4>
                            <p className="mb-0">Valor Inventario</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 bg-warning text-white">
                        <div className="card-body text-center">
                            <i className="pi pi-shopping-cart fs-1 "></i>
                            <h4 className="mt-2">{formatNumber(totales.totalStock)}</h4>
                            <p className="mb-0">Stock Total</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 bg-info text-white">
                        <div className="card-body text-center">
                            <i className="pi pi-tags fs-1 "></i>
                            <h4 className="mt-2">{categories.length}</h4>
                            <p className="mb-0">Categorías</p>
                        </div>
                    </div>
                </div>
            </div>
             <h4 className="text-center py-4">Lista de Productos</h4>
            <Card>
                <div className='row '>
                    <div className='col-md-4 '>
                        <div className="d-flex justify-content-center mb-4">
                            <SelectButton value={size} onChange={(e) => setSize(e.value)} options={sizeOptions} />
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <Dropdown
                            value={categoryFilter}
                            onChange={(e) => onCategoryFilterChange(e.value)}
                            options={categories}
                            optionLabel="label"
                            optionValue="value" // Indicamos que el valor seleccionado es el string de la categoría
                            placeholder="Filtrar por categoría"
                            className='w-100'
                            showClear // Permite borrar la selección
                        />
                    </div>
                    <div className='col-md-4 '>
                        <div className="d-flex justify-content-end mb-2">
                            <IconField iconPosition="left" className='w-100'>
                                <InputIcon className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} className='w-100' placeholder="Buscar por nombre, categoria, precio, stock" />
                            </IconField>
                        </div>
                    </div>

                </div>



                <DataTable value={datos}
                    filters={filters}
                    size={size}
                    sortField="stock"
                    sortOrder={-1} stripedRows
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    editMode="row" // <-- CAMBIO: Edición de fila completa
                    onRowEditComplete={onRowEditComplete}
                >
                    <Column field="id" header="ID" sortable></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="category" header="Categoria" sortable></Column>
                    <Column field="title" header="Nombre" sortable></Column>
                    <Column field="title" header="Estrellas" body={ratingBodyTemplate} ></Column>
                    <Column header="Est" body={stockSeverityTemplate} />
                    <Column
                        field="stock"
                        header="Stock"
                        sortable
                        body={(rowData) => formatNumber(rowData.stock)}
                        className='text-center'
                        editor={textEditor}></Column>
                    <Column field="price" header="Precio" sortable body={(rowData) => formatCurrency(rowData.price)} className='text-end' editor={textEditor}></Column>
                    <Column field="price" header="Precio" sortable body={subtotalTemplate} className='text-end'></Column>
                    <Column
                        rowEditor
                        headerStyle={{ width: '10%', minWidth: '8rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    ></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default Tablas