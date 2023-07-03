import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage, faVideo, faFile } from "@fortawesome/free-solid-svg-icons";
import "./createPost.css";
import { usePostHandlers } from './hooks/usePostHandlers';
import { openFileSelector } from './utils/openFileSelector';


export default function CreatePost(props) {
    const {
        post,
        enable_inputs,
        submit_ref,
        removeImg,
        removeVideo,
        handleFileSelect,
        handleTextArea,
        handleSubmit
    } = usePostHandlers();


    return createPortal(
        <div className='CP-container'>
            <div className="popup">
                <header>
                    <h1>Create a post</h1>
                    <div className="close" onClick={props.close}> <FontAwesomeIcon icon={faTimes} /></div>
                </header>
                <form onSubmit={(e) => handleSubmit(e, props.close)}>
                    <textarea name="postText" placeholder="What's in your mind?" onChange={handleTextArea}></textarea>
                    {post.images ? (
                        <div className='imgs'>
                            {post?.images?.map((image, i) => {
                                const imagerc = URL.createObjectURL(image);
                                return (
                                    <div className='img' key={image.lastModified}>
                                        <img src={imagerc} alt="" />
                                        <button type='button' className='remove-img' onClick={() => removeImg(i, image.lastModified)} ><FontAwesomeIcon icon={faTimes} /></button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    {post.video ? (
                        <div className="container">
                            <div className='video'>
                                <video src={URL.createObjectURL(post?.video)} controls></video>
                                <button type='button' className='remove-video' onClick={removeVideo} ><FontAwesomeIcon icon={faTimes} /></button>
                            </div>
                        </div>
                    ) : null}
                    {/* {post.file ? (
                        <PdfPlayer file = { post.file } />
                    ) : null} */}
                    <div>
                        <div className='options'>
                            <div onClick={openFileSelector} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faImage} />
                                <input type="file" name='image' id='image' accept='image/*' multiple onChange={(e) => handleFileSelect(e, 'images')} />
                            </div>
                            <div onClick={openFileSelector} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faVideo} />
                                <input type="file" name='video' id='video' accept='video/*' onChange={(e) => handleFileSelect(e, 'video')} />
                            </div>
                            <div onClick={openFileSelector} className={enable_inputs ? "enabled" : ""}>
                                <FontAwesomeIcon icon={faFile} />
                                <input type="file" name='file' id='file' accept='.pdf' onChange={(e) => handleFileSelect(e, 'file')} />
                            </div>
                        </div>
                        <button type='submit' disabled ref={submit_ref}>Post</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("create-post")
    );
}
