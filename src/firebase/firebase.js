import * as firebase from 'firebase';

const FirebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID
};

firebase.initializeApp(FirebaseConfig);

const db = firebase.database();
const drinks = db.ref('drinks');
const storage = firebase.storage();
const images = storage.ref('images');

/**
 * FIREBASE EVENT LISTENERS
 */
// child removed
db.ref('drinks').on('child_removed', snapshot => {
  console.log('removed: ', snapshot.key, snapshot.val());
});

// child changed
db.ref('drinks').on('child_changed', snapshot => {
  console.log('updated: ', snapshot.key, snapshot.val());
});

// child added
db.ref('drinks').on('child_added', snapshot => {
  console.log('added: ', snapshot.key, snapshot.val());
});

/**
 * FIREBASE INTERACTION FUNCTIONS FOR DB AND STORAGE
 */
const addDrinkToFb = (name, data) => {
  drinks.child(name).set(data); // still upload the drink
};

const updateDrinkInFb = (name, data) => {
  drinks.child(name).update(data);
};

const removeDrinkFromFb = (name, cb) => {
  drinks
    .child(name)
    .remove()
    .then(cb)
    .catch(e => {
      console.log('Error removing drink: ', name, ' error status: ', e);
    });
};

const addImageToFb = (name, image) => {
  return images.child(name).put(image);
};

const removeImageFromFb = (image, drink) => {
  images
    .child(image)
    .delete()
    .then(() => {})
    .catch(e => {
      console.log(
        'Error removing image for drink: ',
        drink,
        ' error status: ',
        e
      );
    });
};

const getUrlFromFb = (task, name, data, cb) => {
  task.snapshot.ref // try to download the image url
    .getDownloadURL()
    .then(url => {
      // successfully retrieve url
      data.imageUrl = url;
      data.imageRef = name;
      cb(data.name, data); // upload the drink
    })
    .catch(e => {
      console.log("couldn't find drink url");
      cb(data.name, data); // still upload the drink
    });
};

const fbTaskHandler = (task, errorCB, completeCB) => {
  task.on(
    'state_changed',
    function progress(snapshot) {
      // don't care
    },
    function error(e) {
      // if there is an error
      console.log('Task had an error: ', e);
      errorCB();
    },
    function complete() {
      // task successful
      completeCB(); // delegate work
    }
  );
};

export {
  firebase,
  drinks,
  storage,
  images,
  addDrinkToFb,
  updateDrinkInFb,
  removeDrinkFromFb,
  addImageToFb,
  removeImageFromFb,
  getUrlFromFb,
  fbTaskHandler,
  db as default
};
