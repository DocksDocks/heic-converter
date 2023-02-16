import React, { useState } from 'react'
import { convertHeicToJpeg } from 'util/heic-conversion'

const HeicConverter = () => {
  const [files, setFiles] = useState([])

  const handleFileUpload = (e) => {
    setFiles(e.target.files)
  }

  const handleDownload = () => {
    Promise.all(files.map(f => convertHeicToJpeg(f)))
      .then((jpegData) => {
        jpegData.forEach((data, i) => {
          const link = document.createElement('a');
          link.download = `converted-image${i}.jpg`;
          link.href = data;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      })
  }

  return (
    <div>
      <input type="file" multiple onChange={handleFileUpload} />
      {files.length > 0 && <button onClick={handleDownload}>Download Converted Images</button>}
    </div>
  )
}

export default HeicConverter