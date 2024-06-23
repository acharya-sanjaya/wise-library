import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {BookDataType} from "../../../utils/data";
import Button from "../../ui/Button";
import {toast} from "react-toastify";
// import BookReviews from "./BookReviews";

const getItemDetails = (productId: string) => {
  const availableIds = ["C001", "C002", "C003", "C004", "C005"];
  if (availableIds.includes(productId))
    return {
      id: productId,
      imageUrl: "https://loremflickr.com/640/480/book",
      title: "The Midnight Library",
      genre: "Contemporary Fiction",
      avgRating: 4.5,
      description:
        "Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, or realizing her dreams of becoming a glaciologist, she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.",
    };
};

const BookDescription = () => {
  const {id: productId} = useParams<{id: string}>();
  const [productData, setProductData] = useState<BookDataType>();
  const location = useLocation();
  const [readOnline, setReadOnline] = useState(false);

  useEffect(() => {
    if (location.state && location.state.data) {
      setProductData(location.state.data);
    } else {
      // @ts-ignore
      setProductData(getItemDetails(productId ?? ""));
    }
  }, [location.state]);

  if (!productData) return <>Product not found</>;
  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 items-center gap-4">
        <img src={productData?.imageUrl} alt="Product Image" className="w-60 h-60" />
        <div className="theme-dark flex flex-col gap-2">
          <div>Title: {productData?.title}</div>
          <div>Genre: {productData?.genre}</div>
          <div>Rating: {productData?.avgRating}</div>
          <div className="mt-4">{productData?.description}</div>
          <div className="flex gap-4">
            <Button
              onClick={() => setReadOnline((p) => !p)}
              label={readOnline ? "Close pdf" : "Read Online"}
              variant={
                readOnline ? "danger" : productData.type === "premium" ? "premium" : "standard"
              }
            />
            <Button
              onClick={() => {
                toast.success("Reservation Made for #" + productId);
              }}
              label="Burrow hardcopy"
              variant={productData.type === "premium" ? "premium" : "standard"}
            />
          </div>
        </div>
      </div>
      {/* <BookReviews /> */}
      {/* <RenderBook filePath="@/pages/books/sample.pdf" /> */}
      {readOnline && (
        <div>
          <div className="text-2xl my-4 mt-8">BOOK PDF</div>
          <iframe
            src="http://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2023-01.pdf"
            className="w-full h-screen"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default BookDescription;
