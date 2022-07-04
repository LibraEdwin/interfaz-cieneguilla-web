
export default function PhotoCard (props) {
  const {
    labelFor,
    inputName,
    inputID,
    handlePreviewFile,
    previewFile,
    existsFile,
    classDisplayPhoto = 'preview__anexa--photo',
    refImg

  } = props

  return (
        <div className="card">
            <label
                htmlFor={labelFor}
                className="card__cloud"
            >
                <img src={ previewFile ? '/icons/delete.svg' : '/icons/cloud.svg'} />
            </label>
            <label className="card__foto">
                <img src={existsFile ? previewFile : '/images/file-imagen.svg'} className={ existsFile ? classDisplayPhoto : '' } ref={refImg}/>
            </label>
            <input
                id={inputID}
                name={inputName}
                onChange={handlePreviewFile}
                type="file"
                accept="image/*"
            />
            <div></div>
            <style jsx>{/* css */`
                .card{                    
                    display:flex;
                    position:relative;
                    height: 100%;

                }

                .card__cloud{
                    position:absolute;
                    padding: 10px 0 0 10px;
                    cursor: pointer;
                }

                .card__foto{
                    margin:auto;
                }
            `}</style>
        </div>
  )
}
