import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from './routes'

export default function SideBar () {
    function handleClick(){
        if(window.innerWidth <= 728){
            document.querySelector("aside").classList.remove("active");
        }
    }

    function toggleMenu(){
        if(window.innerWidth <= 728){
            document.querySelector("aside").classList.toggle("active");
        }
    }

    return (
        <aside>
            <div>
                <button className="btn btn-link toggle-menu" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
                </button>
                <NavLink to="/" className="menu-brand">React Bootstrap4 Form Validation</NavLink>
            </div>

            <div className="nav-bar">
            <NavLink to="/" className="brand border-bottom d-block pb-3 text-center">React Bootstrap4 Form Validation</NavLink>
            {
                Object.keys(Routes).map(key => {
                    let route = Routes[key];
                    return <div className="my-5 text-center" key={route.group}>
                        <h4 className="text-white pt-2 border-bottom mx-4 pb-2">{ route.group }</h4>
                        { route.routes.map( r => (
                            <NavLink to={`/${route.path}/${r.pathname}`} className="d-block" key={r.pathname} onClick={handleClick}>{ r.text }</NavLink>
                        ))}
                    </div>
                })
            }
            </div>

        </aside>
    )
}