import {
  drinks,
  addDrinkToFb,
  updateDrinkInFb,
  removeDrinkFromFb,
  addImageToFb,
  removeImageFromFb,
  getUrlFromFb,
  fbTaskHandler
} from '../firebase/firebase';
import generateRandomID from 'uuid/v4';

export const FETCH_DRINKS = 'drinks/FETCH';

/* Gen random id for images */
const genRandomFilename = (): string => generateRandomID();

export const addDrink = data => async dispatch => {
  if (data.image) {
    // if there's an image to upload
    let imageName = genRandomFilename(); // get img name
    let task = addImageToFb(imageName, data.image); // upload to firebase storage
    fbTaskHandler(
      task,
      () => addDrinkToFb(data.name, data),
      () => getUrlFromFb(task, imageName, data, addDrinkToFb)
    );
  } else {
    addDrinkToFb(data.name, data);
  }
};

export const removeDrink = data => async dispatch => {
  if (data.imageRef) {
    removeImageFromFb(data.imageRef, data.name);
  }
  removeDrinkFromFb(data.name);
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
      let task = addImageToFb(imageName, data.newDrink.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => updateDrinkInFb(data.newDrink.name, data.newDrink),
        () => getUrlFromFb(task, imageName, data.newDrink, updateDrinkInFb)
      );
    } else {
      // same image, same drink name -> update drink
      updateDrinkInFb(data.oldName, data.newDrink);
    }
  } else {
    removeDrinkFromFb(data.oldName, null); // remove old drink
    if (data.newImage) {
      // new image, diff drink name -> delete drink, add img/drink, async
      // doesn't matter so we just add after deleting old cuz of new name
      let task = addImageToFb(imageName, data.newDrink.image); // upload to firebase storage
      fbTaskHandler(
        task,
        () => addDrinkToFb(data.newDrink.name, data.newDrink),
        () => getUrlFromFb(task, imageName, data.newDrink, addDrinkToFb)
      );
    } else {
      // same image, diff drink name -> delete drink, add drink
      addDrinkToFb(data.newDrink.name, data.newDrink);
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
