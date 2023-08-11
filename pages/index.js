import { useState } from 'react';

function RecipeInfo() {
  const [recipe, setRecipe] = useState('');
  const [nutritionFacts, setNutritionFacts] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/openai/generateinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe })
    });
    const recipeInfo = await response.json();
    setNutritionFacts(recipeInfo.data.split(/\n\n|\n/));
  };

  return (
    <div>
      <h1>查找任何食谱的营养成分</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipe">输入食谱：</label>
        <textarea id="recipe" value={recipe} onChange={(e) => setRecipe(e.target.value)} />
        <button type="submit">提交</button>
      </form>
      {nutritionFacts && (
        <div>
          <h2>营养成分:</h2>
          <ul>
            {nutritionFacts.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeInfo;
