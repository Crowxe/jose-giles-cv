document.addEventListener('DOMContentLoaded', function() {
  // Verificamos si tenemos una URL secreta para edición
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('secret_edit') === 'jose123';
  
  if (isEditMode) {
    enableEditMode();
  }
  // Eliminamos el botón de edición en modo normal de visualización
  
  // Inicializar el selector de idioma
  initLanguageSelector();
});

function enableEditMode() {
  // Añadir botón para guardar cambios
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guardar Cambios';
  saveButton.id = 'save-button';
  saveButton.addEventListener('click', saveChanges);
  document.body.appendChild(saveButton);
  
  // Añadir botón para cancelar edición
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancelar';
  cancelButton.id = 'cancel-button';
  cancelButton.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
      window.location.href = window.location.pathname;
    }
  });
  document.body.appendChild(cancelButton);
  
  // Hacer que todos los elementos de texto sean editables
  const editableElements = document.querySelectorAll('h1, h2, h3, p, li');
  editableElements.forEach(element => {
    element.contentEditable = true;
    element.classList.add('editable');
  });
  
  // Añadir botón para agregar nueva experiencia laboral
  const workExperienceSection = document.querySelector('.work-experience');
  const addJobButton = document.createElement('button');
  addJobButton.textContent = 'Añadir Experiencia';
  addJobButton.id = 'add-job-button';
  addJobButton.addEventListener('click', addNewJob);
  workExperienceSection.appendChild(addJobButton);
  
  // Añadir botones para eliminar experiencias laborales
  const jobs = document.querySelectorAll('.job');
  jobs.forEach(job => {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-job-button';
    deleteButton.addEventListener('click', function() {
      if (confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
        job.remove();
      }
    });
    job.appendChild(deleteButton);
  });
  
  // Añadir estilos para el modo edición
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .editable {
      border: 1px dashed #ccc;
      padding: 5px;
      margin: 2px;
      border-radius: 3px;
      transition: background-color 0.2s, box-shadow 0.2s;
    }
    .editable:hover {
      background-color: #f9f9f9;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .editable:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    }
    #edit-button, #save-button, #cancel-button, #add-job-button, .delete-job-button, .add-item-button {
      padding: 8px 15px;
      margin: 5px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    #edit-button, #add-job-button {
      background-color: #3498db;
      color: white;
    }
    #edit-button:hover, #add-job-button:hover {
      background-color: #2980b9;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    #save-button {
      background-color: #2ecc71;
      color: white;
      position: fixed;
      bottom: 20px;
      right: 90px;
      z-index: 1000;
    }
    #save-button:hover {
      background-color: #27ae60;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    #cancel-button {
      background-color: #e74c3c;
      color: white;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
    #cancel-button:hover {
      background-color: #c0392b;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .delete-job-button {
      background-color: #e74c3c;
      color: white;
      font-size: 12px;
      margin-top: 10px;
    }
    .delete-job-button:hover {
      background-color: #c0392b;
    }
    .add-item-button {
      background-color: #3498db;
      color: white;
      margin-top: 10px;
      font-size: 12px;
    }
    .add-item-button:hover {
      background-color: #2980b9;
    }
  `;
  document.head.appendChild(styleElement);
}

function addNewJob() {
  const jobsContainer = document.querySelector('.work-experience');
  
  // Crear nueva estructura de trabajo
  const newJob = document.createElement('div');
  newJob.className = 'job';
  
  newJob.innerHTML = `
    <div class="timeline">
      <div class="dot"></div>
      <div class="job-date" contenteditable="true">Fecha Inicio - Fecha Fin</div>
    </div>
    <div class="job-details">
      <h3 contenteditable="true">Título del Puesto - Nombre de la Empresa</h3>
      <p class="job-location" contenteditable="true">Ubicación</p>
      <ul>
        <li contenteditable="true">Descripción de la responsabilidad o logro</li>
        <li contenteditable="true">Añade otra responsabilidad o logro</li>
      </ul>
    </div>
  `;
  
  // Añadir botón para eliminar esta nueva experiencia
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.className = 'delete-job-button';
  deleteButton.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
      newJob.remove();
    }
  });
  newJob.appendChild(deleteButton);
  
  // Añadir botón para agregar nuevos ítems a la lista
  const addItemButton = document.createElement('button');
  addItemButton.textContent = 'Añadir ítem';
  addItemButton.className = 'add-item-button';
  
  addItemButton.addEventListener('click', function() {
    const ul = newJob.querySelector('ul');
    const li = document.createElement('li');
    li.contentEditable = true;
    li.classList.add('editable');
    li.textContent = 'Nueva responsabilidad o logro';
    ul.appendChild(li);
  });
  
  newJob.querySelector('.job-details').appendChild(addItemButton);
  
  // Hacer que los elementos sean editables
  const editableElements = newJob.querySelectorAll('h3, p, li');
  editableElements.forEach(element => {
    element.classList.add('editable');
  });
  
  // Insertar antes del botón "Añadir Experiencia"
  jobsContainer.insertBefore(newJob, document.getElementById('add-job-button'));
}

function saveChanges() {
  // Desactivar el modo edición
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    element.contentEditable = false;
    element.classList.remove('editable');
  });
  
  // Eliminar botones de edición
  const buttonsToRemove = document.querySelectorAll('#save-button, #cancel-button, #add-job-button, .delete-job-button, .add-item-button');
  buttonsToRemove.forEach(button => button.remove());
  
  // Mostrar mensaje de éxito
  alert('Cambios guardados correctamente');
  
  // Redirigir a la versión sin edición
  window.location.href = window.location.pathname;
  
  // Nota: En una implementación real, aquí se enviarían los datos al servidor
  // para guardarlos permanentemente
}

// Traducción - objeto con todos los textos traducibles
const translations = {
  en: {
    // Sidebar
    aboutMeTitle: "ABOUT ME",
    aboutMeContent: "Passionate and committed Full Stack Developer with over 7 years of experience in web technologies. Skilled in Java, JavaScript, Angular, PHP, Python, SQL and NoSQL databases, HTML, CSS and Unix systems. Focused on web application development, with expertise in container-based technologies such as Docker, and virtualization. Strong analytical and a results-oriented approach, enjoy working in a team and collaborating with other professionals to achieve common goals.",
    educationTitle: "EDUCATION",
    educationDegree: "Systems Analyst",
    educationInstitution: "Universidad Tecnológica Nacional (UTN)",
    educationDate: "2015 - 2018",
    technicalSkillsTitle: "TECHNICAL SKILLS",
    languagesTitle: "Languages",
    frameworksTitle: "Frameworks",
    databasesTitle: "Databases",
    devopsTitle: "DevOps / Cloud",
    architectureTitle: "Architecture",
    linksTitle: "LINKS",
    linkedinText: "LinkedIn: ",
    languagesLabel: "LANGUAGES",
    englishText: "ENGLISH",
    spanishText: "SPANISH",
    
    // Main content
    fullName: "JOSÉ GILES",
    contactLocation: "Argentina, Mar del Plata, 7600",
    contactPhone: "+54 223 6344021",
    contactEmail: "crowiejose@gmail.com",
    jobTitle: "FULL STACK DEVELOPER",
    workExperienceTitle: "WORK EXPERIENCE",
    featuredProjectTitle: "Featured Project: ",
    
    // Job 1 - Assessment Systems
    job1Title: "Full Stack Developer - Assessment Systems Corporation",
    job1Location: "United States (Remote)",
    job1Date: "Jan 2024 - Present",
    job1Responsibilities: [
      "Led the end-to-end development of a new E-Commerce application, leveraging a modern and scalable technology stack",
      "Designed and implemented the core backend architecture using Java 17, handling business logic and primary database interactions",
      "Built the frontend with Angular 17, creating a responsive and intuitive user interface for the E-Commerce platform",
      "Implemented event-driven architecture patterns for real-time inventory updates and order processing",
      "Integrated with AWS services for transactional email (email templates) and file storage management (S3)",
      "Developed a custom reporting module with Google Sheets API integration, enabling real-time export and synchronization of assessment data for client analysis and visualization",
      "Modeled and managed the application's database using PostgreSQL",
      "Actively participated throughout the full software development lifecycle, from conception to deployment and maintenance",
      "Key technologies used: Java 17, Angular 17, AWS (SES, S3), PostgreSQL, Event-Driven Architecture, Google Cloud Platform (GCP), Google Sheets API"
    ],
    job1ProjectTitle: "E-Commerce Assessment Platform",
    job1ProjectDesc: "Architected and implemented a scalable assessment e-commerce platform that manages product catalogs, secure payments, and digital delivery of assessment materials. Implemented a microservices architecture focused on high availability and security compliance.",
    
    // Job 2 - Tecso
    job2Title: "Fullstack Developer - Tecso",
    job2Location: "Argentina (Outsourced to REBA Fintech)",
    job2Date: "Jul 2023 - Jan 2024",
    job2Responsibilities: [
      "Participated in the development of a virtual wallet application within the Fintech sector, as part of an outsourced team working for REBA",
      "Developed and maintained the core backend platform using Java 11 and Spring Boot, implementing the main business logic and transaction processing",
      "Built additional Python data processing components with NumPy and scikit-learn specifically for the fraud detection module, complementing the main Java services",
      "Created a specialized high-throughput service in Go for real-time payment status updates, where low latency was critical",
      "Utilized Docker for containerization of application services within the existing infrastructure",
      "Enhanced and built new components for the user interface with React",
      "Involved in deploying application services on AWS EC2 instances and monitoring performance using AWS CloudWatch",
      "Key technologies used: Java 11 (primary), Spring Boot, Python (scikit-learn) and Go for specialized services, React, PostgreSQL, Docker, AWS (EC2, CloudWatch)"
    ],
    job2ProjectTitle: "REBA Transaction Processing Service",
    job2ProjectDesc: "Designed and implemented a high-throughput transaction processing service capable of handling thousands of concurrent financial operations with strict consistency requirements. Implemented circuit breakers and fallback mechanisms to ensure system resilience.",
    
    // Job 3 - C&S Informática
    job3Title: "Full Stack Developer - C&S Informática",
    job3Location: "Argentina (Outsourced to YPF - Flexibility)",
    job3Date: "May 2022 - Jul 2023",
    job3Responsibilities: [
      "Developed and maintained a suite of Java microservices for the Virtual Wallet functionality within the large-scale YPF mobile application, as part of an outsourced team working for Flexibility",
      "Worked across the full stack, contributing to primary Java backend services and frontend components",
      "Designed and implemented core services using Java with Spring Boot for central business logic and transaction processing",
      "Supported the team in developing a specialized high-performance microservice in Go, specifically for handling real-time loyalty points calculations where concurrency and speed were critical",
      "Helped create a targeted Python microservice using Flask and SQLAlchemy for generating executive reports and analytics dashboards",
      "Contributed to the Angular frontend, integrating with various backend microservices",
      "Utilized Docker for containerizing microservices, facilitating consistent development and deployment workflows",
      "Gained experience with Kubernetes for orchestrating containerized microservices in production environments",
      "Involved in deploying and managing microservices on AWS, using services like ECS for orchestration, SQS for message queuing between services, and CloudWatch for monitoring",
      "Collaborated within a team environment following Agile methodologies",
      "Key technologies used: Java (Spring Boot) as primary language, Go and Python (Flask, SQLAlchemy) for specialized services, Angular, Microservices Architecture, Docker, Kubernetes, AWS (ECS, SQS, CloudWatch)"
    ],
    
    // Job 4 - Infosis
    job4Title: "Full Stack Developer - Infosis",
    job4Location: "Argentina",
    job4Date: "Nov 2018 - Oct 2021",
    job4Responsibilities: [
      "Worked on a team developing a comprehensive business management system with Java as the primary technology stack, including modules for electronic invoicing, inventory control, accounting, CRM, sales management, purchasing, and financial reporting",
      "Collaborated in the migration from a monolithic Java system to a microservices architecture, focusing on components such as report generation and user authentication",
      "Developed core backend services using Java and Spring Boot, working across multiple business modules as needed",
      "Contributed to a specialized real-time notification service written in Go, selected specifically for its superior performance in handling concurrent connections for time-sensitive alerts",
      "Built user interface components with React and Vaadin frameworks for different modules of the business platform",
      "Implemented message queuing using RabbitMQ to establish communication between different business modules",
      "Wrote and optimized SQL queries for SQL Server databases to support business operations across various functional areas",
      "Applied containerization with Docker and deployed applications to AWS",
      "Participated in Agile ceremonies and took on responsibility in planning and execution of new features",
      "In the final year, mentored new team members and took ownership of feature implementations across different modules",
      "Key technologies used: Java (Spring Boot) as primary language, Go for specialized real-time services, React, Vaadin, SQL Server, RabbitMQ, Docker, AWS (EC2, S3)"
    ],
    
    // Job 5 - Núcleo Computación
    job5Title: "Frontend Developer - Núcleo Computación",
    job5Location: "Argentina",
    job5Date: "Mar 2018 - Oct 2018",
    job5Responsibilities: [
      "Assisted in the maintenance and minor updates of the company website as my first professional role in web development",
      "Created and updated HTML pages and CSS styles",
      "Implemented JavaScript functionality to enhance user interactions on the website",
      "Helped optimize website images and assets for improved loading times",
      "Gained experience with responsive design techniques for mobile and desktop compatibility",
      "Contributed to regular content updates",
      "Key technologies used: HTML, CSS, JavaScript, Responsive Design"
    ],
    
    // Specific to jobs
    present: "Present"
  },
  es: {
    // Sidebar
    aboutMeTitle: "SOBRE MÍ",
    aboutMeContent: "Desarrollador Full Stack apasionado y comprometido con más de 7 años de experiencia en tecnologías web. Habilidades en Java, JavaScript, Angular, PHP, Python, bases de datos SQL y NoSQL, HTML, CSS y sistemas Unix. Enfocado en el desarrollo de aplicaciones web, con experiencia en tecnologías basadas en contenedores como Docker y virtualización. Enfoque analítico y orientado a resultados, disfruto trabajando en equipo y colaborando con otros profesionales para lograr objetivos comunes.",
    educationTitle: "EDUCACIÓN",
    educationDegree: "Analista de Sistemas",
    educationInstitution: "Universidad Tecnológica Nacional (UTN)",
    educationDate: "2015 - 2018",
    technicalSkillsTitle: "HABILIDADES TÉCNICAS",
    languagesTitle: "Lenguajes",
    frameworksTitle: "Frameworks",
    databasesTitle: "Bases de Datos",
    devopsTitle: "DevOps / Cloud",
    architectureTitle: "Arquitectura",
    linksTitle: "ENLACES",
    linkedinText: "LinkedIn: ",
    languagesLabel: "IDIOMAS",
    englishText: "INGLÉS",
    spanishText: "ESPAÑOL",
    
    // Main content
    fullName: "JOSÉ GILES",
    contactLocation: "Argentina, Mar del Plata, 7600",
    contactPhone: "+54 223 6344021",
    contactEmail: "crowiejose@gmail.com",
    jobTitle: "DESARROLLADOR FULL STACK",
    workExperienceTitle: "EXPERIENCIA LABORAL",
    featuredProjectTitle: "Proyecto Destacado: ",
    
    // Job 1 - Assessment Systems
    job1Title: "Desarrollador Full Stack - Assessment Systems Corporation",
    job1Location: "Estados Unidos (Remoto)",
    job1Date: "Ene 2024 - Presente",
    job1Responsibilities: [
      "Lideré el desarrollo completo de una nueva aplicación de comercio electrónico, utilizando una pila tecnológica moderna y escalable",
      "Diseñé e implementé la arquitectura backend principal usando Java 17, manejando la lógica de negocio y las interacciones con la base de datos",
      "Construí el frontend con Angular 17, creando una interfaz de usuario responsiva e intuitiva para la plataforma de comercio electrónico",
      "Implementé patrones de arquitectura dirigida por eventos para actualizaciones de inventario y procesamiento de pedidos en tiempo real",
      "Integré con servicios AWS para correo electrónico transaccional (plantillas de correo) y gestión de almacenamiento de archivos (S3)",
      "Desarrollé un módulo de informes personalizado con integración de Google Sheets API, permitiendo la exportación y sincronización en tiempo real de datos de evaluación para análisis y visualización de clientes",
      "Modelé y gestioné la base de datos de la aplicación usando PostgreSQL",
      "Participé activamente en todo el ciclo de vida del desarrollo de software, desde la concepción hasta el despliegue y mantenimiento",
      "Tecnologías principales utilizadas: Java 17, Angular 17, AWS (SES, S3), PostgreSQL, Arquitectura dirigida por eventos, Google Cloud Platform (GCP), Google Sheets API"
    ],
    job1ProjectTitle: "Plataforma de Evaluación E-Commerce",
    job1ProjectDesc: "Arquitectura e implementación de una plataforma escalable de comercio electrónico para evaluaciones que gestiona catálogos de productos, pagos seguros y entrega digital de materiales de evaluación. Implementé una arquitectura de microservicios enfocada en alta disponibilidad y cumplimiento de seguridad.",
    
    // Job 2 - Tecso
    job2Title: "Desarrollador Fullstack - Tecso",
    job2Location: "Argentina (Externalizado a REBA Fintech)",
    job2Date: "Jul 2023 - Ene 2024",
    job2Responsibilities: [
      "Participé en el desarrollo de una aplicación de billetera virtual en el sector Fintech, como parte de un equipo externalizado trabajando para REBA",
      "Desarrollé y mantuve la plataforma backend principal utilizando Java 11 y Spring Boot, implementando la lógica de negocio principal y procesamiento de transacciones",
      "Construí componentes adicionales de procesamiento de datos en Python con NumPy y scikit-learn específicamente para el módulo de detección de fraude, complementando los servicios principales de Java",
      "Creé un servicio especializado de alto rendimiento en Go para actualizaciones de estado de pagos en tiempo real, donde la baja latencia era crítica",
      "Utilicé Docker para la contenerización de servicios de aplicaciones dentro de la infraestructura existente",
      "Mejoré y construí nuevos componentes para la interfaz de usuario con React",
      "Participé en el despliegue de servicios de aplicaciones en instancias AWS EC2 y monitoreo de rendimiento usando AWS CloudWatch",
      "Tecnologías principales utilizadas: Java 11 (principal), Spring Boot, Python (scikit-learn) y Go para servicios especializados, React, PostgreSQL, Docker, AWS (EC2, CloudWatch)"
    ],
    job2ProjectTitle: "Servicio de Procesamiento de Transacciones REBA",
    job2ProjectDesc: "Diseñé e implementé un servicio de procesamiento de transacciones de alto rendimiento capaz de manejar miles de operaciones financieras concurrentes con requisitos estrictos de consistencia. Implementé circuit breakers y mecanismos de respaldo para garantizar la resiliencia del sistema.",
    
    // Job 3 - C&S Informática
    job3Title: "Desarrollador Full Stack - C&S Informática",
    job3Location: "Argentina (Externalizado a YPF - Flexibility)",
    job3Date: "May 2022 - Jul 2023",
    job3Responsibilities: [
      "Desarrollé y mantuve un conjunto de microservicios Java para la funcionalidad de Billetera Virtual dentro de la aplicación móvil de YPF a gran escala, como parte de un equipo externalizado trabajando para Flexibility",
      "Trabajé en toda la pila tecnológica, contribuyendo a los servicios backend principales de Java y componentes frontend",
      "Diseñé e implementé servicios centrales utilizando Java con Spring Boot para la lógica de negocio central y procesamiento de transacciones",
      "Apoyé al equipo en el desarrollo de un microservicio especializado de alto rendimiento en Go, específicamente para manejar cálculos de puntos de fidelidad en tiempo real donde la concurrencia y la velocidad eran críticas",
      "Ayudé a crear un microservicio Python específico utilizando Flask y SQLAlchemy para generar informes ejecutivos y paneles de análisis",
      "Contribuí al frontend Angular, integrándolo con varios microservicios backend",
      "Utilicé Docker para contenerizar microservicios, facilitando flujos de trabajo consistentes de desarrollo y despliegue",
      "Adquirí experiencia con Kubernetes para orquestar microservicios contenerizados en entornos de producción",
      "Participé en el despliegue y gestión de microservicios en AWS, utilizando servicios como ECS para orquestación, SQS para colas de mensajes entre servicios y CloudWatch para monitoreo",
      "Colaboré en un entorno de equipo siguiendo metodologías Ágiles",
      "Tecnologías principales utilizadas: Java (Spring Boot) como lenguaje principal, Go y Python (Flask, SQLAlchemy) para servicios especializados, Angular, Arquitectura de Microservicios, Docker, Kubernetes, AWS (ECS, SQS, CloudWatch)"
    ],
    
    // Job 4 - Infosis
    job4Title: "Desarrollador Full Stack - Infosis",
    job4Location: "Argentina",
    job4Date: "Nov 2018 - Oct 2021",
    job4Responsibilities: [
      "Trabajé en un equipo desarrollando un sistema integral de gestión empresarial con Java como la pila tecnológica principal, incluyendo módulos para facturación electrónica, control de inventario, contabilidad, CRM, gestión de ventas, compras e informes financieros",
      "Colaboré en la migración de un sistema Java monolítico a una arquitectura de microservicios, centrándome en componentes como generación de informes y autenticación de usuarios",
      "Desarrollé servicios backend principales utilizando Java y Spring Boot, trabajando en múltiples módulos de negocio según fue necesario",
      "Contribuí a un servicio especializado de notificaciones en tiempo real escrito en Go, seleccionado específicamente por su rendimiento superior en el manejo de conexiones concurrentes para alertas sensibles al tiempo",
      "Construí componentes de interfaz de usuario con los frameworks React y Vaadin para diferentes módulos de la plataforma de negocio",
      "Implementé colas de mensajes utilizando RabbitMQ para establecer comunicación entre diferentes módulos de negocio",
      "Escribí y optimicé consultas SQL para bases de datos SQL Server para soportar operaciones de negocio en varias áreas funcionales",
      "Apliqué contenerización con Docker y desplegué aplicaciones en AWS",
      "Participé en ceremonias Ágiles y asumí responsabilidad en la planificación y ejecución de nuevas funcionalidades",
      "En el último año, mentorizé a nuevos miembros del equipo y tomé responsabilidad de implementaciones de funcionalidades en diferentes módulos",
      "Tecnologías principales utilizadas: Java (Spring Boot) como lenguaje principal, Go para servicios especializados en tiempo real, React, Vaadin, SQL Server, RabbitMQ, Docker, AWS (EC2, S3)"
    ],
    
    // Job 5 - Núcleo Computación
    job5Title: "Desarrollador Frontend - Núcleo Computación",
    job5Location: "Argentina",
    job5Date: "Mar 2018 - Oct 2018",
    job5Responsibilities: [
      "Asistí en el mantenimiento y actualizaciones menores del sitio web de la empresa como mi primer rol profesional en desarrollo web",
      "Creé y actualicé páginas HTML y estilos CSS",
      "Implementé funcionalidad JavaScript para mejorar las interacciones de los usuarios en el sitio web",
      "Ayudé a optimizar imágenes y recursos del sitio web para mejorar los tiempos de carga",
      "Adquirí experiencia con técnicas de diseño responsivo para compatibilidad móvil y de escritorio",
      "Contribuí a actualizaciones regulares de contenido",
      "Tecnologías principales utilizadas: HTML, CSS, JavaScript, Diseño Responsivo"
    ],
    
    // Specific to jobs
    present: "Presente"
  }
};

// Inicializar el selector de idioma
function initLanguageSelector() {
  const languageButton = document.getElementById('toggle-language');
  
  // Por defecto, usamos inglés
  let currentLanguage = 'en';
  
  // Verificar si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem('cvLanguage');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    applyTranslation(currentLanguage);
  }
  
  // Evento para cambiar el idioma
  languageButton.addEventListener('click', function() {
    // Cambiar al otro idioma
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    
    // Guardar preferencia en localStorage
    localStorage.setItem('cvLanguage', currentLanguage);
    
    // Aplicar traducciones
    applyTranslation(currentLanguage);
  });
}

// Aplicar la traducción según el idioma seleccionado
function applyTranslation(language) {
  // Actualizar el texto del botón
  const languageButton = document.getElementById('toggle-language');
  languageButton.innerHTML = '<i class="fas fa-language"></i> ' + 
    (language === 'en' ? 'Español' : 'English');
  
  const elements = {
    // Sidebar elements
    aboutMeTitle: document.querySelector('.about h2'),
    aboutMeContent: document.querySelector('.about p'),
    educationTitle: document.querySelector('.education h2'),
    educationDegree: document.querySelector('.education-title strong'),
    educationInstitution: document.querySelector('.education-institution'),
    educationDate: document.querySelector('.education-date'),
    technicalSkillsTitle: document.querySelector('.skills h2'),
    skillsLanguagesTitle: document.querySelector('.skills .skill-category:nth-child(1) h3'),
    frameworksTitle: document.querySelector('.skills .skill-category:nth-child(2) h3'),
    databasesTitle: document.querySelector('.skills .skill-category:nth-child(3) h3'),
    devopsTitle: document.querySelector('.skills .skill-category:nth-child(4) h3'),
    architectureTitle: document.querySelector('.skills .skill-category:nth-child(5) h3'),
    linksTitle: document.querySelector('.links h2'),
    languagesLabel: document.querySelector('.languages h2'),
    englishText: document.querySelector('.languages p:first-child'),
    spanishText: document.querySelector('.languages p:last-child'),
    
    // Main content elements
    fullName: document.querySelector('.header-text h1'),
    contactLocation: document.querySelector('.contact-info p:first-child'),
    contactPhone: document.querySelector('.contact-info p:nth-child(2)'),
    contactEmail: document.querySelector('.contact-info p:nth-child(3)'),
    jobTitle: document.querySelector('.subtitle'),
    workExperienceTitle: document.querySelector('.work-experience h2')
  };
  
  // Traducción de elementos estáticos
  if (elements.aboutMeTitle) elements.aboutMeTitle.textContent = translations[language].aboutMeTitle;
  if (elements.aboutMeContent) elements.aboutMeContent.textContent = translations[language].aboutMeContent;
  if (elements.educationTitle) elements.educationTitle.textContent = translations[language].educationTitle;
  if (elements.educationDegree) elements.educationDegree.textContent = translations[language].educationDegree;
  if (elements.educationInstitution) elements.educationInstitution.textContent = translations[language].educationInstitution;
  if (elements.educationDate) elements.educationDate.textContent = translations[language].educationDate;
  if (elements.technicalSkillsTitle) elements.technicalSkillsTitle.textContent = translations[language].technicalSkillsTitle;
  if (elements.skillsLanguagesTitle) elements.skillsLanguagesTitle.textContent = translations[language].languagesTitle;
  if (elements.frameworksTitle) elements.frameworksTitle.textContent = translations[language].frameworksTitle;
  if (elements.databasesTitle) elements.databasesTitle.textContent = translations[language].databasesTitle;
  if (elements.devopsTitle) elements.devopsTitle.textContent = translations[language].devopsTitle;
  if (elements.architectureTitle) elements.architectureTitle.textContent = translations[language].architectureTitle;
  if (elements.linksTitle) elements.linksTitle.textContent = translations[language].linksTitle;
  if (elements.languagesLabel) elements.languagesLabel.textContent = translations[language].languagesLabel;
  if (elements.englishText) elements.englishText.textContent = translations[language].englishText;
  if (elements.spanishText) elements.spanishText.textContent = translations[language].spanishText;
  if (elements.fullName) elements.fullName.textContent = translations[language].fullName;
  if (elements.jobTitle) elements.jobTitle.textContent = translations[language].jobTitle;
  if (elements.workExperienceTitle) elements.workExperienceTitle.textContent = translations[language].workExperienceTitle;
  
  // Modificar contactos manteniendo los íconos
  if (elements.contactLocation) {
    const icon = elements.contactLocation.innerHTML.split('</i>')[0] + '</i> ';
    elements.contactLocation.innerHTML = icon + translations[language].contactLocation;
  }
  
  if (elements.contactPhone) {
    const icon = elements.contactPhone.innerHTML.split('</i>')[0] + '</i> ';
    elements.contactPhone.innerHTML = icon + translations[language].contactPhone;
  }
  
  if (elements.contactEmail) {
    const icon = elements.contactEmail.innerHTML.split('</i>')[0] + '</i> ';
    elements.contactEmail.innerHTML = icon + translations[language].contactEmail;
  }
  
  // Traducir LinkedIn
  const linkedInElement = document.querySelector('.links p');
  if (linkedInElement) {
    const linkedInLink = linkedInElement.querySelector('a');
    const linkHref = linkedInLink ? linkedInLink.outerHTML : '';
    linkedInElement.innerHTML = translations[language].linkedinText + linkHref;
  }
  
  // Obtener todas las experiencias laborales
  const jobs = document.querySelectorAll('.job');
  
  // Traducir cada experiencia laboral
  jobs.forEach((job, index) => {
    const jobNum = index + 1;
    const jobDate = job.querySelector('.job-date');
    const jobTitle = job.querySelector('h3');
    const jobLocation = job.querySelector('.job-location');
    const jobItems = job.querySelectorAll('li');
    const featuredProject = job.querySelector('.featured-project h4');
    const projectDesc = job.querySelector('.featured-project p');
    
    // Validar que tengamos traducciones para esta experiencia
    if (translations[language][`job${jobNum}Title`]) {
      if (jobTitle) jobTitle.textContent = translations[language][`job${jobNum}Title`];
      if (jobLocation) jobLocation.textContent = translations[language][`job${jobNum}Location`];
      
      // Traducir fecha reemplazando "Present" o "Presente"
      if (jobDate) {
        if (language === 'es') {
          jobDate.textContent = translations[language][`job${jobNum}Date`];
        } else {
          jobDate.textContent = translations[language][`job${jobNum}Date`];
        }
      }
      
      // Traducir los items de la lista
      if (jobItems.length > 0 && translations[language][`job${jobNum}Responsibilities`]) {
        const responsibilities = translations[language][`job${jobNum}Responsibilities`];
        jobItems.forEach((item, i) => {
          if (responsibilities[i]) {
            item.textContent = responsibilities[i];
          }
        });
      }
      
      // Traducir el proyecto destacado si existe
      if (featuredProject && translations[language][`job${jobNum}ProjectTitle`]) {
        featuredProject.textContent = translations[language].featuredProjectTitle + 
                                    translations[language][`job${jobNum}ProjectTitle`];
      }
      
      if (projectDesc && translations[language][`job${jobNum}ProjectDesc`]) {
        projectDesc.textContent = translations[language][`job${jobNum}ProjectDesc`];
      }
    }
  });
  
  // Mostrar los proyectos destacados en modo español si son visibles
  const featuredProjects = document.querySelectorAll('.featured-project');
  featuredProjects.forEach(project => {
    if (project.style.display !== 'none') {
      const heading = project.querySelector('h4');
      const projectName = heading.textContent.split(': ')[1] || '';
      heading.textContent = translations[language].featuredProjectTitle + projectName;
    }
  });
} 