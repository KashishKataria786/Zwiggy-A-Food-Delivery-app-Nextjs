import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_oV_DjoF8SMjjUZs7pZaKtENxtdqoXfpGg&s";

const FoodItemCardGrid = ({ image, name, description, price }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6">
      {/* --------- Vertical Card --------- */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={image || placeholder}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="p-1 rounded-full bg-white shadow hover:bg-gray-100">
              <MdModeEditOutline className="text-gray-600" />
            </button>
            <button className="p-1 rounded-full bg-white shadow hover:bg-gray-100">
              <MdOutlineDeleteOutline className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{name || "Dish Name"}</h2>
          <p className="text-sm text-gray-500">
            {description || "A rich, creamy dish that's a favorite for everyone."}
          </p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-orange-500">₹{price || 200}</h3>
            <span className="text-sm text-gray-400 line-through">₹350</span>
          </div>
          <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
            <CiHeart className="text-xl" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* --------- Horizontal Card (Swiggy-style) --------- */}
       <div className="space-y-4 w-full max-w-md mx-auto">
      {/* Card 1: Horizontal Image + Details */}
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex overflow-hidden">
        <img
          src={image || placeholder}
          alt={name}
          className="w-28 h-28 object-cover rounded-l-xl"
        />
        <div className="p-3 flex flex-col justify-between w-full">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {name || "Dish Name"}
            </h2>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {description ||
                "A delicious item that’s great for any time of the day."}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-orange-500">
              ₹{price || 199}
            </span>
            <button className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-600 text-sm">
              <CiHeart className="text-lg" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Smaller Minimal Info Card */}
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {name || "Dish Name"}
            </h2>
            <p className="text-xs text-gray-400">
              {description?.slice(0, 40) || "Quick snack bite!"}
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-base font-bold text-orange-500">
              ₹{price || 120}
            </h3>
            <button className="mt-1 bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full hover:bg-orange-200">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* --------- Full-width Compact Card --------- */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex items-center gap-6">
        <img
          src={image || placeholder}
          alt={name}
          className="w-28 h-28 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{name || "Dish Name"}</h2>
          <p className="text-sm text-gray-500 mt-1">{description || "A quick bite with all the right flavors."}</p>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold text-orange-500">₹{price || 200}</h3>
          <button className="mt-2 w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCardGrid;
