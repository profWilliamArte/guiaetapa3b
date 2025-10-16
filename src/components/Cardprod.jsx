import { useCarrito } from "../context/CarritoContext"; // 👈
import { Link } from "react-router-dom";
import Modal from "./ModalProd";
import ModalProd from "./ModalProd";

const Cardprod = ({item}) => {

     const { agregarAlCarrito, carrito } = useCarrito();

    // 🔍 Ver si este producto está en el carrito
    const enCarrito = carrito.find(producto => producto.id === item.id);
    return (
        <div className="col-md-4 col-xl-3 mb-3" key={item.id}>
            <div className="card h-100">
                <div className="card-header p-0">
                    {/* 🔹 Badge de cantidad si está en carrito */}
                    {enCarrito && (
                        <span className="position-absolute top-0 end-0 badge rounded-pill text-bg-warning fs-4 m-2">
                            {enCarrito.cantidad}
                        </span>
                    )}
                    <img src={item.thumbnail} alt="" className="img-fluid" />
                </div>
                <div className="card-body text-center">
                    <p className="fs-3">{item.title}</p>
                    <p className="fs-5 text-danger fw-bold">Precio: {item.price}$</p>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={`/detalle/${item.id}/${item.title}`} href="#" className="btn btn-info btn-sm" >Detalle</Link>
                    <div className="mt-2 pt-2 border-top">
                        <button 
                        className="btn btn-success btn-sm ms-3" 
                         onClick={() => agregarAlCarrito(item)}>
                            Agregar al carrito
                        </button>
                    </div>

                </div>
            </div>
            <ModalProd item={item}/>


        </div>
    )
}

export default Cardprod