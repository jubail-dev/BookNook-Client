
<div align="center">

# 📚 BookNook

### Your Personal Reading Space

**Discover Your Next Great Book.**

A modern book-sharing platform where stories connect people,  
knowledge inspires readers, and every book opens a new world.

<br/>

<a href="https://book-nook-client-lilac.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-Explore_BookNook-FFB800?style=for-the-badge&labelColor=111827" alt="Live Demo"/>
</a>

<a href="https://github.com/jubail-dev/BookNook-Server">
  <img src="https://img.shields.io/badge/⚙️_BACKEND-Source_Code-111827?style=for-the-badge&labelColor=111827" alt="Backend Repository"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Better_Auth-000000?style=flat-square"/>
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens"/>
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui"/>

<br/><br/>

</div>

---

## 📖 About The Project

**BookNook** is a modern and elegant book-sharing platform built for people who love reading, discovering stories, and sharing knowledge.

Designed with a premium library-inspired aesthetic, BookNook provides a welcoming space for readers to explore books, discover new favorites, and connect with a growing reading community.

The application combines a visually appealing interface with a modern full-stack architecture to create a smooth and engaging book discovery experience.

> Every book is a new beginning.  
> Discover your next story with BookNook.

---

## 🌐 Live Application

<div align="center">

| Resource | URL |
|:---|:---|
| 🚀 Live Frontend | [BookNook Website](https://book-nook-client-lilac.vercel.app/) |
| ⚙️ Backend API | [BookNook API](https://book-nook-server-bay.vercel.app/) |
| 💻 Backend Repository | [BookNook Server](https://github.com/jubail-dev/BookNook-Server) |

</div>

---

## ✨ Features

### 📚 Discover Books
Explore a beautiful collection of books across different genres, editions, and interests.

### 🔍 Explore the Collection
Discover interesting books and find your next favorite story through an intuitive browsing experience.

### 📖 Recently Shared Books
Explore books shared by readers and discover new perspectives through literature.

### 📬 Request to Borrow
Connect with readers and request to borrow books from the community.

### 🌟 Personal Reading Space
Enjoy a modern reading environment designed to make book discovery simple and enjoyable.

### 🔐 Secure Authentication
A modern authentication system using Better Auth and JWT-based authentication according to the application's configured flow.

### 🎨 Premium User Interface
A clean, elegant, and responsive interface featuring beautiful book cards, refined typography, and warm visual accents.

### 📱 Responsive Design
A user-friendly experience designed to work across different screen sizes and devices.

---

## 🖼️ Project Preview

<div align="center">

<!-- Add your BookNook screenshot to the public folder -->

<img src="./public/booknook-preview.png" alt="BookNook Website Preview" width="100%"/>

<br/>

<em>A beautifully designed space for discovering, sharing, and enjoying books.</em>

</div>

---

## 🛠️ Technology Stack

BookNook is built using modern technologies to deliver a scalable, maintainable, and user-friendly full-stack application.

<div align="center">

### Frontend

<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind" alt="Frontend Technologies"/>

<br/><br/>

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/>

<br/><br/>

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express" alt="Backend Technologies"/>

<br/><br/>

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>

<br/><br/>

### Database & Authentication

<img src="https://skillicons.dev/icons?i=mongodb" alt="Database Technologies"/>

<br/><br/>

<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>

</div>

### Technology Overview

| Technology | Purpose |
|:---|:---|
| Next.js | Frontend framework |
| React | Component-based UI development |
| shadcn/ui | Reusable and customizable UI components |
| Tailwind CSS | Utility-first styling |
| Node.js | JavaScript runtime |
| Express.js | Backend API development |
| MongoDB | NoSQL database |
| Better Auth | Authentication management |
| JWT | Token-based authentication |

---

## 🏗️ Application Architecture

BookNook follows a modern full-stack architecture with a Next.js frontend, Express.js backend, and MongoDB database.

```text
BookNook
│
├── Frontend
│   ├── Next.js
│   ├── React
│   ├── Tailwind CSS
│   └── shadcn/ui
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── REST API
│   └── JWT Authentication
│
├── Database
│   └── MongoDB
│
└── Authentication
    └── Better Auth
```

---

## 🔐 Authentication & Security

BookNook integrates modern authentication technologies to support secure user access.

- Better Auth for authentication management.
- JWT-based authentication where configured.
- Protected routes and authorized access.
- Backend API authentication and authorization.
- Secure environment variable configuration.

> Authentication and authorization behavior depends on the application's actual configuration.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB connection or MongoDB Atlas account

### 1. Clone the Frontend Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd BookNook
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the frontend root directory.

```env
NEXT_PUBLIC_API_URL=https://book-nook-server-bay.vercel.app
```

Add other environment variables required by your actual application.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

```text
http://localhost:3000
```

---

## ⚙️ Backend API

BookNook uses a dedicated Express.js backend to handle application data and API requests.

### Backend Repository

[BookNook Server Repository](https://github.com/jubail-dev/BookNook-Server)

### Live API

[https://book-nook-server-bay.vercel.app/](https://book-nook-server-bay.vercel.app/)

### Backend Setup

```bash
git clone https://github.com/jubail-dev/BookNook-Server.git

cd BookNook-Server

npm install
```

Configure your backend environment variables according to the server configuration.

Then start the development server:

```bash
npm run dev
```

> Use the actual environment variable names and scripts defined in your backend project.

---

## 🎯 Project Objectives

- Build a modern full-stack book-sharing platform.
- Create an elegant and user-friendly interface.
- Practice Next.js application development.
- Develop REST APIs using Express.js and Node.js.
- Integrate MongoDB for data management.
- Implement authentication using Better Auth and JWT.
- Improve reusable component architecture.
- Gain practical experience with real-world application deployment.

---

## 🔮 Future Improvements

- [ ] Advanced book search and filtering
- [ ] Personalized reading recommendations
- [ ] User reviews and ratings
- [ ] Reading progress tracking
- [ ] Wishlist and favorite books
- [ ] Enhanced user dashboard
- [ ] Improved borrowing management
- [ ] More interactive reading community features

---

## 👨‍💻 Developer

<div align="center">

### MD. Jubail Miah

**Aspiring Full-Stack Web Developer**

Passionate about building modern, interactive, and user-friendly web applications.

I enjoy exploring new technologies, solving problems, and continuously improving my development skills.

<br/>

<a href="https://github.com/jubail-dev">
  <img src="https://img.shields.io/badge/GitHub-jubail--dev-181717?style=for-the-badge&logo=github" alt="GitHub Profile"/>
</a>

</div>

---

## 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

If you have ideas to improve BookNook, feel free to:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

<div align="center">

### 📚 Discover. Share. Read. Repeat.

**Thank you for exploring BookNook!**

<sub>Made with passion for readers and book lovers.</sub>

<br/><br/>

<img src="https://img.shields.io/badge/BookNook-Your_Personal_Reading_Space-FFB800?style=for-the-badge&labelColor=111827" alt="BookNook"/>

</div>
