# Stock-Check App

A modern internal stock availability web application built to help retail teams quickly check product availability across multiple stores and warehouses.

Designed for speed, clarity, and real-world retail workflows.

---

## Live Demo

**Demo:** https://retailstock.netlify.app  
## Security & Demo Limitations

- Demo uses mock data only
- Limited product dataset
- Read-only access
- Authentication required
- Rate-limited API endpoints

> Production version integrates with live ERP systems using secure, read-only APIs.

**Demo Credentials:**  
- Username: demo  
- Password: demo.1212

Note: 
-  The demo uses Bearer tokens in localStorage to ensure compatibility across mobile Safari and cross-domain deployments. 
-  In production, the app would switch to httpOnly cookies under a shared domain for stronger security

Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/99bf0294-2a2a-4caf-ab60-f0268ec3cfed" width="900" alt="Desktop view 1" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/3943cae9-6a5d-4592-95f9-fb21b2b1802f" width="900" alt="Desktop view 2" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/0858dfc8-72d7-4dda-8f46-21d4d4e09cad" width="220" alt="Mobile view 1" />
  <img src="https://github.com/user-attachments/assets/7e031941-7335-4b55-b13c-68806eede727" width="220" alt="Mobile view 2" />
</p>

## Demo Data (Style Numbers)

The demo uses a limited mock dataset.

You can search using the following **Style Numbers**:

- 12259449
- 12284649
- 15349205
- 2167472
- 15352794
- 15363388
- 2172523
- 22031145
- 12249061
- 16094477
- 22018685
- 22034247
- 15358582


> These style numbers are mapped to mock stock data across multiple stores and warehouses.


**EAN Barcodes:**  
The app also supports searching by EAN barcodes (scanner-optimized, single-variant products):  
`5715714074944, 5715671404280, 5715824271455, 5715826350349`


## Real-World Impact

This application was designed based on real retail workflows and internal usage patterns.

It helped:
- Reduce time spent checking stock across stores
- Eliminate manual store-to-store calls
- Improve response time to customer inquiries
- Provide instant stock visibility during peak hours

The architecture and UX decisions were shaped by daily use in a real retail environment.

**Stock-Check App** centralizes stock visibility into one fast, clean interface — optimized for real daily use in retail environments.

---

## Features

- Search products by **Style Number / EAN**
- Stock visibility by **Color & Size**
- Multi-store & warehouse stock overview
- JWT-based authentication
- Optimized API calls with caching
- Light / Dark mode
- Fully responsive (desktop & mobile)
- Mock data support for demos
- Modular, scalable architecture

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Node-Cache

### Dev & Deployment
- Git & GitHub
- Netlify (Frontend)
- PM2 / Nginx (Production backend)
- Environment-based configuration

---

## Architecture Overview

```txt
Frontend (React + Vite)
        |
        | Axios (API Requests)
        |
Backend (Node + Express)
        |
        | MongoDB (Products, Stock, Metadata)
        |
ERP / External APIs (Read-only)
