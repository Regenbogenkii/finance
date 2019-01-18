import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  accountColName = "accounts"
  stockColName = "Stock"
  todolistName = "todolists"
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
    await this.db.collection(this.accountColName)
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


  onAddAcDb(data) {
    console.log('added')
    return this.db.collection(this.accountColName)
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
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
    await this.db.collection(this.stockColName)
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
    await this.db.collection(this.todolistName)
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
}
