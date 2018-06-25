import {
  addToDb,
  updateDb,
  removeDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler
} from '../../firebase/firebase';
import db from '../../firebase/firebase';
import generateRandomID from 'uuid/v4';

export const FETCH_DRINKS = 'drinks/FETCH';

const DRINKS = '/drinks';
const STORAGE = '/images';
/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

/**
 * Function to build the paths to restaurant drink
 * menu and their image storage space
 */
const getPath = rid => ({
  dbPath: 'restaurants/' + rid + DRINKS,
  storagePath: rid + STORAGE
});

export const addDrink = (rid, data) => async dispatch => {
  let { dbPath, storagePath } = getPath(rid); // get path names
  if (data.image) {
    // if there's an image to upload
    let imageName = genRandomFilename(); // get img name
    let task = addStorage(storagePath, imageName, data.image); // upload to firebase storagePath
    fbTaskHandler(
      task,
      () => addToDb(dbPath, data.name, data),
      () => getFbUrl(task, imageName, data, addToDb, dbPath)
    );
  } else {
    addToDb(dbPath, data.name, data);
  }
};

export const removeDrink = (rid, data) => async dispatch => {
  let { dbPath, storagePath } = getPath(rid); // get path names
  if (data.imageRef) {
    removeStorage(storagePath, data.imageRef, data.name);
  }
  removeDb(dbPath, data.name);
};

export const updateDrink = data => async dispatch => {
  let { dbPath, storagePath } = getPath(data.rid); // get path names
  let imageName;
  if (data.newDrink.imageRef) {
    imageName = data.newDrink.imageRef;
  } else {
    imageName = genRandomFilename(); // get img name
  }
  if (data.oldName === data.newDrink.name) {
    if (data.newImage) {
      // new image, same drink name -> update img & drink
      let task = addStorage(storagePath, imageName, data.newDrink.image); // upload to firebase storagePath
      fbTaskHandler(
        task,
        () => updateDb(dbPath, data.newDrink.name, data.newDrink),
        () => getFbUrl(task, imageName, data.newDrink, updateDb, dbPath)
      );
    } else {
      // same image, same drink name -> update drink
      updateDb(dbPath, data.oldName, data.newDrink);
    }
  } else {
    removeDb(dbPath, data.oldName, null); // remove old drink
    if (data.newImage) {
      // new image, diff drink name -> delete drink, add img/drink, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addStorage(storagePath, imageName, data.newDrink.image); // upload to firebase storagePath
      fbTaskHandler(
        task,
        () => addToDb(dbPath, data.newDrink.name, data.newDrink),
        () => getFbUrl(task, imageName, data.newDrink, addToDb, dbPath)
      );
    } else {
      // same image, diff drink name -> delete drink, add drink
      addToDb(dbPath, data.newDrink.name, data.newDrink);
    }
  }
};

export const fetchDrinks = rid => async dispatch => {
  console.log('fetching rid - ', rid);
  db.ref('restaurants/' + rid + '/' + DRINKS).on('value', snapshot => {
    console.log('fetch - ', snapshot.val());
    dispatch({
      type: FETCH_DRINKS,
      payload: snapshot.val()
    });
  });
};
