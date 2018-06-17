import {
  appetizers,
  addToDb,
  updateDb,
  removeDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler
} from '../../firebase/firebase';
import generateRandomID from 'uuid/v4';

export const FETCH_APPETIZERS = 'appetizers/FETCH';

const db = 'appetizers';
const storage = 'images';
/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

export const addAppetizer = data => async dispatch => {
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

export const removeAppetizer = data => async dispatch => {
  if (data.imageRef) {
    removeStorage(storage, data.imageRef, data.name);
  }
  removeDb(db, data.name);
};

export const updateAppetizer = data => async dispatch => {
  let imageName;
  if (data.newAppetizer.imageRef) {
    imageName = data.newAppetizer.imageRef;
  } else {
    imageName = genRandomFilename(); // get img name
  }
  if (data.oldName === data.newAppetizer.name) {
    if (data.newImage) {
      // new image, same appetizer name -> update img & appetizer
      let task = addStorage(storage, imageName, data.newAppetizer.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => updateDb(db, data.newAppetizer.name, data.newAppetizer),
        () => getFbUrl(task, imageName, data.newAppetizer, updateDb, db)
      );
    } else {
      // same image, same appetizer name -> update appetizer
      updateDb(db, data.oldName, data.newAppetizer);
    }
  } else {
    removeDb(db, data.oldName, null); // remove old appetizer
    if (data.newImage) {
      // new image, diff appetizer name -> delete appetizer, add img/appetizer, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addStorage(storage, imageName, data.newAppetizer.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => addToDb(db, data.newAppetizer.name, data.newAppetizer),
        () => getFbUrl(task, imageName, data.newAppetizer, addToDb, db)
      );
    } else {
      // same image, diff appetizer name -> delete appetizer, add appetizer
      addToDb(db, data.newAppetizer.name, data.newAppetizer);
    }
  }
};

export const fetchAppetizers = () => async dispatch => {
  appetizers.on('value', snapshot => {
    dispatch({
      type: FETCH_APPETIZERS,
      payload: snapshot.val()
    });
  });
};
