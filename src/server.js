// server.js
import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// Add a favorite
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeID, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeID || !title || !image || !cookTime || !servings) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newFavorite = await db.insert(favoritesTable).values({
      userId,
      recipeID,
      title,
      image,
      cookTime,
      servings,
    }).returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.get("/api/favorites/:userId",async(req,res)=>{
    try{
        const{userId}=req.params;

        const userFavorites = await db

        .select()
        .from(favoritesTable)
        .where(eq(favoritesTable.userId,userId));
        res.status(200).json(userFavorites);

    }catch(error){
        console.log("error fetchinf the favorites",error);
        res.status(500).json({error:"something went wrong"});
    }
})




// Delete a favorite
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const result = await db.delete(favoritesTable).where(
      and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeID, parseInt(recipeId)))
    );

    if (result.count === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
