import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  collectionName = "accounts"

  // Initialize Cloud Firestore through Firebase
  db = firebase.firestore();

  constructor() {
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }


  // CRUD method

  async onGetDb() {
    let data = []
    await this.db.collection(this.collectionName)
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


  onAddDb(data) {
    console.log('added')
    return this.db.collection(this.collectionName)
    .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  onUpdateDb(data, id) {
    var dataRef = this.db.collection(this.collectionName).doc(id);
    return dataRef
    .update(data)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}
