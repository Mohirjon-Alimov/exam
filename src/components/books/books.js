import axios from "axios";
import { useEffect, useState } from "react";
import { BookCard } from "./bookCard";

export const RenderBooks = ({ id, value, setValue }) => {
  const [data] = useState();
  useEffect(() => {
    axios
      .get(`https://book-service-layer.herokuapp.com/book/genreId/${id}`)
      .then((data) => setValue(data.data))
      .catch((err) => console.log(err));
  }, [id, setValue]);

  return (
    <>
      {value ? (
        <ul className=" list-unstyled m-0 p-0  d-flex flex-wrap justify-content-evenly">
          {value.map((e) => (
            <BookCard author={e.author_id} key={e.id} data={e} />
          ))}
        </ul>
      ) : (
        data !== undefined && (
          <ul className=" list-unstyled d-flex m-0 p-0 flex-wrap justify-content-evenly">
            {data.map((e) => (
              <BookCard author={e.author_id} key={e.id} data={e} />
            ))}
          </ul>
        )
      )}
    </>
  );
};
