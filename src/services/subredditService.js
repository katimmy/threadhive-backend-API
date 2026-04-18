import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

export const fetchAllSubreddits = async () => {
  //Return all subreddits in the database
  const subreddits = await Subreddit.find();
  return subreddits;
};

export const createNewSubreddit = async (name, description, author) => {
  //Create a new subreddit in the database but first check if a subreddit with the same name already exists. If it does, throw an error.
  const existingSubreddit = await Subreddit.findOne({name});
  if (existingSubreddit) {
    throw new Error("A subreddit with this name already exists.");
  } 

  const data = {name, description, author};
  const newSubreddit = await Subreddit.create(data);
  await newSubreddit.save();
  return newSubreddit;
};

export const fetchSubredditWithThreads = async (id) => {
  // Fetch a subreddit by its id and populate the threads field with the corresponding threads from the Thread collection. If the subreddit does not exist, throw an error.
  const subreddit = await Subreddit.findById(id).populate("threads");
  if (!subreddit) {
    throw new Error("Subreddit not found.");
  }
  return subreddit; 
};
