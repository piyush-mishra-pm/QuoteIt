import React, {useRef, useState, useEffect} from 'react';

import Button from './Button';

import './ImagePicker.css';

function ImagePicker(props) {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    // Executes whenever file changes.
    useEffect(()=>{
        // If no file present, then return.
        if(!file){
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    },[file]);

    function pickedOnChangeHandler(e){
        let pickedFile;
        let fileIsValid = isValid;

        // Picking only 1 file:
        if(e.target.files || e.target.files.length === 1){
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else{
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    function pickImageBtnOnClickHandler(){
        filePickerRef.current.click();
    }

    return (
        // "form-control " class is present in Input.css
        <div className="form-control">
            <input
                type="file"
                accept=".jpg,.png,.jpeg"
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                onChange={pickedOnChangeHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageBtnOnClickHandler}>
                    Pick Image
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
}

export default ImagePicker;
