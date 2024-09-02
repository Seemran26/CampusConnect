# CampusConnect

This project is a web application designed to help students find colleges. The application features a front-end developed with HTML, CSS, and JavaScript, and a back-end powered by Node.js. The server is managed using XAMPP, and MySQL is used for the database. Development is done in Visual Studio Code.

## Prerequisites

Before you start, make sure you have the following installed:

- [XAMPP](https://www.apachefriends.org/index.html) (for Apache and MySQL)
- [Node.js](https://nodejs.org/) (includes npm)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) (optional, but useful for version control)
- [Images]([https://git-scm.com/](https://drive.google.com/drive/folders/1eCqA_v5ACpylHsGKhYGwUVgRuTnUY8yq?usp=sharing))

## Getting Started

### 1. Setup XAMPP

1. Open XAMPP Control Panel.
2. Start the Apache and MySQL services.

### 2. Backend Setup

1. Open Visual Studio Code.
2. Open the terminal in VS Code (you can use Git Bash or the integrated terminal).
3. Navigate to the `server` directory:

   ```bash
   cd server
4. Install the necessary Node.js libraries:
   
    ```bash
   npm install

5. Start the Node.js server using nodemon:
    ```bash
   nodemon app.js


### 3. Frontend Setup
1. In Visual Studio Code, open the frontend directory.
2. Install the Live Server extension for Visual Studio Code if you haven’t already.
3. Start Live Server by right-clicking on your index.html file and selecting "Open with Live Server".

###Project Structure
- frontend/ - Contains HTML, CSS, and JavaScript files for the client-side.
- server/ - Contains the Node.js backend code.
- app.js - The main file where the Node.js server is defined.
- package.json - Lists Node.js dependencies and scripts.

###Dependencies
- Node.js Dependencies
- express - Web framework for Node.js.
- mysql - MySQL client for Node.js.
- nodemon - Tool for automatically restarting the server.
- Install these dependencies in the server directory using:
  
    ```bash
      npm install express mysql nodemon

### Note: For the application to work correctly, you need to run the servers for each webpage individually (college, college_list, exams). When one server is running, you must close the terminal in Visual Studio Code before starting another.
