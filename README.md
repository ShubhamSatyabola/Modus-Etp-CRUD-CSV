# Modus-Etp-CRUD-CSV


Project Title: CRUD operation / Node.js / React / CSV



Table of Contents:
1-Description
2-project structure: how folders are structured
3-Installation===> telss about how to setup project in local machine.

4-usage===> how you can use the project / test it.
5-Api endpoints ===> about api funcationalities



Description: 
the project comprises of a frontend which send crud request to create user, edit user, delete user, update user. react is used in frontend while node in backend

Project structue:
project consist of two folders namd client and backend

client==> this consist of a react folder which comprises of all vite+react files 
im frontend main file is src which consist of a component folder in which individual component created and these component are then renderes by react router dom , rest other folders are common .

backend ==> this is on node js comprises of server.js as entry point 
           route folder ==> consist of userRoutes.js which handles all routes
           controller folder ==> consist of all the logic related to crud operartions like getUser for read operation ,deleteUser for delete operations, postUser for create operation , editUser for update operaion

           
            

Installation:
use git to clone the repo as [git-clone https://github.com/ShubhamSatyabola/Modus-Etp-CRUD-CSV.git]
navigate to backend folder [cd backend]===> install dependencies by [npm install] ===> your backend is ready to go now do [npm start or node server.js]
navigate to frontend folder [cd client/react] ===> install dependencies by [npm install] ===> your front end is ready
do [npm run dev] to start server on local machine and [npm run build] for deployment in server.




Usage: after installation and initial setups just navigate the url in browser [http://localhost:5173]
it will move you to home where there is a user table 
if there are any  user you can edit or delete them by edit and delete button if not
you can add user from add user button
new user / editted user will be reflected in the user table

API Reference: 
router.get("/users", userController.getUser);  "this endpoint helps to get data of all user from the csv file ans show them into user table"

router.get('/getUser/:id', userController.getOneUser) "this end point look for a specific user while editing its uses dynamic routing for getting id of the user "

router.post("/post-user", userController.postUser);    "this end point post data fron user form and apeend that to csv file it takes an data object from frontend , it triggers on pressing submit button in user form"

router.put('/edit/:id', userController.editUser)      "this endpoint used to edit user it uses dynamic routing to find user and also takes an data object , it triggers on pressing edit button in user table"

router.delete('/delete/:id',userController.deleteUser)  "this endpoint delete the user and get triggers on prssing delete button in user table"



