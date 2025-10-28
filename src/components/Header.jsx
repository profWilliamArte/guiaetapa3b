import { useCarrito } from "../context/CarritoContext";// 👈

import { Link, useNavigate } from "react-router-dom"
import { FaSun, FaMoon } from 'react-icons/fa'
import { useState } from "react";
import FiltroCategorias from "./Filtrocategorias";

import { FaTable } from "react-icons/fa";

import CarritoModal from "./CarritoModal";
const Header = ({ darkMode, toggleTheme }) => {

    const { carrito } = useCarrito();

    const [txtbuscar, setTxtbuscar] = useState('');
    const manejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    const navigate = useNavigate();

    const manejoEnvio = (event) => {
        event.preventDefault();
        if (!txtbuscar.trim()) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }
        navigate('/busquedas', {
            state: txtbuscar.trim(),
        });
        setTxtbuscar(''); // Opcional: limpiar el input después de enviar

    };
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">DUMMY JSON</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/inicio'} className="nav-link active" aria-current="page" href="#">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/movil'} className="nav-link" href="#">Movil</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/laptop'} className="nav-link" href="#">Laptops</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/tienda'} className="nav-link" href="#">Tienda</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categorias
                                </a>
                                <ul className="dropdown-menu">
                                    <FiltroCategorias />
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={'/tablas'} className="nav-link" href="#">Tablas</Link>
                            </li>

                             <li className="nav-item">
                                <Link to={'/context'} className="nav-link" href="#">Context</Link>
                            </li>
                             <li className="nav-item">
                                <Link to={'/datatable'} className="nav-link" href="#">Datatable</Link>
                            </li>


                        </ul>
                        <form className="d-flex" role="search" onSubmit={manejoEnvio}>
                            <input
                                value={txtbuscar}
                                onChange={manejoTxt}
                                className="form-control me-2"
                                ype="search"
                                placeholder="Buscar"
                                a-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">Ok</button>
                        </form>
                        <button onClick={toggleTheme} className="btn btn-dark btn-sm ">
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>


                    </div>
                </div>
                {carrito.length > 0 && (
                    <button 
                        type="button" 
                        className="btn btn-outline-warning me-2"
                        data-bs-toggle="modal"
                         data-bs-target="#carritoModal">
                            <div className="d-flex justify-content-between align-items-center gap-2">
                                <FaTable /><span className="badge bg-danger m-1">{carrito.length}</span>
                             </div>
                    </button>
                )}


       



            </nav>

       
            <CarritoModal />
        </>

    )
}

export default Header