import { Composer } from "grammy";
import login from "./loginConversation";
import { MyContext } from "../../initBot.js";
import { conversations, createConversation, Conversation } from "@grammyjs/conversations";

export type MyConversation = Conversation<MyContext>;

const defineConversations = new Composer<MyContext>();

defineConversations.use(conversations());

// Define the conversations.
defineConversations.use(createConversation(login));

export default defineConversations;
