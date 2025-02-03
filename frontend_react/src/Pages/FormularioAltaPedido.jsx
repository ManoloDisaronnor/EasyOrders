import { Box, InputAdornment, TextField } from "@mui/material";
import * as React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useTema } from "../Componentes/TemaProvider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function FormularioAltaPedido() {
    const { colorFondo, colorTexto, colorIcono } = useTema();

    const estilosTextField = {
        '& .MuiInputLabel-root': {
            color: colorTexto,
        },
        '& .MuiInput-underline:before': {
            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
        },
        '& .MuiInput-underline:after': {
            borderBottom: colorFondo === '#FFFFFF' ? '2px solid #24c55e' : '2px solid #ffffff',
        },
        '& .MuiPickersCalendarHeader-label': {
            color: colorTexto,
        },
        '& .MuiDayPicker-weekDayLabel': {
            color: colorTexto,
        },
    };

    return (
        <Box sx={{ p: 5 }}>
            <TextField
                id="nombreUsuarioCliente"
                label="Nombre de usuario"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <CalendarMonthIcon sx={{ color: colorIcono }} />
                            </InputAdornment>
                        ),
                        sx: { color: colorTexto }
                    },
                }}
                variant="standard"
                color={colorFondo === '#FFFFFF' ? 'success' : 'default'}
                focused
                fullWidth
                type="date"
                sx={estilosTextField}
            />

            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es" // Asegura el formato español (DD/MM/YYYY)
                localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} // Traducir el texto del picker
            >
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label="Fecha de recogida"
                        format="DD/MM/YYYY" // Cambia el orden a Día/Mes/Año
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    );
}

export default FormularioAltaPedido;