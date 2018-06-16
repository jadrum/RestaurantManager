import {
  drinks,
  addToDb,
  updateDb,
  removeDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler
} from '../firebase/firebase';
import generateRandomID from 'uuid/v4';

export const FETCH_DRINKS = 'drinks/FETCH';

const db = 'drinks';
const storage = 'images';
/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

export const addDrink = data => async dispatch => {
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

export const removeDrink = data => async dispatch => {
  if (data.imageRef) {
    removeStorage(storage, data.imageRef, data.name);
  }
  removeDb(db, data.name);
};

export const updateDrink = data => async dispatch => {
  let imageName;
  if (data.newDrink.imageRef) {
    imageName = data.newDrink.imageRef;
  } else {
    imageName = genRandomFilename(); // get img name
  }
  if (data.oldName === data.newDrink.name) {
    if (data.newImage) {
      // new image, same drink name -> update img & drink
      let task = addStorage(storage, imageName, data.newDrink.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => updateDb(db, data.newDrink.name, data.newDrink),
        () => getFbUrl(task, imageName, data.newDrink, updateDb, db)
      );
    } else {
      // same image, same drink name -> update drink
      updateDb(db, data.oldName, data.newDrink);
    }
  } else {
    removeDb(db, data.oldName, null); // remove old drink
    if (data.newImage) {
      // new image, diff drink name -> delete drink, add img/drink, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addStorage(storage, imageName, data.newDrink.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => addToDb(db, data.newDrink.name, data.newDrink),
        () => getFbUrl(task, imageName, data.newDrink, addToDb, db)
      );
    } else {
      // same image, diff drink name -> delete drink, add drink
      addToDb(db, data.newDrink.name, data.newDrink);
    }
  }
};

export const fetchDrinks = () => async dispatch => {
  drinks.on('value', snapshot => {
    dispatch({
      type: FETCH_DRINKS,
      payload: snapshot.val()
    });
  });
};
