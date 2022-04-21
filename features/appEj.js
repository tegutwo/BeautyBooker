 const Express =  require("express");
 var app = Express();
 app.use(Express.urlencoded({
    extended: true
  }));
 app.get("/",(req,res)=>{
    res.send("<h1>Callback Url</h1>");
 })
 app.post("/",(req,res)=>{
    console.log(req.body.Body);
 })
 app.listen("3000",()=>{
     console.log("Server started on port 3000");
 })