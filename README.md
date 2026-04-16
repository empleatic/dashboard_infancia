# Dashboard Gobernación del Tolima - AMAIA

Este proyecto es un dashboard web que integra un reporte de **Looker Studio** y un agente conversacional (**Dialogflow Messenger**) llamado **AMAIA**. El objetivo es proporcionar una interfaz unificada para la visualización de datos y la asistencia inteligente.

## Características Principales

*   **Integración de Looker Studio**: Visualización de reportes interactivos embebidos.
*   **Agente Conversacional (AMAIA)**: Chatbot integrado mediante Dialogflow Messenger para asistencia en tiempo real.
*   **Gestión de Sesión**: Funcionalidad para reiniciar la sesión del chat y limpiar el historial de conversación.
*   **Diseño Responsivo**: Interfaz adaptable con un diseño limpio y profesional, utilizando los colores institucionales.
*   **Dockerizado**: Configuración lista para despliegue en contenedores (Google Cloud Run) usando Nginx.

## Estructura del Proyecto

*   `index.html`: Estructura principal de la página web.
*   `style.css`: Estilos personalizados para el diseño y la maquetación.
*   `main.js`: Lógica de JavaScript para la interactividad (botón de nueva sesión, carga del chat).
*   `Dockerfile`: Definición de la imagen Docker para el despliegue.
*   `nginx.conf`: Configuración del servidor web Nginx.

## Instrucciones de Despliegue

### Requisitos Previos

*   Docker instalado localmente (para pruebas).
*   Cuenta de Google Cloud Platform (para despliegue en producción).

### Ejecución Local con Docker

1.  **Construir la imagen**:
    ```bash
    docker build -t frontend-dashboard .
    ```

2.  **Correr el contenedor**:
    ```bash
    docker run -p 8080:8080 frontend-dashboard
    ```

3.  **Acceder**: Abre tu navegador en `http://localhost:8080`.

### Despliegue en Google Cloud Run

1.  **Subir la imagen a Container Registry / Artifact Registry**:
    ```bash
    gcloud builds submit --tag gcr.io/PROJECT_ID/frontend-dashboard
    ```

2.  **Desplegar en Cloud Run**:
    ```bash
    gcloud run deploy frontend-dashboard --image gcr.io/PROJECT_ID/frontend-dashboard --platform managed --allow-unauthenticated
    ```

## Configuración de Cloud Build (CI/CD)

Para automatizar el despliegue, se incluye el archivo `cloudbuild.yaml`.
**Permisos Requeridos**: La cuenta de servicio (`753170017712-compute@developer.gserviceaccount.com`) necesita los siguientes roles IAM:

1.  **Cloud Run Admin** (`roles/run.admin`): Para desplegar servicios.
2.  **Service Account User** (`roles/iam.serviceAccountUser`): Para actuar como la cuenta de servicio del runtime.
3.  **Artifact Registry Writer** o **Storage Admin**: Para guardar las imágenes del contenedor.
4.  **Logging Admin** (`roles/logging.admin`): Para guardar los logs del despliegue.

## Notas Adicionales

*   **Micrófono**: La funcionalidad de entrada de audio del chat requiere que el sitio se sirva a través de **HTTPS** (o localhost) debido a las políticas de seguridad de los navegadores.
*   **Configuración de Dialogflow**: El `agent-id` y `project-id` están configurados en el archivo `index.html`. Asegúrese de que correspondan a su agente en Dialogflow CX.
