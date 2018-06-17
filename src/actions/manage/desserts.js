import {
  desserts,
  addToDb,
  updateDb,
  removeDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler
} from '../../firebase/firebase';
import generateRandomID from 'uuid/v4';

export const FETCH_DESSERTS = 'desserts/FETCH';

const db = 'desserts';
const storage = 'images';
/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

export const addDessert = data => async dispatch => {
  if (data.image) {
    // if there's an image to upload
    let imageName = genRandomFilename(); // get img name
    let task = addStorage(storage, imageName, data.image); // upload to firebase storage
    fbTaskHandler(
      task,
      () => addToDb(db, data.name, data),
      () => getFbUrl(task, imageName, data, addToDb, db)
    );
  } else {
    addToDb(db, data.name, data);
  }
};

export const removeDessert = data => async dispatch => {
  if (data.imageRef) {
    removeStorage(storage, data.imageRef, data.name);
  }
  removeDb(db, data.name);
};

export const updateDessert = data => async dispatch => {
  let imageName;
  if (data.newDessert.imageRef) {
    imageName = data.newDessert.imageRef;
  } else {
    imageName = genRandomFilename(); // get img name
  }
  if (data.oldName === data.newDessert.name) {
    if (data.newImage) {
      // new image, same dessert name -> update img & dessert
      let task = addStorage(storage, imageName, data.newDessert.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => updateDb(db, data.newDessert.name, data.newDessert),
        () => getFbUrl(task, imageName, data.newDessert, updateDb, db)
      );
    } else {
      // same image, same dessert name -> update dessert
      updateDb(db, data.oldName, data.newDessert);
    }
  } else {
    removeDb(db, data.oldName, null); // remove old dessert
    if (data.newImage) {
      // new image, diff dessert name -> delete dessert, add img/dessert, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addStorage(storage, imageName, data.newDessert.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => addToDb(db, data.newDessert.name, data.newDessert),
        () => getFbUrl(task, imageName, data.newDessert, addToDb, db)
      );
    } else {
      // same image, diff dessert name -> delete dessert, add dessert
      addToDb(db, data.newDessert.name, data.newDessert);
    }
  }
};

export const fetchDesserts = () => async dispatch => {
  desserts.on('value', snapshot => {
    dispatch({
      type: FETCH_DESSERTS,
      payload: snapshot.val()
    });
  });
};
