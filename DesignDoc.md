# Microservice System Design Document

## 1. System Overview
This project implements a microservice architecture with two services: a **Users Service** and an **Orders Service**. The goal is to demonstrate inter-service communication where the Orders Service retrieves data from the Users Service to fulfill a client request.

## 2. Schema Design
The system uses two main data models: User and Order. An order is linked to a user via `userId`.

*(Here you can embed your `schema.png` image)*
![Schema Diagram](./schema.png)

## 3. API Endpoints

### Users Service (Port 3000)
- **`GET /users/:id`**: Fetches details for a single user.
  - **Success Response (200 OK):** `{ "id": 1, "name": "Sonu", "email": "Sonu123@gmail.com" }`
  - **Error Response (404 Not Found):** `User not found`

### Orders Service (Port 3001)
- **`GET /orders/:id/details`**: Fetches details for an order and its associated user.
  - **Success Response (200 OK):** `{ "orderId": 101, "product": "Laptop", "user": { "id": 1, "name": "Sonu" } }`
  - **Error Response (404 Not Found):** `Order not found`

## 4. Inter-Service Communication Flow
The `GET /orders/:id/details` endpoint follows these steps:
1.  A client sends a request to the Orders Service for detailed order information.
2.  The Orders Service finds the corresponding order in its database.
3.  The Orders Service makes a `GET` request to the Users Service at `/users/:userId`.
4.  The Users Service returns the user's data.
5.  The Orders Service combines the order data and user data into a single JSON object and returns it to the client.

## 5. Failure Handling
Robust systems must anticipate failures. Here’s how this design handles them:
- **Case 1: The Users Service is down or unresponsive.**
  - **Detection:** The `axios` request from the Orders Service will time out or throw a connection error.
  - **Action:** The `try...catch` block in the endpoint will catch the error. The Orders Service will log the error and return a **`500 Internal Server Error`** to the client with a message like "Failed to fetch user details." This prevents the entire system from crashing.
- **Case 2: The order exists, but the user ID is invalid.**
  - **Detection:** The Users Service will return a `404 Not Found` error to the Orders Service.
  - **Action:** The `axios` call will result in an error that is caught. The Orders Service will respond with a **`500 Internal Server Error`**, as it cannot fully process the request. Alternatively, it could return the order data with a `user: null` field to indicate the user information is missing. 
