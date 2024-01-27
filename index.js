let express = require('express');
let path = require('path');
const { v4: uuidv4 } = require('uuid');

let app = express();


let arr = [{
    id:uuidv4(),
    username: "ayush",
    content: "i love java"
},
{
    id:uuidv4(),
    username: "ram",
    content: "i love javascript"
},
{
    id:uuidv4(),
    username: "shyam",
    content: "i love c"
}
];



app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let port = 8080;


app.listen(port,()=>{
    console.log("server is listening")
})


app.get('/posts',(req,res)=>{
    console.log("goood bro");
res.render('index.ejs',{arr});

})

app.get('/posts/new',(req,res)=>{
    console.log("goood bro");
res.render('new.ejs');

})


app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    console.log(id);
    arr.push({id,username,content});
    res.redirect("/posts");
})


app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    console.log(id)
   let post =  arr.find((p)=> id ===p.id);
   res.render('show.ejs',{post});
});