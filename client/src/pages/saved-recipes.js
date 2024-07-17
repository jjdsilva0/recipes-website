import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import Loader from "../components/Loader"; // Import Loader component

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes_list/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Handle error and set loading to false
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="saved-recipes-container">
      <h1 className="page-title">Saved Recipes</h1>
      {loading ? ( // Conditionally render loader if data is still loading
        <Loader />
      ) : (
        <ul>
          {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              <div>
                <h3>Ingredients:</h3>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="instructions">
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
