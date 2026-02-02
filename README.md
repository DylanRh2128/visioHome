# 🏠 VisioHome

Plataforma inmobiliaria web para la visualización de viviendas, con enfoque en
experiencia de usuario, diseño moderno y proyección a visualización 3D / AR.

---

## 🚀 Tecnologías utilizadas

- PHP 8+
- Bootstrap 5
- JavaScript (Fetch API)
- MySQL / MariaDB
- HTML5 / CSS3

---

## 📂 Estructura del proyecto

```text
visioHome/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── public/
│
├── frontend/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── index.php
│
├── database/
│   └── visiohome.sql
│
├── docs/
│   └── diagramas/
│
├── .env.example
├── .gitignore
└── README.md


## 🔁 Flujo de trabajo con Git

- `main` → producción / entregas finales
- `develop` → integración del equipo
- `feature/*` → desarrollo de funcionalidades

### Ejemplo:


🚫 No se permite push directo a `main` ni `develop`.

---

## ⚙️ Configuración del entorno

1. Clonar el repositorio:
```bash
git clone 'https://github.com/DylanRh2128/visioHome.git'

2. Copiar variables de entorno:

cp .env.example .env

3. Configurar credenciales de base de datos en .env

4. Importar la base de datos:
database/visiohome.sql
