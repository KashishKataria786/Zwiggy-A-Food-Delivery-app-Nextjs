import { MdModeEditOutline ,MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
const FoodItemCard = ({image, name,description,price}) => {
  return (
    <div>
      <div>
        <img src="" alt="Image"/>
      </div>
      <div>
        <h1>Burger</h1>
        <p>A delicious birfger wit thd side of french fries and many ore things!</p>
        <div>
          {/* Price */}
          <div>

          </div>
          <div>
            <div>
              <CiHeart/>
            </div>
            {/* button */}
            <div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItemCard
