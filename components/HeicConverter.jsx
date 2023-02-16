import { useState } from "react";
import heic2any from "heic-convert";
import Image from "next/image";

export default function HEICtoJPEGConverter() {
  const [previewImage, setPreviewImage] = useState("");
  const [convertedFile, setConvertedFile] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file.type === "image/heic") {
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });
      setConvertedFile(new File([converted], `${file.name}.jpeg`, { type: "image/jpeg" }));
      setPreviewImage(URL.createObjectURL(converted));
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(convertedFile);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", convertedFile.name);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {previewImage && <Image src={previewImage} width={400} height={400} />}
      {convertedFile && <button onClick={handleDownload}>Download</button>}
    </div>
  );
}
