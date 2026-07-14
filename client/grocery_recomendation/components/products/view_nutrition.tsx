interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

interface ViewNutritionProps {
  product: Product;
}

export default function ViewNutrition({
  product,
}: ViewNutritionProps) {
  const imageUrl = `http://localhost:5001/uploads/products/${product.image}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Product Image */}
        <div>

          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl"
          />

        </div>

        {/* Product Details */}
        <div>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-6 leading-8">
            {product.description}
          </p>

          {/* Nutrition */}
          <div className="mt-10">

            <h2 className="text-2xl font-semibold mb-5">
              Nutrition Facts
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div className="border rounded-xl p-5">
                <p className="text-gray-500">
                  Calories
                </p>

                <h3 className="text-2xl font-bold text-green-700">
                  {product.calories} kcal
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500">
                  Protein
                </p>

                <h3 className="text-2xl font-bold text-green-700">
                  {product.protein} g
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500">
                  Carbohydrates
                </p>

                <h3 className="text-2xl font-bold text-green-700">
                  {product.carbohydrates} g
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-gray-500">
                  Fat
                </p>

                <h3 className="text-2xl font-bold text-green-700">
                  {product.fat} g
                </h3>
              </div>

            </div>

          </div>

          {/* Health Information */}

          <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold text-green-700 mb-3">
              Healthy Choice
            </h2>

            <p className="text-gray-700 leading-7">
              This product contains valuable nutrients that can support a
              balanced diet. To know whether it is suitable for your health
              goals, visit the Recommendation page and receive personalized
              grocery suggestions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}