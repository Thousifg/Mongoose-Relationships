const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/Library", {
     useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
}

const userSchema = new mongoose.Schema({
    user: {type:String, required:true}
}, {
    versionkey: false
});

const User = mongoose.model("user", userSchema);

//////////////////////////////////////////////////////////

const sectionSchema = new mongoose.Schema({
    section_number : Number
}, {
    versionkey: false
});

const Section = mongoose.model("section", sectionSchema);

//////////////////////////////////////////////////////////

const bookSchema = new mongoose.Schema({
    book: { type: String, required: true },
    sectionId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true
    }
},
    {
    versionkey: false
})

const Book = mongoose.model("book", bookSchema)

////////////////////////////////////////////////////////

const authorSchema = new mongoose.Schema({
    author_firstname: {type: String, required: true},
    author_lastname: { type: String, required: true },
    bookId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }
},
    {
    versionkey: false
})

const Author = mongoose.model("author", authorSchema)

////////////////////////////////////////////////////////

const checkoutSchema = new mongoose.Schema({
    checkout: { type: String, required: true },
    userId: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    bookId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required:true
    }
},
    {
        versionkey: false,
        timestamps: true
    })

const Checkout = mongoose.model("checkout", checkoutSchema)
    /////////user start////////////
app.get("/use", async function (request, respond) {
    try
    {
        const user = await User.find().lean().exec();
        return respond.status(201).send(user);
    }
    catch (err)
    {
        return respond.status(400).send(err.message);
    }
})

app.post("/use", async function (request, respond) {
    try {
        const user = await User.create(request.body)
        return respond.status(201).send(user);
    }
    catch (err) {
        return respond.status(400).send(err.message);
    }
});

/////////////////////User end/////////////////////

/////////////////////Author start/////////////////////

app.get("/author", async function (request, respond) {
    try
    {
        const auth = await Author.find().lean().exec();
        return respond.status(201).send(auth);
    }
    catch (err)
    {
        return respond.status(400).send(err.message);
    }
})

app.post("/author", async function (request, respond) {
    try {
        const auth = await Author.create(request.body)
        return respond.status(201).send(auth);
    }
    catch (err) {
        return respond.status(400).send(err.message);
    }
});
/////////////////////Author end/////////////////////

/////////////////////Section starts /////////////////

app.get("/section", async function (request, respond) {
    try
    {
        const sect = await Section.find().lean().exec();
        return respond.status(201).send(sect);
    }
    catch (err)
    {
        return respond.status(400).send(err.message);
    }
})

app.post("/section", async function (request, respond) {
    try {
        const sect = await Section.create(request.body)
        return respond.status(201).send(sect);
    }
    catch (err) {
        return respond.status(400).send(err.message);
    }
});

/////////////////////Section ends////////////////////////

/////////////////////Book starts /////////////////

app.get("/book", async function (request, respond) {
    try
    {
        const bookk = await Book.find().lean().exec();
        return respond.status(201).send(bookk);
    }
    catch (err)
    {
        return respond.status(400).send(err.message);
    }
})

app.post("/book", async function (request, respond) {
    try {
        const bookk = await Book.create(request.body)
        return respond.status(201).send(bookk);
    }
    catch (err) {
        return respond.status(400).send(err.message);
    }
});

/////////////////////Book ends////////////////////////


////////////////////Checkout starts////////////////////

app.get("/checkout", async function (request, respond) {
    try
    {
        const check = await Checkout.find().lean().exec();
        return respond.status(201).send(check);
    }
    catch (err)
    {
        return respond.status(400).send(err.message);
    }
})

app.post("/checkout", async function (request, respond) {
    try {
        const check = await Checkout.create(request.body)
        return respond.status(201).send(check);
    }
    catch (err) {
        return respond.status(400).send(err.message);
    }
});




app.get("/book/:id/author", async function (request, respond) {
    const authorBook = await Author.find({ bookId : request.params.id }).lean().exec()
    const book1 = await Book.findById(request.params.id);
    return respond.status(201).json({ Authors: authorBook, books: book1 });
})

/////////////////////CHeckout Ends////////////////////



app.listen(5858, async () => {
    await connect();
    console.log("listening to the port 5858")
})

