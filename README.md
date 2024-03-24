# NodeJS-Authentication-Project
A complete authentication system which can be used as a starter code for creating any new application.

### Setup the Project
Clone or Download the Repo.
`cd NodeJS-Authentication-Project` goto the Repo using Terminal.
run `npm install --save` to download all the librabries
Run `npm start` to ignite the project.
### Routes

Swagger Homepage: http://localhost:3000/
Sign Up: (POST) http://localhost:3000/auth/register
Sign In:(POST) http://localhost:3000/auth/login
Google Sign In And Sign Up: (GET) http://localhost:3000/auth/login/google
Logout: (POST) http://localhost:3000/auth/logout

My profile: (GET)  http://localhost:3000/profile/me
Profile Update:(PUT)  http://localhost:3000/profile/me  
Profile Photo:(POST)  http://localhost:3000/profile/me/photo
Images Upload:(POST)  http://localhost:3000/profile/photos
Privacy Update:(PUT) http://localhost:3000/profile/me/privacy
Access Public User:(GET)  http://localhost:3000/profile/public
Access all User:(GET)  http://localhost:3000/profile/

### Instruction 
After Login copy and paste the token in authorization field for the authentication.
