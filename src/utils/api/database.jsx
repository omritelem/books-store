import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import config from '../../Firebase/config';

if (!firebaseApp.apps.length) {
    firebaseApp.initializeApp(config);
}
const db = firebaseApp.firestore();
const firebase = firebaseApp;

export {
    db,
    firebase,
};
