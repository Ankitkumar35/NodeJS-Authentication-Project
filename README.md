# NodeJS-Authentication-Project
A complete authentication system that can be used as a starter code for creating any new application.

### Setup the Project
Clone or Download the Repo.
`cd NodeJS-Authentication-Project` goto the Repo using Terminal.
run `npm install --save` to download all the libraries
Run `npm start` to ignite the project.
### Routes

1. Swagger Homepage: http://localhost:3000/ 
2. Sign Up: (POST) http://localhost:3000/auth/register
3. Sign In:(POST) http://localhost:3000/auth/login
4. Google Sign In And Sign Up: (GET) http://localhost:3000/auth/login/google
5. Logout: (POST) http://localhost:3000/auth/logout

6. My profile: (GET)  http://localhost:3000/profile/me
7. Profile Update:(PUT)  http://localhost:3000/profile/me  
8. Profile Photo:(POST)  http://localhost:3000/profile/me/photo
9. Images Upload:(POST)  http://localhost:3000/profile/photos
10. Privacy Update:(PUT) http://localhost:3000/profile/me/privacy
11. Access Public User:(GET)  http://localhost:3000/profile/public
12. Access all User:(GET)  http://localhost:3000/profile/

### Instruction 
After Login copy and paste the token in authorization field for the authentication.
