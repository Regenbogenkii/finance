import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  accountColName = "accounts"
  stockColName = "Stock"
  todolistName = "todolists"
  userProfileName = "users"
  // Initialize Cloud Firestore through Firebase
  db = firebase.firestore();

  constructor() {
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }


  // CRUD method for account feature
  async onGetAcDb() {
    let data = []
    await this.db.collection(this.accountColName).where("createBy", "==", this.onGetUid())
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let temp = doc.data()
          temp.id = doc.id
          data.push(temp)

        });
        //console.log('data data::', data)
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data
  }

  async onGetAcDbById(id) {
    let data = null
    await this.db.collection(this.accountColName).doc(id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          data = doc.data()
          //console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    return data
  }

  onAddAcDb(data) {
    console.log('added')
    return new Promise<any>((resolve, reject) => {
      this.db.collection(this.accountColName)
        .add(data)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          resolve(docRef)
        })
        .catch(function (error) {
          resolve(error)
          console.error("Error adding document: ", error);
        });

    })
  }

  onUpdateAcDb(data, id) {
    let dataRef = this.db.collection(this.accountColName).doc(id);
    return dataRef
      .update(data)
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  onDeleteAcDb(idDoc) {
    return this.db.collection(this.accountColName).doc(idDoc)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  // CRUD method for stock feature
  async onGetStDb() {
    let data = []
    await this.db.collection(this.stockColName).where("createBy", "==", this.onGetUid())
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let temp = doc.data()
          temp.id = doc.id
          data.push(temp)

        });
        //console.log('data data::', data)
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data
  }

  async onGetStDbById(id) {
    let data = null
    await this.db.collection(this.stockColName).doc(id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          data = doc.data()
          //console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    return data
  }


  onAddStDb(data) {
    console.log('added')
    return this.db.collection(this.stockColName)
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  onUpdateStDb(data, id) {
    let dataRef = this.db.collection(this.stockColName).doc(id);
    return dataRef
      .update(data)
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  onDeleteStDb(idDoc) {
    return this.db.collection(this.stockColName).doc(idDoc)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  // CRUD method for todoList feature
  async onGetTdlDb() {
    let data = []
    await this.db.collection(this.todolistName).where("createBy", "==", this.onGetUid())
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let temp = doc.data()
          temp.id = doc.id
          data.push(temp)

        });
        //console.log('data data::', data)
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data
  }


  onAddTdlDb(data) {
    console.log('added')
    return this.db.collection(this.todolistName)
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  onUpdateTdlDb(data, id) {
    let dataRef = this.db.collection(this.todolistName).doc(id);
    return dataRef
      .update(data)
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  onDeleteTdlDb(idDoc) {
    return this.db.collection(this.todolistName).doc(idDoc)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }


  onSetUid(uid) {
    localStorage.setItem("uid", uid);
  }

  onGetUid() {
    return localStorage.getItem("uid");
  }

  onRemoveUid() {
    localStorage.removeItem("uid");
    console.log("remove uid");

  }

  onSignUp(data) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  onSignIn(data) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  onSignOut() {
    let self = this
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut().then(res => {
        console.log("Sign-out successful.");
        self.onRemoveUid()
        resolve(res)
      }, err => {
        resolve(err)
      })
    })
  }


  onCheckAuthState() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          resolve(true)
        } else {
          resolve(false)
        }
      })

    })
  }

  //create profile after sign up succcessfully
  onCreateUserProfile(data) {
    return this.db.collection(this.userProfileName)
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  async onGetUserProfile() {
    let data = []
    await this.db.collection(this.userProfileName)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let temp = doc.data()
          temp.id = doc.id
          data.push(temp)

        });
        //console.log('data data::', data)
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data
  }

  async onGetUserProfileByUid(uid) {
    let data
    await this.db.collection(this.userProfileName).where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data = doc.data()
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return data
  }

}
