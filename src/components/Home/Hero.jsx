import HeroPlant from "../../assets/HeroPlant.webp";
import over from "../../assets/HeroOverlay.webp";
import { useEffect, useRef, useState } from "react";
import SearchBox from "./SearchBox";
import { useFetchProducts } from "../../Hooks/useFetchProducts";
const INFO = [
  { id: 1, title: "Plant Species", num: "50+" },
  { id: 2, title: "Customers", num: "100+" },
];
const Hero = () => {
  const [search, setSearch] = useState("");

  const refdiv = useRef(null);
  const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useFetchProducts(page, 3, search);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const Search = async (e) => {
    refdiv.current.style.display = "block";
    const value = e.target.value.replace(/\\/g, "");
    setSearch(value);
  };

  return (
    <section className="my-8">
      <div className="container  overflow-hidden px-[20px] mx-auto md:flex-row flex-col  bg-[#CFE4E3] md:rounded-2xl flex items-center justify-between md:px-14 py-10  relative">
        <div className="">
          <h1 className="md:text-6xl text-4xl font-extrabold leading-tight text-black">
            Buy your
            <br />
            dream plants
          </h1>

          <ul className="flex items-center gap-10 mt-8">
            {INFO.map((info, index) => (
              <li
                key={info.id}
                className={`${
                  index === 0 ? "pr-8 border-r border-black/30" : "pl-8"
                }`}
              >
                <h2 className="text-2xl font-semibold">{info.num}</h2>
                <p className="text-sm text-black/70">{info.title}</p>
              </li>
            ))}
          </ul>

          <div className="flex gap-[30px]">
            <div className="mt-10 relative md:w-[360px] ">
              <div className="flex relative">
                <input
                  onChange={Search}
                  value={search}
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full bg-white py-4 pl-5 pr-14 rounded-xl focus:outline-none"
                />

                <div className="absolute   right-2 top-1/2 -translate-y-1/2 bg-[#CFE4E3] p-3 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
                    />
                  </svg>
                </div>
              </div>
              <SearchBox
                refdiv={refdiv}
                isLoading={isLoading}
                data={data}
                error={isError}
                setPage={setPage}
                page={page}
              />
            </div>
            <svg
              className="pt-[10px] xl:block hidden"
              width="184"
              height="87"
              viewBox="0 0 184 87"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00015 36.0352C3.42035 22.1395 2.8636 4.56141 20.0032 2.10874C28.1475 0.943283 38.4818 9.40914 40.9955 16.526C43.0806 22.4293 47.7778 29.0032 43.3777 35.1143C39.9216 39.9144 33.8658 42.0309 28.3342 39.2512C12.6258 31.3573 28.1976 14.4659 38.5612 12.271C52.7067 9.27514 81.7106 35.31 74.7369 50.4291C68.7577 63.3921 56.577 52.628 59.9571 41.7103C64.7118 26.3524 73.3627 22.2321 89.643 29.5255C102.355 35.2202 106.84 52.9444 103.563 64.6777C102.882 67.1146 102.86 82.1447 101 81.4339C82.6434 74.4203 97.7372 46.0749 111.646 43.2425C127.628 39.9881 143.835 36.8777 158.513 44.3536C166.407 48.3738 185.604 66.6221 180.361 59.4817C173.801 50.546 165.754 37.875 165.642 26.2296C165.609 22.7645 165.236 11.7016 166.064 22.2407C166.916 33.0947 167.414 42.6751 170.137 52.6508C170.743 54.8708 174.738 56.6803 176.428 58.0604C177.859 59.2294 170.904 59.9139 170.139 60.1508C163.536 62.1966 158.799 67.1014 154.675 72.4434C150.995 77.2114 147.628 84.6459 143.212 84.4016"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className=" relative">
          <svg
            className="absolute top-0 right-0 pb-10 xl:block hidden "
            width="90"
            height="175"
            viewBox="0 0 90 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.52257 2.47842C33.6915 9.78138 27.9891 7.84413 52.2598 27.4032C57.803 31.8704 66.2503 37.675 67.8304 43.8105C70.1621 52.8646 50.5484 74.448 39.514 62.5287C32.3828 54.8256 34.559 44.7366 46.2372 44.4866C65.3886 44.0766 79.6093 60.7197 84.666 73.5258C90.2332 87.6247 83.8553 100.333 68.0718 105.499C60.8614 107.859 49.7854 103.667 56.4978 96.7813C70.3042 82.619 83.4925 106.32 80.735 117.126C75.7681 136.59 43.8704 156.633 16.0447 146.292C7.34474 143.058 10.4222 140.744 14.2625 139.371C18.1592 137.979 28.1316 131.967 25.392 134.478C20.6027 138.867 14.8482 139.8 8.36871 141.578C0.0113759 143.873 16.7202 156.503 21.5193 160.758C24.0387 162.991 27.6087 167.543 28.1335 170.404C29.17 176.056 19.981 159.879 18.5272 154.234"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <img
            src={HeroPlant}
            alt="Plant"
            className="relative md:left-10  bottom-[-50px] z-10 w-[400px]"
          />
        </div>
        <img
          src={over}
          alt="Plant"
          className="absolute bottom-0  right-[30px] md:block hidden  xl:w-[400px] w-[300px] "
        />
      </div>
    </section>
  );
};

export default Hero;
