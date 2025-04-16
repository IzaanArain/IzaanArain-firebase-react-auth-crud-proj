import { app } from "../lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export const upload = (file) => {
    console.log("file",file)
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;
    const storageRef = ref(storage, `uploads/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                reject("something went wrong!" + error.code)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}