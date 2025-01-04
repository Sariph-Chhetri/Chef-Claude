export default function Recipe (props){
    return(
        <section className="get-recipe-container">
                <div ref={props.recipeSection}>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from a list of your ingredients.</p>
                </div>
                <button onClick={props.onClick}>Recipe</button>
            </section>
    )
}