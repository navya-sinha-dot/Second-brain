import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./InputComponent";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "Youtube",
  PDF = "PDF",
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addcontent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/content`,
      {
        link,
        type,
        title,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-full h-screen bg-slate-500/50 backdrop-blur-sm fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            {" "}
            <div className="bg-white p-4 rounded-xl">
              <div className="flex justify-end">
                <div onClick={onClose}>
                  <CrossIcon />
                </div>
              </div>
              <Input placeholder="Title" reference={titleRef} />
              <Input placeholder="Link" reference={linkRef} />
              <div className="flex justify-center m-1 p-2 gap-3">
                <Button
                  innertext="Youtube"
                  variants={
                    type == ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Youtube);
                  }}></Button>
                <Button
                  innertext="PDF"
                  variants={
                    type == ContentType.PDF ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.PDF);
                  }}></Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variants="primary"
                  innertext="Submit"
                  onClick={addcontent}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
