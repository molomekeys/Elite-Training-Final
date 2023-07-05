import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

interface FileWithPreview extends File {
  preview: string;
}

interface PropsType{
    saveLicence:(val:string)=>void
}

export default function FileUploader({saveLicence}:PropsType) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);


  const { getRootProps, getInputProps } = useDropzone({
    accept:{
        'image/png': ['.png'],'image/jpeg': ['.jpg']
    },
   
    onDrop: (acceptedFiles) => {

        let file =acceptedFiles[0]

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      const reader = new FileReader

          if(file!=undefined)
          {
      reader.onload = () => {
        // Do whatever you want with the file contents
        const base64String = reader.result?.toString().replace('data:', '')
        .replace(/^.+,/, '');

        
          base64String&&saveLicence(base64String)
        
      }
      reader.readAsDataURL(file)

    }
    }
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="Preview"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <section className="bg-slate-200 text-center font-semibold flex items-center justify-center py-3 flex flex-col">
      <div {...getRootProps({ className: 'dropzone' })} >
        <input {...getInputProps()} />
        <p className='text-sm'>{ "Glisser déposer votre carte professionnelle, ou cliquer pour l'ajouter"}</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

