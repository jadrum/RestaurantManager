import generateRandomID from 'uuid/v4';
import db from '../../firebase/firebase';
import {
  addToDb,
  updateDb,
  removeDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler
} from '../../firebase/firebase';
import { FETCH_ITEMS, FETCH_MENU, FETCH_LABELS } from '../types';

/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

/**
 * Function to build the paths to restaurant item
 * menu and their image storage space
 */
const getPath = (rid, item) => ({
  dbPath: 'restaurants/' + rid + item,
  storagePath: rid + '/images'
});

export const addItem = (rid, item, data) => async dispatch => {
  let { dbPath, storagePath } = getPath(rid, item); // get path names
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

export const removeItem = (rid, item, data) => async dispatch => {
  let { dbPath, storagePath } = getPath(rid, item); // get path names
  if (data.imageRef) {
    removeStorage(storagePath, data.imageRef, data.name);
  }
  removeDb(dbPath, data.name);
};

export const updateItem = data => async dispatch => {
  let { dbPath, storagePath } = getPath(data.rid, data.item); // get path names
  let imageName;
  if (data.newItem.imageRef) {
    imageName = data.newItem.imageRef;
  } else {
    imageName = genRandomFilename(); // get img name
  }
  if (data.oldName === data.newItem.name) {
    if (data.newImage) {
      // new image, same item name -> update img & item
      let task = addStorage(storagePath, imageName, data.newItem.image); // upload to firebase storagePath
      fbTaskHandler(
        task,
        () => updateDb(dbPath, data.newItem.name, data.newItem),
        () => getFbUrl(task, imageName, data.newItem, updateDb, dbPath)
      );
    } else {
      // same image, same item name -> update item
      updateDb(dbPath, data.oldName, data.newItem);
    }
  } else {
    removeDb(dbPath, data.oldName, null); // remove old item
    if (data.newImage) {
      // new image, diff item name -> delete item, add img/item, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addStorage(storagePath, imageName, data.newItem.image); // upload to firebase storagePath
      fbTaskHandler(
        task,
        () => addToDb(dbPath, data.newItem.name, data.newItem),
        () => getFbUrl(task, imageName, data.newItem, addToDb, dbPath)
      );
    } else {
      // same image, diff item name -> delete item, add item
      addToDb(dbPath, data.newItem.name, data.newItem);
    }
  }
};

export const addLabel = (rid, label) => async dispatch => {
  let { dbPath } = getPath(rid, '/menu-labels');
  let labelName = genRandomFilename();
  addToDb(dbPath, labelName, label); // initially store labels as empty strings
};

export const fetchLabels = rid => async dispatch => {
  let { dbPath } = getPath(rid, '/menu-labels');
  db.ref(dbPath).on('value', snapshot => {
    dispatch({
      type: FETCH_LABELS,
      payload: snapshot.val()
    });
  });
};

export const fetchItems = (rid, item) => async dispatch => {
  db.ref('restaurants/' + rid + item).on('value', snapshot => {
    dispatch({
      type: FETCH_ITEMS,
      payload: snapshot.val()
    });
  });
};

export const fetchMenu = rid => async dispatch => {
  db.ref('restaurants/' + rid + '/menu').on('value', snapshot => {
    dispatch({
      type: FETCH_MENU,
      payload: snapshot.val()
    });
  });
};
