# Taskly

Taskly is a comprehensive Laravel application for managing To-Do Lists. It incorporates an advanced RESTful API, real-time notifications, caching with Redis, and an interactive front-end built with React.js and styled using Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation & Setup](#installation--setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup (Laravel)](#2-backend-setup-laravel)
  - [3. Front-End Setup (React.js)](#3-front-end-setup-reactjs)
- [Additional Information](#additional-information)
- [Contributing](#contributing)

## Features

- **RESTful API**:
  - CRUD operations for tasks (Create, Read, Update, Delete).
  - Endpoints to add, update, delete, and fetch task details.
- **Administrative Interface**:
  - Manage users and tasks.
  - Send private notifications to specific users.
- **Real-Time Notifications**:
  - Live updates using Laravel Pusher.
  - Instant notifications when a task is added or updated.
- **Advanced Caching**:
  - Redis caching to optimize performance and reduce data retrieval time.
- **Security & Middleware**:
  - Middleware for route protection and administrative actions.
  - Laravel's built-in authentication for secure user registration, login.
- **Modern Front-End**:
  - Built with React.js for interactive components.
  - Styled with Tailwind CSS for a responsive, visually appealing UI.

## Requirements

### Backend

- PHP >= 8.0
- Composer
- Laravel 10.x 
- MySQL
- Redis Server
- Pusher

### Frontend

- Node.js (v14+)
- npm

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/muhammed-ahmed-hassouna/Taskly.git
cd Taskly
```

### 2. Backend Setup (Laravel)

#### a. Install Composer Dependencies

```bash
composer install
```

#### b. Environment Configuration

- Update the `.env` file with your configuration:

#### c. Database Migrations & Seeding

- Run the migrations:

  ```bash
  php artisan migrate
  ```

- Seed the database (this creates initial users, admins):

  ```bash
  php artisan db:seed
  ```

#### d. Start the Laravel Development Server

```bash
php artisan serve
```

Your backend is now accessible at [http://localhost:8000](http://localhost:8000).

---

### 3. Front-End Setup (React.js)

If the front-end is located in a separate directory (e.g., `/client`):

#### a. Navigate to the Front-End Directory

```bash
cd client
```

#### b. Install Node Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

#### c. Environment Configuration for Front-End

Create a `.env` file in the `client` directory with the following variables:

```env
REACT_APP_SERVER_URL=http://localhost:8000
REACT_APP_PUSHER_KEY=your_pusher_app_key
REACT_APP_PUSHER_CLUSTER=your_pusher_app_cluster
```

#### d. Start the React Development Server

```bash
npm start
```

Or with Yarn:

```bash
yarn start
```

The React app typically runs on [http://localhost:3000](http://localhost:3000).

---

## Additional Information

- **Admin Panel**:  
  The administrative interface is accessible at:  
  [http://localhost:3000/dashboard](http://localhost:3000/dashboard)  
  Log in with an administrator account to manage users and tasks.

- **Redis Server**:  
  Ensure your Redis server is running. You can start Redis using:

  ```bash
  redis-server
  ```

- **Real-Time Notifications**:  
  The application uses Laravel Pusher for notifications. Confirm your Pusher credentials are correctly set in the `.env` file.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and open pull requests for improvements or bug fixes.

---

Happy task managing with Taskly!

