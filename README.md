# company-review-portal

This portal is a full-stack web application designed to bring transparency to the tech industry's hiring process. It allows users to share and discover real experiences covering everything from initial contact and take-home tests to interviews and final feedback.

This is a project in progress and I am actively working on it. New features and improvements are being added regularly.
> **README Last Updated:** July 4, 2025
---


## Features

* **Company Listings:** Browse a list of companies with search and pagination.
* **Detailed Reviews:** View company-specific pages with detailed reviews, including ratings, role descriptions, and user experiences.
* **User Authentication:** Secure user registration and login system using JWTs and secure cookies.
* **Protected Routes:** Client-side and server-side (middle) protection for user-only and admin-only pages.
* **Review & Company Submissions:** Logged-in users can submit new companies and post reviews for existing ones.
* **Admin Approval System:** A complete admin dashboard where new company submissions can be reviewed and approved before going public, ensuring data quality.
* **Data Aggregation:** Automatically calculates and displays the average rating for each company.
* **Responsive Design:** A modern, responsive UI built with Tailwind CSS.


## Screenshots
* Homepage

  <img width="1512" alt="Screenshot 2025-07-04 at 02 12 07" src="https://github.com/user-attachments/assets/343bbf41-3bc8-4c55-8fdd-595325d151f8" />

* Companies page

  <img width="1512" alt="Screenshot 2025-07-04 at 02 13 04" src="https://github.com/user-attachments/assets/383c4b73-4f1a-4e2b-82f9-84ab5086145b" />

* Company reviews page

  <img width="1512" alt="Screenshot 2025-07-04 at 02 15 25" src="https://github.com/user-attachments/assets/e88f2670-e972-4db8-917a-eb02ae50928f" />

* Create review form

  <img width="1512" alt="Screenshot 2025-07-04 at 02 17 22" src="https://github.com/user-attachments/assets/9201051f-70d4-4b7c-82af-b1069ddfb8b5" />

* Admin dashboard

  <img width="1512" alt="Screenshot 2025-07-04 at 02 14 25" src="https://github.com/user-attachments/assets/c38592f6-a674-414a-b31c-6fcbcf986d57" />


## Tech Stack

### Frontend
* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Context
* **API Communication:** Fetch API

### Backend
* **Architecture:** REST API
* **Framework:** Node.js with Express
* **Database:** PostgreSQL
* **Authentication:** JWT
* **Validation:** Zod
* **Security:** Rate Limiting, Middleware for Auth/Admin roles

### DevOps
* **Containerization:** Docker & Docker Compose
