var express =     require("express"),
        app =     express(),
 bodyParser =     require("body-parser"),
 passport   =     require("passport"),
LocalStrategy=    require("passport-local"),
methodOverride=require("method-override"),
User        =     require("./models/user.js"),
 Campground =     require("./models/campground"),
 Comment   =      require("./models/comment"),
   mongoose =     require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.use(express.static("public"));

//var seedDB       =     require("./seeds");
//Route variables
var commentRoutes=require("./routes/comments"),
campgroundRoutes=require("./routes/campgrounds"),
indexRoutes=require("./routes/index");

//seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret:"Welcome to the Hello World Session",
   resave:false,
   saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));

//middleware to use in every routes to see if user is logged in
app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
});

//Use route files
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);





app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
    });
