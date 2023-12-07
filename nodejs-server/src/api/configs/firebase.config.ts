import * as admin from "firebase-admin";
import serviceAccount from "@resources/serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: `topic-registration-service.appspot.com`
});

// Cloud storage
export const bucket = admin.storage().bucket();
