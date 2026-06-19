# ChatOnline - Real-Time Chat Application

A modern, real-time chat application built with React and Vite, featuring user authentication, profile management, and instant messaging capabilities.

## Features

- **User Authentication**: Secure login and signup system powered by Firebase
- **Real-Time Messaging**: Instant message delivery and updates
- **User Profiles**: Profile creation and customization with avatar uploads
- **Chat Interface**: Intuitive and responsive chat UI with message history
- **Sidebar Navigation**: Quick access to contacts and chat management
- **Image Upload**: Upload profile pictures and media files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Backend/Database**: Firebase (Authentication, Firestore)
- **Styling**: CSS3
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ChatBox/        # Main chat message display component
│   ├── LeftSidebar/    # Navigation and contacts sidebar
│   └── RightSidebar/   # User info and additional options
├── pages/              # Page components
│   ├── chat/           # Main chat page
│   ├── login/          # Login/Authentication page
│   └── profileUpdate/  # User profile management
├── context/            # React Context for global state management
├── config/             # Configuration files (Firebase setup)
├── lib/                # Utility functions and helpers
├── assets/             # Static assets and images
└── App.jsx             # Root component
```

## Installation

1. **Clone the repository**
```bash

cd chatOnline
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Add your Firebase configuration to `src/config/firebase.js`
- Enable Authentication and Firestore in your Firebase console

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Component Overview

### ChatBox
Displays messages in the chat interface, handles message rendering and user interactions.

### LeftSidebar
Shows the list of available contacts/conversations and provides navigation between different chats.

### RightSidebar
Displays user information, settings, and additional options for the current conversation or account.

### Chat Page
The main page that combines all components and manages the chat functionality.

### Login Page
Handles user authentication including signup and login flows.

### ProfileUpdate Page
Allows users to update their profile information and upload profile pictures.

## Key Features Implementation

### Real-Time Updates
Leverages Firebase Firestore for real-time data synchronization across all connected clients.

### Image Upload
Users can upload profile pictures and media files using the `uploadImage` utility from `lib/uploadImage.js`.

### Global State Management
Uses React Context API (AppContext) to manage application state across components.

### Responsive Design
CSS modules ensure consistent styling and responsive layouts across different screen sizes.

## Getting Started

1. Sign up or log in with your credentials
2. Complete your profile setup
3. Start a new conversation or select from existing contacts
4. Send and receive messages in real-time

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please reach out through the project's issue tracker.

---

**Note**: Make sure to configure your Firebase credentials properly before running the application in production.

