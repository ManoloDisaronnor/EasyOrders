import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const TemaContext = createContext();

// Proveer el contexto en un componente de alto nivel
export const TemaProvider = ({ children }) => {
    const [temaOscuro, setTemaOscuro] = useState(false);
    const [colorFondo, setColorFondo] = useState('#FFFFFF');
    const [colorTexto, setColorTexto] = useState('#000000');
    const [colorIcono, setColorIcono] = useState('#24c55e');

    const toggleTema = () => {
        setTemaOscuro(!temaOscuro);
    };

    // Cambiar los colores según el tema
    useEffect(() => {
        if (temaOscuro) {
            setColorFondo('#332d2d');
            setColorTexto('#FFFFFF');
            setColorIcono('#FFFFFF');
        } else {
            setColorFondo('#FFFFFF');
            setColorTexto('#000000');
            setColorIcono('#24c55e');
        }
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