import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from './routes'

export default function SideBar () {
    return (
        <aside>
            <NavLink to="/" className="brand border-bottom d-block pb-3 text-center">React Bootstrap4 Form Validation</NavLink>
            {
                Routes.map(route => (
                    <div className="my-5 text-center" key={route.group}>
                        <h4 className="text-white pt-2 border-bottom mx-4 pb-2">{ route.group }</h4>
                        { route.routes.map( r => (
                            <NavLink to={`/${route.path}/${r.pathname}`} className="d-block" key={r.pathname}>{ r.text }</NavLink>
                        ))}
                    </div>
                ))
            }
        </aside>
    )
}