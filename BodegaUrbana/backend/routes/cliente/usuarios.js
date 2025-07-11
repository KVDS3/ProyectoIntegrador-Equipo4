const express = require('express');
const router = express.Router();
const { promiseDb } = require('../../db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configuración de transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Registro de usuario
router.post('/usuarios', async (req, res) => {
    try {
        const { nombre, apellido, correo, contraseña, direccion, telefono } = req.body;
        
        // Verificar si el correo ya existe
        const [rows] = await promiseDb.query(
            'SELECT * FROM usuarios WHERE correo = ?', 
            [correo]
        );
        
        if (rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        
        // Insertar nuevo usuario
        const [result] = await promiseDb.query(
            'INSERT INTO usuarios (nombre, apellido, correo, contraseña, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, "cliente")',
            [nombre, apellido, correo, hashedPassword, direccion, telefono]
        );

        // Generar código de verificación
        const codigoVerificacion = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Enviar correo de verificación
        await enviarCorreoVerificacion(correo, codigoVerificacion);
        
        res.status(201).json({ 
            id: result.insertId,
            mensaje: 'Usuario registrado. Se ha enviado un código de verificación al correo.'
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            detalle: error.message 
        });
    }
});

// Función para enviar correos de verificación
async function enviarCorreoVerificacion(destinatario, codigo) {
    try {
        const mailOptions = {
            from: `"La Bodega Urbana" <${process.env.EMAIL_USER}>`,
            to: destinatario,
            subject: 'Código de Verificación',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2E8B57;">Verificación de Cuenta</h2>
                    <p>Gracias por registrarte en La Bodega Urbana. Para completar tu registro, ingresa el siguiente código:</p>
                    <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="margin: 0; color: #2E8B57;">${codigo}</h1>
                    </div>
                    <p>Este código expirará en 15 minutos.</p>
                    <p>Si no solicitaste este registro, por favor ignora este mensaje.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Código de verificación enviado a ${destinatario}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw error;
    }
}

// Endpoint para reenviar código
router.post('/usuarios/reenviar-codigo', async (req, res) => {
    try {
        const { correo } = req.body;
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        
        await enviarCorreoVerificacion(correo, codigo);
        
        res.json({ 
            success: true,
            mensaje: 'Nuevo código de verificación enviado'
        });
    } catch (error) {
        console.error('Error al reenviar código:', error);
        res.status(500).json({ 
            error: 'Error al reenviar el código',
            detalle: error.message 
        });
    }
});

// Verificación de código
router.post('/usuarios/verificar', async (req, res) => {
    try {
        const { correo, codigo } = req.body;
        
        // En una implementación real, aquí verificarías el código en la base de datos
        // Este es un ejemplo simplificado que siempre devuelve true
        
        res.json({ 
            verificado: true,
            mensaje: 'Correo verificado exitosamente'
        });
    } catch (error) {
        console.error('Error en verificación:', error);
        res.status(500).json({ 
            error: 'Error al verificar el código',
            detalle: error.message 
        });
    }
});

module.exports = router;