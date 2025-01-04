import React from "react";
import Recipe from "./recipe";
import { getRecipeFromMistral } from "./ai";
import ReactMarkdown from "react-markdown";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      // recipeSection.current.scrollIntoView({ behaviour: "smooth" });
      const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
      window.scroll({
          top: yCoord,
          behavior: "smooth"
      })
    }
  }, [recipe]);

  async function recipeShow() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    event.currentTarget.reset();
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="ingredient-form">
        <input
          className="from-input"
          type="text"
          placeholder="e.g. pasta "
          name="ingredient"
        />
        <button className="ingredientBtn">Add ingredients</button>
      </form>
      {ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-List">{ingredientsList}</ul>
          {ingredients.length >= 4 && (
            <Recipe recipeSection={recipeSection} onClick={recipeShow} />
          )}
        </section>
      )}
      {recipe && (
        <section className="suggested-recipe-container">
          <ReactMarkdown>
            {recipe}
            </ReactMarkdown>
        </section>
      )}
    </main>
  );
}
