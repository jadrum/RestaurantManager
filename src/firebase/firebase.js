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
const appetizers = db.ref('appetizers');
const desserts = db.ref('desserts');
const storage = firebase.storage();
const images = storage.ref('images');
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

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
const addToDb = (path, name, data) => {
  db
    .ref(path)
    .child(name)
    .set(data); // still upload the drink
};

const updateDb = (path, name, data) => {
  db.ref(path + '/' + name).update(data);
};

const removeDb = (path, name, cb) => {
  db
    .ref(path)
    .child(name)
    .remove()
    .then(cb)
    .catch(e => {
      console.log('Error removing drink: ', name, ' error status: ', e);
    });
};

const getDb = (path, name) => {
  return db
    .ref(path)
    .child(name)
    .once('value');
};

const addStorage = (path, name, image) => {
  return storage
    .ref(path)
    .child(name)
    .put(image);
};

const removeStorage = (path, image, drink) => {
  storage
    .ref(path)
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

const getFbUrl = (task, name, data, cb, path) => {
  task.snapshot.ref // try to download the image url
    .getDownloadURL()
    .then(url => {
      // successfully retrieve url
      data.imageUrl = url;
      data.imageRef = name;
      cb(path, data.name, data); // upload the drink
    })
    .catch(e => {
      console.log("couldn't find drink url");
      cb(path, data.name, data); // still upload the drink
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
  appetizers,
  desserts,
  storage,
  images,
  addToDb,
  updateDb,
  removeDb,
  getDb,
  addStorage,
  removeStorage,
  getFbUrl,
  fbTaskHandler,
  googleAuthProvider,
  db as default
};
