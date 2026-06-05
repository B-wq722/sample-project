# Inventory Management System

A full-stack inventory management application built with Node.js Express backend and vanilla JavaScript frontend.

## Features
- **Dashboard**: View total items, total inventory value, and low stock alerts
- **Inventory Management**: Add, edit, delete, and search inventory items
- **Real-time Updates**: Instant updates across the interface
- **Stock Alerts**: Automatic highlighting of items with low stock (< 15 units)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful API with CRUD operations
- **Database**: In-memory (suitable for development)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Running the Server
```bash
npm start
```

The server will start at `http://localhost:5000`

Open `index.html` in your browser to access the frontend.

## API Endpoints

- `GET /api/items` - Get all inventory items
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## File Structure
```
.
├── index.html      # Frontend HTML
├── script.js       # Frontend JavaScript
├── style.css       # Frontend CSS
├── server.js       # Express server
├── package.json    # Dependencies
└── README.md       # This file
```

## Usage

1. Start the server: `npm start`
2. Open `index.html` in your browser
3. Use the dashboard to view inventory stats
4. Use the inventory section to manage items
5. Add items with the "Add New Item" button
6. Edit items by clicking the Edit button
7. Delete items by clicking the Delete button
8. Search items using the search bar
