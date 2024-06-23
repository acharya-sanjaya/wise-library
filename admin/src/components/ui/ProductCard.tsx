import {useNavigate} from "react-router-dom";
import {BookDataType} from "../../utils/data";
import Button from "./Button";

const ProductCard = ({data}: {data: BookDataType}) => {
  const navigate = useNavigate();

  return (
    <div
      className=" relative border border-solid border-secondary-foreground rounded-lg py-4 cursor-pointer hover:shadow-primary"
      onClick={() => navigate(`/book-description/${data.id}`, {state: {data}})}
    >
      {data.type === "premium" && (
        <div className="absolute top-2 right-1">
          <Button variant="premium" label="Premium" />
        </div>
      )}
      <div className="w-[90%] m-auto flex flex-col gap-1">
        <img src={data.imageUrl} className="w-full h-48 rounded-md" alt="Book Image" />
        <div>{data.title}</div>
        <div>{data.genre}</div>
        <div>{data.avgRating}⭐</div>
      </div>
    </div>
  );
};

export default ProductCard;
