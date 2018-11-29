var request = require("request");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressHbs = require("express-handlebars");
var passport = require("passport");
var OneLoginStrategy = require("passport-openidconnect").Strategy;
var session = require("express-session");

var indexRouter = require("./routes/index");
var users = require("./routes/users");
var departmentsRouter = require("./routes/departments");
var employeesRouter = require("./routes/employees");
var dashboardRouter = require("./routes/dashboard");
var twitterRouter = require("./routes/twitter");
var employeeRouter = require("./routes/employee");
var managersRouter = require("./routes/managers");

const OIDC_BASE_URI = `https://openid-connect.onelogin.com/oidc`;

var path = require("path");
var fs = require("fs");
var http = require("http");
var https = require("https");

var certOptions = {
  key: fs.readFileSync(path.resolve("config/cert/server.key")),
  cert: fs.readFileSync(path.resolve("config/cert/server.crt"))
};

var app = express();

// start http and https server
// mainly used https for security purpose
var httpServer = http.createServer(app);
var httpsServer = https.createServer(certOptions, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// connect to oneLogin
passport.use(
  new OneLoginStrategy(
    {
      issuer: OIDC_BASE_URI,
      clientID: "d96156d0-c9e6-0136-4fc7-02c985c72496137432",
      clientSecret:
        "eb3ceadd57e7b4c5b5ad596db15ce2f7e8bcecb809e59b77ce82f2f406e35cd9",
      authorizationURL: `${OIDC_BASE_URI}/auth`,
      userInfoURL: `${OIDC_BASE_URI}/me`,
      tokenURL: `${OIDC_BASE_URI}/token`,
      callbackURL: "http://localhost:3000/oauth/callback",
      passReqToCallback: true
    },
    function(
      req,
      issuer,
      userId,
      profile,
      accessToken,
      refreshToken,
      params,
      cb
    ) {
      // console.log("issuer:", issuer);
      // console.log("userId:", userId);
      // console.log("accessToken:", accessToken);
      // console.log("refreshToken:", refreshToken);
      // console.log("params:", params);

      req.session.accessToken = accessToken;

      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// view engine setup
app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret squirrel",
    resave: false,
    saveUninitialized: true
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// check if the user is authenticated or not
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
}

// give user variable across all routes
// to check if the user is authenticated
app.use(function(req, res, next) {
  if (req.user) {
  res.locals.user = {
    authenticated: req.isAuthenticated(),
    loginUser: req.user
  };
    console.log(req.user.name.givenName)
    
    // show the object in req.user
    // console.dir(req.user.name.givenName, { depth: null });
  }
  next();
});

// app.use(function(req, res, next) {
//   res.locals.user = req.user;
//   next();
// });

// Only allow authenticated users to access the route
app.use("/users", checkAuthentication, users);
app.use("/departments", checkAuthentication, departmentsRouter);
app.use("/employees", checkAuthentication, employeesRouter);
app.use("/dashboard", checkAuthentication, dashboardRouter);
app.use("/twitter", checkAuthentication, twitterRouter);
app.use("/employee", checkAuthentication, employeeRouter);
app.use("/managers", checkAuthentication, managersRouter);

// Initiates an authentication request with OneLogin
// The user will be redirect to OneLogin and once authenticated
// they will be returned to the callback handler below
app.get(
  "/login",
  passport.authenticate("openidconnect", {
    successReturnToOrRedirect: "/",
    scope: "email profile"
  })
);

// Callback handler that OneLogin will redirect back to
// after successfully authenticating the user
app.get(
  "/oauth/callback",
  passport.authenticate("openidconnect", {
    callback: true,
    successReturnToOrRedirect: "/",
    failureRedirect: "/"
  })
);

// Destroy both the local session and
// revoke the access_token at OneLogin
app.get("/logout", function(req, res) {
  request.post(
    `https://openid-connect.onelogin.com/oidc/token/revocation`,
    {
      form: {
        client_id: "d96156d0-c9e6-0136-4fc7-02c985c72496137432",
        client_secret:
          "eb3ceadd57e7b4c5b5ad596db15ce2f7e8bcecb809e59b77ce82f2f406e35cd9",
        token: req.session.accessToken,
        token_type_hint: "access_token"
      }
    },
    function(err, respose, body) {
      console.log("Session Revoked at OneLogin");
      res.redirect("/");
    }
  );
  req.logOut();
  req.session.destroy();
});

app.use("/", indexRouter);
// app.use('/users', usersRouter);
app.use("/departments", departmentsRouter);
app.use("/employees", employeesRouter);
app.use("/dashboard", dashboardRouter);
app.use("/twitter", twitterRouter);
app.use("/employee", employeeRouter);
app.use("/managers", managersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
