import classes from './DropFile.module.scss';
import { useDrop } from './model';

function DropFile({ handleClose, handleCloseDropAndSave, title, text, files, getRootProps, getInputProps }) {
  return (
    <div className={classes.inner}>
      <section className={classes.container}>
        <h2 className={classes.title}>{title}</h2>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps({ className: classes.input })} />
          <p className={classes.text}>{text}</p>
          {files.length > 0 && <p className={classes['file-list']}>{files[0].name}</p>}
        </div>
        <button className={classes.button} onClick={handleCloseDropAndSave}>
          Предложить
        </button>
        {/* <aside className={classes.thumbsContainer}>
          {files.map(file => (
            <div className={classes.thumb} key={file.name}>
              <div className={classes.thumbInner}>
                <img className={classes.img} src={file.preview} alt="preview" />
              </div>
            </div>
          ))}
        </aside> */}
      </section>
    </div>
  );
}

export default DropFile;
