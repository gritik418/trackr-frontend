# Trackr

> The high-performance workspace for teams to manage complex workflows with ease. Engineered for scale, designed for speed.

Trackr is a modern, enterprise-grade project management platform built on a foundation of performance and security. It features a premium "Aurora" design language with fluid animations, glassmorphism, and pixel-perfect accuracy.

## 🚀 Key Features

- **Hierarchical Governance**: Structured around Organization → Workspaces → Projects → Tasks.
- **Role-Based Access**: Granular permissions (Owner, Admin, Member) enforced at the database level.
- **Real-time Collaboration**: Instant updates and activity feeds across the team.
- **Premium UI**: Dark-mode first, featuring Framer Motion animations and glassmorphic components.
- **Responsive Workspace**: Seamless experience from desktop to mobile.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel

### Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT-based with Refresh Tokens
- **Mail**: Professional SMTP templates

## 🏗️ Architecture Hierarchy

Trackr follows a simple yet powerful hierarchy to scale with your team:

1. **Organization**: The top-level entity representing the entire company or group.
2. **Workspace**: A dedicated space within an organization for specific departments or teams.
3. **Project**: A focused initiative within a workspace containing a set of tasks.
4. **Task**: The atomic unit of work with status, priority, and assignees.

## 🏁 Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (Local or Managed)
- [Git](https://git-scm.com/)

### 1. Backend Setup

Navigate to the `trackr-backend` directory and install dependencies:

```bash
cd trackr-backend
npm install
```

Configure your environment variables:

```bash
cp .env.example .env
# Update DATABASE_URL, JWT_SECRET, and Mail settings
```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run start:dev
```

### 2. Frontend Setup

Navigate to the `trackr-frontend` directory and install dependencies:

```bash
cd trackr-frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`, connecting to the API at `http://localhost:3001` by default.

## 🎨 Design Principles

- **Focus**: Remove visual clutter to prioritize the task at hand.
- **Feedback**: Every interaction provides subtle, immediate visual feedback.
- **Consistency**: Unified design tokens across the entire platform.
- **Performance**: Optimized for low-latency updates and smooth transitions.

## 📄 License

Trackr is private and proprietary. All rights reserved.
