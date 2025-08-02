

Personal Finance Assistant

A full-stack web application that helps users track income and expenses, visualize financial data, and extract transaction details from uploaded receipts. Built using React, Node.js, and MongoDB, the app supports user authentication, transaction filtering, CSV export, and receipt processing.

Features

Add Transactions
Manually add income or expense entries with amount, description, category, date, and notes.

Filter & View Transactions
List all transactions and filter them by date range. Edit or delete individual records.

Visualize Finances
Interactive charts display spending by category and trends over time:

* Pie chart (expenses by category)
* Bar chart (daily income vs. expenses)

Upload Receipts for OCR Extraction
Upload receipt images or PDFs. The backend extracts transaction data using OCR.

User Authentication
Secure login system with token-based authentication. Each user sees only their own data.

Download CSV
Export filtered transactions to a downloadable CSV file.

Tech Stack

Frontend:
React (TypeScript)
React Hook Form and Zod for form validation
Axios for API communication
Recharts for data visualization
React Router DOM for navigation

Backend:
Node.js and Express
MongoDB Atlas (cloud database)
Mongoose for schema modeling
Multer for file uploads
Tesseract.js or external OCR API
JWT for authentication

Getting Started

1. Clone the Repository
   git clone [https://github.com/your-username/personal-finance-assistant.git](https://github.com/your-username/personal-finance-assistant.git)
   cd Smart\_Finance

2. Backend Setup
   cd backend
   npm install

Create a .env file in backend:
PORT=5000
MONGO\_URI=your\_mongodb\_uri
JWT\_SECRET=your\_jwt\_secret
OCR\_API\_KEY=your\_ocr\_api\_key (if using an external service)

Run the backend:
npm run dev

3. Frontend Setup
   cd ../frontend
   npm install
   npm run dev

Visit the frontend at [http://localhost:5173](http://localhost:5173)

Bonus Features Implemented

Multi-user support
CSV export functionality
Pagination in transaction listing
OCR extraction from receipts (image/PDF)

Limitations

Does not yet support tabular PDF parsing for bank statements
OCR accuracy depends on the quality of uploaded images

Author Duvvuri Hanisha

Created by \[Your Name]
For questions or collaboration, feel free to reach out.

---

Let me know if you want this pasted into your project as a `.txt` or `.md` file.
