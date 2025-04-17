# Event Planner Backend

## Overview
The Event Planner Backend is a Node.js application designed to serve as an event planning and reminder system. It allows users to create events, categorize them, set reminders, and view upcoming events based on various criteria. The application supports user authentication to ensure that multiple users can manage their events independently.

## Features
- **Event Creation**: Users can create events with a name, description, date, and time.
- **Event Categorization**: Events can be assigned to different categories such as Meetings, Birthdays, and Appointments.
- **Reminder System**: Users can set reminders for their events and receive notifications before the event occurs.
- **View Events**: Users can view their upcoming events sorted by date, category, or reminder status.
- **User Authentication**: Basic user authentication is implemented to allow multiple users to manage their events independently.

## Project Structure
```
event-planner-backend
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.js
├── tests
├── .github
│   └── workflows
├── package.json
├── .env
├── .gitignore
├── README.md
└── server.js
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/event-planner-backend.git
   ```
2. Navigate to the project directory:
   ```
   cd event-planner-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and configure your environment variables (e.g., database connection strings, secret keys).

## Usage
1. Start the server:
   ```
   node server.js
   ```
2. The application will be running on `http://localhost:3000` (or the port specified in your configuration).

## Testing
Automated tests are included in the `tests` directory. To run the tests, use:
```
npm test
```

## GitHub Actions
The project is configured with GitHub Actions for continuous integration. The workflow file is located in `.github/workflows/nodejs.yml`, which automates the testing process on each push or pull request.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.