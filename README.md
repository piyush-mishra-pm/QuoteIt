# **Quote-It**

_A platform where people can share their reflections on Quotes and where people can react on them._

A user can add a quote, their reflection on the quote and a relevant image. Other users can then view the quote, user's reflection on the quote and the image, and then users can react with comments and likes.

**Tech Stack**: *MongoDB, React-JS, Node-JS.*

---
---

## **Frontend Walkthrough:** 

Video Walkthorugh of UX:
[![Video Walkthrough](https://img.youtube.com/vi/hXLodKNI_GY/maxresdefault.jpg)](https://youtu.be/hXLodKNI_GY)

1. Browsing content unauthenticated and responsive menu design

2. Trying Login with non-existing account. So signing up. And getting logged in. Sign up form also remembers typed login details entered in login part. Signup form has validation checks for entered values (email type string, min password length, etc).

3. Signed in user can create and read their posts. Creation form also has validation for lengths.

4. Logged in user can update and delete their Posts. Edit and Delete options do not occur on posts created by other users, but only on those posts created by the user themselves.

5. Json Web Tokens get stored on login, and deleted in 1 hr, or on logout. Also visible that user can only edit their own posts, not of others.

---
---
<br/>

## **Overall Features**:
- **3 tiered** architecture (Frontend server hosting react SPA, backend server hosting node backend, and MongoDB cloud DB).
- User Authentication using **Json Web Tokens**, ensuring stateless authentication for SPAs using REST-APIs.
- **CRUD** for post, containing: quote, reflection on the quote, and a relevant image on the quote or reflection.
- All the quotes-reflections created by a user can be seen on user's wall.
- All users are also available as a public list.
- **React SPA***: Reuses code by making components and **custom hooks**. Uses **Context** for providing users authentication details throughout the SPA. Usage of **states, effects and callbacks hooks** too.
- **Node backend**: **Model-View-Controller** architecture, with clearly separated routes for users and quotes. Created **custom middlewares** authentication and **image upload**. Files of image are uploaded on node-backend server, and deleted when relevant user or post gets deleted.
- **MongoDB**: Uses **MongoDB Atlas** (Cloud deployed MongoDB). Uses **Transactions** to ensure that when a user post gets created/deleted, then the user's list of post is updated as well. **Mongoose** for creating schema and managing MongoDB commands.

---
---
<br/>

## **TODO**:
- Likes and Comments on posts.
- Mark Favourite Quotes.
- Pages to list all the quotes on website with filter options:
  - latest, 
  - most liked,
  - most commented,
- List all quotes of a user with similar pagination, sorting and filtering as above.

---
---

## **How to Run**:
Prerequisites: needs Node v.17, and MongoDB pre-installed.

To run the backend node server on port 4000, in development mode, type following in the command line (assuming your current working directory is this repo).
```
cd ./backend/
npm install
npm run dev
```

To run the frontend ReactJS server on port 3000 type following in the command line (assuming your current working directory is this repo).

```
cd ./frontend/
npm install
npm start
```