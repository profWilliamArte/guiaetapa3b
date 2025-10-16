import { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { formatCurrency, formatNumber } from "../util/funciones";


const CarritoOffcanvas = () => {
    const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, enviarPedido } = useCarrito();
    const [total, setTotal] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);
    }, [carrito]);

    return (
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="d-flex flex-column">
                <div className="offcanvas-header bg-dark text-white">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                        Detalle del Carrito
                    </h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>

                <div className="px-3 py-2 bg-light-subtle border-bottom ">
                    <div className="d-flex justify-content-between mb-1">
                        <span className="fw-semibold">Productos:</span>
                        <span>{carrito.length}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                        <span className="fw-semibold">Total de ítems:</span>
                        <span>{formatNumber(carrito.reduce((acc, item) => acc + item.cantidad, 0))}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                        <span className="fw-bold">Total a pagar:</span>
                        <span className="fs-5 text-danger fw-bold">
                            ${formatCurrency(total.toFixed(2))}
                        </span>
                    </div>
                </div>
            </div>
            <div className="offcanvas-body">

                {carrito.length === 0 ? (
                    <p className="text-center">Tu carrito está vacío</p>
                ) : (
                    <>
                        {carrito.map((item, index) => (

                         
                            <div key={index} className='card mb-3'>
                                <div className='card-header p-0 text-center'>
                                    <img src={item.thumbnail} alt={item.title} className="img-fluid mb-2" />
                                </div>
                                <div className='card-body text-center'>
                                    <p className='fs-4'><strong>{item.title}</strong></p>
                                    <p className='text-warning fw-bold'>Precio: ${formatCurrency(item.price)} x {item.cantidad} = ${formatCurrency((item.price * item.cantidad).toFixed(2))}</p>
                                </div>
                                <div className='card-footer text-center'>
                                    <div className="d-flex justify-content-center gap-3">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                        >
                                            + Agregar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                        >
                                            - Restar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarDelCarrito(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                           



                        ))}
                        <hr />
                        <div className="text-end">
                            <p><strong>Total Productos:</strong> {formatNumber(carrito.reduce((acc, item) => acc + item.cantidad, 0))}</p>
                            <p><strong>Total a Pagar:</strong> ${formatCurrency(total.toFixed(2))}</p>
                        </div>
                        <div className="mt-3">
                            <button
                                className="btn btn-danger w-100 mb-2"
                                onClick={vaciarCarrito}
                            >
                                Vaciar Carrito
                            </button>
                            <button onClick={enviarPedido} className="btn btn-primary w-100">
                                📤 Enviar Pedido
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>

    )
}

export default CarritoOffcanvas