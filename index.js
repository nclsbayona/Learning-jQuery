$(document).ready(function () {
    $("#fetch-more").click(function () {
        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/random.php", success: function (result) {
                for (let drink of result.drinks) {
                    let name = drink.strDrink;
                    let category = drink.strCategory;
                    let alcoholic = drink.strAlcoholic;
                    let instructions = drink.strInstructions;
                    let imageSource = drink.strDrinkThumb;
                    let count = 0;
                    ingredients = [];
                    for (let [key, value] of Object.entries(drink)) {
                        if (key.startsWith("strIngredient")) {
                            if (value != null && value!='') {
                                count += 1;
                                console.log(value)
                                let obj = [value, drink[`strMeasure${count}`]];
                                ingredients.push(obj);
                            }
                            else
                                break;
                        }
                    }
                    console.log(ingredients);
                    let img = `<img src='${imageSource}' class="d-block w-100" alt='${name}'>`
                    let table = "<table class='table table-striped table-hover bg-light'>\n";
                    table += "<thead><tr><th scope='col'>#</th><th scope='col'>Ingredient</th><th scope='col'>Measure</th></thead>\n<tbody>\n";
                    ingredients.forEach(function (value, index) {
                        table += `<tr><th scope='row'>${index + 1}</th><td>${value[0]}</td><td>${value[1]}</td></tr>\n`;
                    });
                    table += "</tbody>\n</table>";
                    let p=`<p class='text-center bg-dark'>Name: ${name}\nCategory: ${category}\nAlcoholic: ${alcoholic}\nTable: ${table}\nInstructions: ${instructions}</p>`;
                    let div=`<div class='carousel-caption d-none d-md-block'>${p}</div>`;
                    let item=`<div class="carousel-item" data-bs-interval="10000">${img}\n${div}</div>`
                    $("#carousel-items").append(item);
                }
            }
        });
    });
});