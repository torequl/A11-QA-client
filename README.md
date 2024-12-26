# Q&A Social Media Platform

This is a React-based social media platform designed for question-and-answer-style interactions, similar to Quora. Users can post queries, recommend products or solutions, and interact with other users' posts.

## Features

### **Authentication**
- Email/Password-based login and registration.
- Google Sign-In using Firebase.
- JWT-based authentication for private routes.

### **Pages and Routes**

#### **1. Home Page**
- Displays the 6 most recent queries in a card format.
- Includes a Navbar and Footer.

#### **2. Login and Registration**
- Login and Registration pages for user authentication.
- Error handling for invalid credentials.

#### **3. Add Queries (Private Route)**
- A form for users to add queries.
- Fields include:
  - Product Name
  - Product Brand
  - Product Image URL
  - Query Title
  - Boycotting Reason Details
- Additional data stored:
  - User email, name, and profile image
  - Current timestamp
  - Default recommendation count (0)

#### **4. My Queries (Private Route)**
- Displays all queries posted by the logged-in user in a card layout.
- Actions:
  - **View Details**: Navigate to query details page.
  - **Update**: Edit query details using a modal or separate route.
  - **Delete**: Remove the query with confirmation.

#### **5. All Queries**
- Displays all queries in descending order.
- Includes layout toggling between 1, 2, and 3-column grid views.
- Search functionality based on product name.
- Displays recommendation count and a button to recommend a query.

#### **6. Query Details**
- Displays detailed information about a specific query.
- Includes a recommendation form (if the user is not the query owner).
- Displays all recommendations as a comment-style list.

#### **7. My Recommendations (Private Route)**
- Shows all recommendations made by the logged-in user in a table format.
- Allows deletion of recommendations, which decreases the associated query's recommendation count.

#### **8. Recommendations For Me (Private Route)**
- Displays all recommendations made by others on the user's queries in a table format.

### **Search Functionality**
- Allows users to search for queries by product name.

### **Design**
- Built with Tailwind CSS and DaisyUI for responsive and modern design.

### **Backend**
- Express.js server.
- MongoDB database for storing queries and recommendations.
- API endpoints for managing queries and recommendations.
- Recommendation count is managed using MongoDB's `$inc` operator.


