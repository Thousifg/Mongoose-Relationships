const express = require('express');//importing express here
const mongoose = require('mongoose');//importing mongoose here
const app = express();// making use of express function

app.use(express.json()); //we have to make operation in json data it will convrt data in json format


//connecting mongoose
const connect =() =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/bookLib",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}



//creating auther schema
const authorSchema = new mongoose.Schema({
    first_name : { type: String, require: true },
    last_name : { type: String, require: true },
},{
    versionKey: false,
    timestamps: true,
});


const Author = mongoose.model("author", authorSchema)

//creating section schema
const sectionSchema = new mongoose.Schema({
    sec_name : { type: String, require: true },
},{
    versionKey: false,
    timestamps: true,
});


const Section = mongoose.model("section", sectionSchema)

//creating book schema
const bookSchema = new mongoose.Schema({
    book_name : { type: String, require: true },
    book_body : { type: String, require: true },
    checkOut : { type: Boolean, require: true },
    sec_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        require: true,
    },
    authorids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        require: true,
    }]
},{
    versionKey: false,
    timestamps: true,
});


const Book = mongoose.model("book", bookSchema)


//_____CRUD OPERATIONS ON SECTIONS_____//

app.post("/sections", async (req, res) => {
    const data = await Section.create(req.body);
    return res.send(data);
});

app.get("/sections", async (req, res) => {
    const data = await Section.find().lean().exec();
    return res.send(data);
});


//_____CRUD OPERATIONS ON AUTHOR_____//
app.post("/author", async (req, res) => {
    const data = await Author.create(req.body);
    return res.send(data);
});

app.get("/author", async (req, res) => {
    const data = await Author.find().lean().exec();
    return res.send(data);
});



//_____CRUD OPERATIONS ON BOOK_____//

app.post("/book", async (req, res) => {
    const data = await Book.create(req.body);
    return res.send(data);
});

app.get("/book", async (req, res) => {
    const data = await Book.find().lean().exec();
    return res.send(data);
});

app.patch("/book/:id", async function(req, res){
    const data = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean()
    return res.send(data);
});

app.get("/book/checkout", async function(req, res){
    const data = await Book.find({"checkOut":{$eq: true}}).lean()
    return res.send(data);
});

app.get("/book/ncheckout", async function(req, res){
    const data = await Book.find({"checkOut":{$eq: false}}).lean()
    return res.send(data);
});

app.get("/book/:id/user", async function(req, res){
    const data = await Book.find({authorids: req.params.id}).lean().exec()
    return res.send(data); 
})

app.get("/book/:id/user/section", async function(req, res){
    const data = await Book.find({$and: [{authorids: req.params.id},{"checkOut":{$eq: false}}]}).lean().exec()
    return res.send(data); 
})




//creating listening port
app.listen(2325,async ()=>{
    await connect();
    console.log("listening on port 2325")
});