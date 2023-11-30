import express from "express"
import passport from "passport"
import "./googleoauth.js"
import session from "express-session"
function isLog(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
const app = express();
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
app.get("/",(req,res)=>{
    res.sendFile("C:/Users/DHANALAKSHMI R/OneDrive/Documents/googleoauth/pac/index.html");
})

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'auth/failure'
    })
);

app.get("/protected",isLog, (req,res)=>{
    res.sendFile("C:/Users/DHANALAKSHMI R/OneDrive/Documents/googleoauth/pac/list.html")
});

app.get('/auth/failure',(req,res)=>{
    res.send("try again later!!!");
});
app.get('/logout', (req, res) => {
   
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/login');
        });
    });
});


app.listen(3000,()=>{
    console.log("http://localhost:3000/running");
})
