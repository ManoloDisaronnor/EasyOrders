import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const TemaContext = createContext();

// Proveer el contexto en un componente de alto nivel
export const TemaProvider = ({ children }) => {
    // Cargar la preferencia de tema desde localStorage o usar claro por defecto
    const [temaOscuro, setTemaOscuro] = useState(() => {
        return localStorage.getItem('temaOscuro') === 'true'; // Convertir a booleano
    });

    const [colorFondo, setColorFondo] = useState(temaOscuro ? '#332d2d' : '#FFFFFF');
    const [colorTexto, setColorTexto] = useState(temaOscuro ? '#FFFFFF' : '#000000');
    const [colorIcono, setColorIcono] = useState(temaOscuro ? '#FFFFFF' : '#24c55e');

    const toggleTema = () => {
        setTemaOscuro(prevTema => {
            const nuevoTema = !prevTema;
            localStorage.setItem('temaOscuro', nuevoTema); // Guardar en localStorage
            return nuevoTema;
        });
    };

    // Efecto para actualizar los colores cada vez que cambia el tema
    useEffect(() => {
        setColorFondo(temaOscuro ? '#332d2d' : '#FFFFFF');
        setColorTexto(temaOscuro ? '#FFFFFF' : '#000000');
        setColorIcono(temaOscuro ? '#FFFFFF' : '#24c55e');
    }, [temaOscuro]);

    return (
        <TemaContext.Provider value={{ temaOscuro, colorFondo, colorTexto, colorIcono, toggleTema }}>
            {children}
        </TemaContext.Provider>
    );
};

// Hook para acceder al contexto
export const useTema = () => {
    return useContext(TemaContext);
};