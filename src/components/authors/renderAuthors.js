import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../card";

export const RenderAuthors = ({ id, value, setAuthor }) => {
  const [data] = useState();
  useEffect(() => {
    axios
      .get(`https://book-service-layer.herokuapp.com/author/genreId/${id}`)
      .then((data) => setAuthor(data.data))
      .catch((err) => console.log(err));

  }, [ id, setAuthor]);

  

  return (
    <>
      {value ? (
        <ul className="list-unstyled m-0 p-0 d-flex flex-wrap justify-content-evenly">
          {value.map((e) => (
            <Card key={e.id} data={e} />
          ))}
        </ul>
      ) : (
        data && (
          <ul className="flex-wrap m-0 p-0 list-unstyled d-flex flex-wrap justify-content-around">
            {data.map((e) => (
              <Card key={e.id} data={e} />
            ))}
          </ul>
        )
      )}
    </>
  );
};
