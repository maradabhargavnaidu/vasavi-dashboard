import React, { useState } from "react";
import Mainnav from "../MainDashboard/Mainnav";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref, listAll } from "firebase/storage";

const Files = () => {
  const [imageList, setImageList] = useState([]);
  const listRef = ref(storage, "file/");
  React.useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((element) => {
        getDownloadURL(element).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div>
      <Mainnav />
      {imageList.map((src) => {
        return (
          <embed
            src={src}
            width="300px"
            height="300px"
            className="float-right"
          />
        );
      })}
    </div>
  );
};

export default Files;
