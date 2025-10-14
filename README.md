# Flowbase Backend

A Node.js/Express backend API for managing workflows and nodes with user authentication and PostgreSQL database integration.

## 🚀 Features

- **Workflow Management**: Create, read, update, and delete workflows
- **Node Management**: Add and manage nodes within workflows
- **User Authentication**: JWT-based authentication middleware
- **Database Integration**: PostgreSQL with Prisma ORM
- **TypeScript**: Full TypeScript support with strict type checking
- **Error Handling**: Comprehensive error handling with custom error classes
- **CORS Support**: Cross-origin resource sharing enabled

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/deepanshu2711/Flowbase-Backend.git
cd Flowbase-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/flowbase_db"
JWT_SECRET="your-jwt-secret-key"
```

4. Set up the database:
```bash
npx prisma migrate deploy
npx prisma generate
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

The server will start on port `5005` by default.

## 📊 Database Schema

The application uses the following main entities:

### User
- `id`: Unique identifier (UUID)
- `email`: User email (unique)
- `password`: Hashed password
- `name`: User's display name
- `createdAt`: Account creation timestamp

### Workflow
- `id`: Unique identifier (UUID)
- `name`: Workflow name
- `description`: Optional workflow description
- `userId`: Owner of the workflow
- `createdAt`: Creation timestamp

### Node
- `id`: Unique identifier (UUID)
- `name`: Node name
- `type`: Node type
- `data`: JSON data for node configuration
- `workflowId`: Parent workflow ID
- `createdAt`: Creation timestamp

### NodeConnection
- `id`: Unique identifier (UUID)
- `fromNodeId`: Source node ID
- `toNodeId`: Target node ID
- `workflowId`: Parent workflow ID
- `createdAt`: Creation timestamp

### Execution
- `id`: Unique identifier (UUID)
- `workflowId`: Workflow being executed
- `status`: Execution status
- `result`: JSON result data
- `startedAt`: Execution start time
- `finishedAt`: Execution end time

### Log
- `id`: Unique identifier (UUID)
- `message`: Log message
- `level`: Log level
- `createdAt`: Log timestamp

## 🔗 API Endpoints

### Workflows

- `GET /api/workflows` - Get all workflows for authenticated user
- `POST /api/workflows/create` - Create a new workflow
  - Body: `{ "name": string, "description": string }`
- `POST /api/workflows/edit` - Update an existing workflow
  - Body: `{ "id": string, "name": string, "description": string }`
- `DELETE /api/workflows/:id` - Delete a workflow

### Nodes

- `GET /api/nodes` - Get all nodes
- `POST /api/nodes/add` - Add a new node
- `DELETE /api/nodes/:id` - Delete a node

### Authentication

All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🏗️ Project Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts              # Server entry point
├── config/
│   └── db.ts             # Database configuration
├── generated/
│   └── prisma/           # Generated Prisma client
├── middlewares/
│   └── authMiddleware.ts # JWT authentication middleware
├── modules/
│   ├── workflows/        # Workflow module
│   │   ├── workflow.controller.ts
│   │   ├── workflow.routes.ts
│   │   └── workflow.service.ts
│   └── nodes/           # Node module
│       ├── node.controller.ts
│       ├── node.routes.ts
│       └── node.service.ts
└── utils/
    ├── appError.ts      # Custom error handling
    ├── helpers.ts       # Utility functions
    └── responses.ts     # Response helpers
```

## 🔧 Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Programming language
- **Prisma**: Database ORM
- **PostgreSQL**: Database
- **JWT**: Authentication
- **CORS**: Cross-origin resource sharing

## 📝 Scripts

- `npm run dev`: Start development server with TypeScript compilation
- `npm run build`: Build the project for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Issues

If you encounter any issues, please create an issue on the [GitHub repository](https://github.com/deepanshu2711/Flowbase-Backend/issues).

## 📞 Contact

For questions or support, please contact the repository owner.

---

Made with ❤️ by [deepanshu2711](https://github.com/deepanshu2711)
