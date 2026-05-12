# Task 1: JSON File Validator

This project is a simple Node.js utility built as part of the **Everest Assessment** tasks. It demonstrates how to interact with the local file system to read and validate data.

## 📌 Overview
The goal of this task is to create a script that checks whether a specific file contains a valid JSON structure. This is a fundamental skill for server-side development, as it ensures data integrity before processing.

## 🚀 Features
*   **File Reading:** Uses the built-in `fs` (File System) module.
*   **Error Handling:** Implements `try...catch` blocks to prevent the script from crashing when encountering invalid JSON.
*   **Asynchronous Processing:** Reads files non-blockingly for better performance.

## 🛠️ Prerequisites
*   [Node.js](https://nodejs.org/) (Version 14 or higher recommended)

## 📂 Project Structure
```text
json-validator/
├── validator.js    # The main script
├── test.json       # Example of a valid JSON file
├── invalid.json    # Example of a broken/invalid JSON file
└── README.md       # Project documentation

## 💻 How to Run
* Open your terminal and navigate to the project folder:

Bash
cd json-validator

2.  **Execute the script** using Node:
    ```bash
    node validator.js
    
📝 Example Output
If the file is correct, you will see:

✅ SUCCESS: "test.json" is a valid JSON file.

If the file has a syntax error, you will see:

❌ INVALID: "invalid.json" is not valid JSON.
Reason: Unexpected token...