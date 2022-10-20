## Job Portal Backend

- Live Server Link: https://acc-job-portal.onrender.com

### Routes

- POST /user/signup: Signup/Register a User
- POST /user/login : Login registered user
- GET /user/me	: Get current user information by token
- POST /jobs : create a job (manager verifyToken & authorization is required)
- GET /manager/jobs : get all job of current manager (manager verifyToken & authorization is required)
- GET /manager/jobs/:id : get a single job details of current manager (manager verifyToken & authorization is required)
- PATCH /jobs/:id : update a job by its manager (manager verifyToken & authorization is required)
- GET /jobs : Get all Jobs (can query sort, limit & filter)
- GET /jobs/:id : Get job details with hiring manager info
- POST /jobs/:id/apply : Can apply for a job (verifyToken and authorization for candidate is required)

### Technology Used:

![Nodejs](https://img.shields.io/badge/Node_JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Expressjs](https://img.shields.io/badge/Express-4e4e4e?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-d63aff?style=for-the-badge&logo=zapier&logoColor=white)

### Use this template | MVC pattern:

#### Step-1 - Clone repository:

```
git clone https://github.com/sharifmrahat/acc-job-portal.git
```

#### Step-2 - Install packages:

```
npm install
```

#### Step-3 - Run nodemon:[^note]

```
npm run dev
```

[^note]:
        Please setup .env file with `DATABASE_REMOTE='your mongodb srv link'` , `PORT=` & `TOKEN_SECRET=` before run the server.