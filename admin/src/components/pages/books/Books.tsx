import {Add} from "../../../assets/Icons";
import React, {useEffect, useRef, useState} from "react";
import AddBook from "./AddBook";
import Popup from "../../../components/ui/Popup";
import GridContainer from "../../../components/ui/GridContainer";
import Search from "../../../components/ui/Search";
import useFilter from "../../../hooks/useFilter";
import useSimulatedFetch from "../../../hooks/useSimulatedFetch";
import ProductCard from "../../../components/ui/ProductCard";
import {cn} from "../../../utils/cn";

interface BookType {
  id: string;
  imageUrl: string;
  title: string;
  genre: string;
  avgRating: number;
  description: string;
  type: "free" | "premium";
}

const Books = () => {
  const {fetchData, error, loading} = useSimulatedFetch("api/books");

  const originalData = useRef<BookType[]>([]);
  const [filteredData, setFilteredData] = useState<BookType[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [activeFilter, setActiveFilter] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleBookAdded = () => {
    setOpenPopup(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = (await fetchData()) as {
          ok: boolean;
          data: BookType[];
        };

        if (!response.ok) throw new Error("Invalid response!");
        originalData.current = response.data;
        setFilteredData(originalData.current);
      } catch (error) {
        console.log("Error fetching the data");
      }
    };
    loadData();
  }, []);

  const handleSearch = (searchKey: string) => {
    setSearchKeyword(searchKey);
    const filtered = useFilter(originalData.current ?? [], searchKey) as BookType[];
    applyFilter(activeFilter, filtered);
  };

  const applyFilter = (filterType: number, data: BookType[] = originalData.current) => {
    let filteredBooks = data;

    if (filterType === 2) {
      filteredBooks = data.filter((book) => book.type === "free");
    } else if (filterType === 3) {
      filteredBooks = data.filter((book) => book.type === "premium");
    }

    setFilteredData(filteredBooks);
  };

  const handleFilterChange = (filterType: number) => {
    setActiveFilter(filterType);
    const filtered = useFilter(originalData.current ?? [], searchKeyword) as BookType[];
    applyFilter(filterType, filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <>Error Fetching Book Data</>;

  return (
    <div className="py-2">
      <Search handleSearch={handleSearch} />

      <div className="flex my-4">
        <div className="flex rounded-full overflow-hidden cursor-pointer">
          <div
            onClick={() => handleFilterChange(1)}
            className={cn(
              "px-8 py-2",
              activeFilter === 1
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            All Books
          </div>
          <div
            onClick={() => handleFilterChange(2)}
            className={cn(
              "px-8 py-2",
              activeFilter === 2
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            Free
          </div>
          <div
            onClick={() => handleFilterChange(3)}
            className={cn(
              "px-8 py-2",
              activeFilter === 3
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            Premium
          </div>
        </div>
      </div>

      <GridContainer>
        <AddNewBook setOpenPopup={setOpenPopup} />
        {filteredData.map((data) => (
          <ProductCard key={data.id} data={data} />
        ))}
      </GridContainer>
      {filteredData.length === 0 && (
        <div className="mx-4 py-5 text-4xl flex justify-center items-center">No items found</div>
      )}
      {openPopup && (
        <Popup openPopup={openPopup} closeThePopup={() => setOpenPopup(false)}>
          <AddBook onBookAdded={handleBookAdded} />
        </Popup>
      )}
    </div>
  );
};

const AddNewBook = ({
  setOpenPopup,
}: {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div
    className="h-full min-h-64 flex flex-col justify-center items-center cursor-pointer border border-solid border-slate-700 rounded-lg hover:shadow-light"
    onClick={() => setOpenPopup(true)}
  >
    <div className="w-16 h-16 mb-5 flex justify-center items-center rounded-full bg-slate-700">
      <Add className="text-foreground" />
    </div>
    <div className="text-2xl">Add Book</div>
  </div>
);

export default Books;
