// import admin from "../utils/firebaseAdmin.js";

export const firebaseControl = async (req, res) => {
    const { token } = req.body; 
    // try {
    //   // Verify the Firebase token
    //   const decodedToken = await admin.auth().verifyIdToken(token);
    //   const uid = decodedToken.uid;
    //   const email = decodedToken.email;   
    //   // Handle user session or DB storage here
    //   res.status(200).send({ uid, email });
    // } catch (error) {
    //   console.error('Error verifying Firebase token:', error);
    //   res.status(401).send('Unauthorized');
    // }
  };