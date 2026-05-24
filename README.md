# DevPulse
Internal Tech Issue and Feature Tracker

A role-based backend API where contributors report bugs or feature requests, and maintainers manage issues and monitor system metrics.

## Features
- User registration
- User login with JWT
- Password hashing with bcrypt
- Role-based authorization
- Create issue
- Get all issues
- Get single issue
- Update issue
- Delete issue
- Filtering and sorting
- Reporter information
- Metrics API for maintainers

## Technology Stack
| Technology | Usage |
| --- | --- |
| Node.js | Runtime environment |
| Express.js | Backend framework |
| TypeScript | Type safety |
| PostgreSQL | Database |
| pg | PostgreSQL driver |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| dotenv | Environment variables |

## Project Structure
| Path | Responsibility |
| --- | --- |
| [src/app.ts](src/app.ts) | Express app setup |
| [src/server.ts](src/server.ts) | Server entry point |
| [src/config/index.ts](src/config/index.ts) | Configuration loading |
| [src/db/index.ts](src/db/index.ts) | Database connection |
| [src/modules/auth/](src/modules/auth/) | Auth module |
| [src/modules/auth/auth.controller.ts](src/modules/auth/auth.controller.ts) | Auth handlers |
| [src/modules/auth/auth.route.ts](src/modules/auth/auth.route.ts) | Auth routes |
| [src/modules/auth/auth.service.ts](src/modules/auth/auth.service.ts) | Auth logic |
| [src/modules/auth/auth.interface.ts](src/modules/auth/auth.interface.ts) | Auth types |
| [src/modules/issue/](src/modules/issue/) | Issue module |
| [src/modules/issue/issue.controller.ts](src/modules/issue/issue.controller.ts) | Issue handlers |
| [src/modules/issue/issue.route.ts](src/modules/issue/issue.route.ts) | Issue routes |
| [src/modules/issue/issue.service.ts](src/modules/issue/issue.service.ts) | Issue logic |
| [src/modules/issue/issue.interface.ts](src/modules/issue/issue.interface.ts) | Issue types |

## Environment Variables
Create the environment file at [.env](.env):

PORT=5000
CONNECTIONSTRING=your_postgresql_connection_string
JWT_SECRET=your_secret_key


## Installation and Setup
1. Clone the repository

git clone <repository_url>


2. Install dependencies
npm install


3. Run the development server


## Database Schema

### Users
| Field | Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | UNIQUE VARCHAR |
| password | TEXT |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### Issues
| Field | Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| title | VARCHAR |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

## Authentication
JWT-based authentication is implemented.

Login flow:
- User submits credentials
- Credentials are validated
- JWT is generated
- Client stores token
- Protected routes verify token

## Roles and Permissions
| Role | Permissions |
| --- | --- |
| contributor | Create and view issues |
| maintainer | Full issue management and metrics access |

## API Endpoints

### Authentication
| Method | Route | Access |
| --- | --- | --- |
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |

### Issues
| Method | Route | Access |
| --- | --- | --- |
| POST | /api/issues | Protected |
| GET | /api/issues | Protected |
| GET | /api/issues/:id | Protected |
| PATCH | /api/issues/:id | Protected |
| DELETE | /api/issues/:id | Maintainer only |
| GET | /api/issues/metrics | Maintainer only |

## Filtering and Sorting
Supported query parameters:

| Query | Example |
| --- | --- |
| sort | newest / oldest |
| type | bug / feature_request |
| status | open / in_progress / resolved |

Example:


## Security Features
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Role-based authorization
- Input validation
- No password exposure in responses

## Assignment Constraints Followed
- Raw SQL only
- No ORM used
- No SQL JOIN used
- PostgreSQL native driver used
- Modular architecture maintained

## Author
Ibrahim Ahmed Galib  
Backend Developer | MERN and TypeScript learner
