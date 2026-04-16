/**
 * Lógica principal para el dashboard.
 * Maneja la inicialización del chat y el botón de "Nueva Sesión".
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnReset = document.getElementById('btn-reset');
    const dfMessenger = document.querySelector('df-messenger');

    // ---------------------------------------------------------
    // Ocultar loader del dashboard cuando el iframe cargue
    // ---------------------------------------------------------
    const dashboardIframe = document.querySelector('.dashboard-panel iframe');
    const dashboardLoader = document.querySelector('.dashboard-loader');

    if (dashboardIframe && dashboardLoader) {
        dashboardIframe.addEventListener('load', () => {
            dashboardLoader.style.display = 'none';
            console.log('Dashboard cargado exitosamente');
        });
    }

    // ---------------------------------------------------------
    // Lógica de Inicialización
    // ---------------------------------------------------------

    // Forzar la expansión del chat al cargar la página.
    if (dfMessenger) {
        setTimeout(() => {
            if (!dfMessenger.getAttribute('expand')) {
                dfMessenger.setAttribute('expand', 'true');
            }
            console.log('Intentando forzar expansión del chat...');
        }, 1000);
    }

    // ---------------------------------------------------------
    // Manejo del Botón "Nueva Sesión"
    // ---------------------------------------------------------
    if (btnReset && dfMessenger) {
        btnReset.addEventListener('click', () => {
            // Simulación visual (opcional)
            const wrapper = document.querySelector('.messenger-wrapper');
            if (wrapper) wrapper.style.opacity = '0.5';

            if (dfMessenger.startNewSession) {
                dfMessenger.startNewSession({
                    retainHistory: false
                });
                console.log('Sesión reiniciada exitosamente (startNewSession)');
            } else {
                console.warn('El método startNewSession no está disponible. Intentando limpieza manual.');
                sessionStorage.clear();
                window.location.reload();
            }

            // Restaurar opacidad
            if (wrapper) {
                setTimeout(() => { wrapper.style.opacity = '1'; }, 500);
            }
        });
    } else {
        console.error('Error: No se encontraron los elementos necesarios (btn-reset o df-messenger) en el DOM.');
    }
});

// ---------------------------------------------------------
// Event Listeners del Componente Dialogflow
// ---------------------------------------------------------

window.addEventListener('df-messenger-loaded', () => {
    console.log('Dialogflow Messenger cargado completamente');
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger) {
        dfMessenger.style.display = 'block';
        dfMessenger.setAttribute('expand', 'true');
    }
});

// Manejo de Sesión Expirada
window.addEventListener('df-session-expired', () => {
    console.log('Sesión expirada - Iniciando nueva sesión automáticamente');
    const messenger = document.querySelector('df-messenger');

    if (messenger) {
        messenger.renderCustomText(
            '⚠️ Tu sesión ha expirado por inactividad. Iniciando una nueva sesión...',
            true
        );

        setTimeout(() => {
            messenger.startNewSession({ retainHistory: true });
            console.log('Nueva sesión iniciada después de expiración');
        }, 1500);
    }
});