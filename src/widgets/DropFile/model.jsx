import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useDrop = config => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*, video/*',
    multiple: false,
    ...config,
    onDrop: acceptedFiles => {
      setFiles([
        // ...files,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      ]);
    },
  });

  useEffect(() => {
    if (Array.isArray(files)) {
      files.forEach(file => {
        if (file) URL.revokeObjectURL(file.preview);
      });
    }
  }, [files]);

  const handleUpload = e => {
    // resetState();
    e.preventDefault();
    try {
      setFiles([inputRef.current.files[0]]);
    } catch (err) {
      console.log(err);
    }
  };

  const resetState = () => {
    if (inputRef.current) inputRef.current.value = null;
    setFiles([]);
  };

  return { isDragActive, resetState, files, inputRef, setFiles, getRootProps, getInputProps, handleUpload };
};
