import express  from "express";
import axios from "axios";

const app = express();
const port = 3000;

let config ={
    params :{
    client_id :'4c55YZTi9DpCMdwTC2N5G04UMuB_XG956wW4WgenQiM',
    }
};
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/random", async (req,res)=>{
    const result = await axios.get("https://api.unsplash.com/photos/random" , config);
    console.log(result.data.urls);  
    res.render("index.ejs",{url : result.data.urls.small}) 
})

app.post("/search", async (req,res)=>{
    let search = req.body.search;
    let query = Object.keys(req.body);
    let per_page = "per_page";
    let value = 50;
    config.params[query]=search;
    config.params[per_page]= 50;
    // console.log(config);
    try{
    const result = await axios.get("https://api.unsplash.com/photos/",config)
    let index= Math.floor(Math.random()*result.data.length);
    const url = result.data[index].urls.regular
    res.render("index.ejs", {url : url})
    }
    catch(error){
        console.error(error.response.data)
        res.render("index.ejs",{error : error.message})
    }
    
})

app.listen(port , ()=>{
    console.log(`Listening on port ${port}`)
})