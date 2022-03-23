# Quote-It

A platform where people can share their reflections on Quotes and where people can react on them.

A user can add a quote, their reflection on the quote and a relevant image. Other users can then view the quote, user's reflection on the quote and the image, and then users can react with comments and likes.

**Tech Stack**: *MongoDB, React-JS, Node-JS.*

---
---

## **Frontend Walkthrough:** 

[![Video Walkthrough](https://img.youtube.com/vi/hXLodKNI_GY/maxresdefault.jpg)](https://youtu.be/hXLodKNI_GY)

1. Browsing content unauthenticated and responsive menu design

![Browsing content unauthenticated and responsive menu design](https://drive.google.com/uc?export=view&id=17m93-AxQbInUQlEI2ED346K_V-70Z-Uw)

---

2. Trying Login with non-existing account. So signing up. And getting logged in. Sign up form also remembers typed login details entered in login part. Signup form has validation checks for entered values (email type string, min password length, etc).

![Signup and Login](https://drive.google.com/uc?export=view&id=1EoFOeUu2Y8f2dXz6gB-RlCSEHzK8O03b)

---

3. Signed in user can create and read their posts. Creation form also has validation for lengths.

![Creating and Reading Posts](https://drive.google.com/uc?export=view&id=1J_7AT0CIPdv7fUjjX1KvcrRbGkDsIt9u)

---

4. Logged in user can update and delete their Posts. Edit and Delete options do not occur on posts created by other users, but only on those posts created by the user themselves.

![Updating and deleting Posts](https://drive.google.com/uc?export=view&id=1xn4RWAt33P3FZWjbEqzaqdmtbeWjTtM2)

---

5. Json Web Tokens get stored on login, and deleted in 1 hr, or on logout. Also visible that user can only edit their own posts, not of others.

![Updating and deleting Posts](https://drive.google.com/uc?export=view&id=1gOQVSaCKkED7pHcUt8HkP3GL45_o1XKg)

---
---
<br/>

**Features**:
- User Authentication,
- CRUD for post, containing: quote, reflection on the quote, and a relevant image on the quote or reflection.
- Other users can react on the post using like and comments.
- All the quotes-reflections created by a user can be seen on user's wall.
- All users are also available as a public list.




---
---
<br/>

**TODO**:
- Likes and Comments on posts.
- Mark Favourite Quotes.
- Pages to list all the quotes on website with filter options:
  - latest, 
  - most liked,
  - most commented,
- List all quotes of a user with similar pagination, sorting and filtering as above.