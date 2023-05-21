import mongoose from "mongoose";

// Collection name
const messageCollection = "messages";

// Schema definition

const messageModel1 = new mongoose.Schema({
    user: String,
    message: String
})

const messagesSchema = new mongoose.Schema({
    messages: {
        type: [messageModel1],
        _id : false
    }
});

// Model creation. Collection + Schema
export const messageModel = mongoose.model(messageCollection, messagesSchema);
