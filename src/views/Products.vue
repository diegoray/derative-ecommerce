<template>
  <div class="products">
      <div class="container h-100 p-5">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <h3>Products Page</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti nisi doloribus praesentium! Dolores, saepe.
                    </p>
                </div>
                <div class="col-md-6">
                    <img src="/img/svg/products-page.svg" class="img-fluid">
                </div>
              </div>
          </div>

          <hr>

          <h3>Basic CRUD in firebase & Vue</h3>

          <div class="product-test">
            <div class="form-group">
              <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
            </div>
            <div class="form-group">
              <input type="number" placeholder="Product Price" v-model="product.price" class="form-control">
            </div>
            <div class="form-group">
              <button @click="saveData" class="btn btn-primary">Save</button>
            </div>
          </div>

          <hr>
          
          <h3>Product List</h3>
          <div class="table-responsive">
            <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td>{{product.data().name}}</td>
                <td>{{product.data().price}}</td>
                <td>
                  <button @click="editProduct(product)" class="btn btn-primary mr-2">Edit</button>
                  <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                </div>
                <div class="form-group">
                  <input type="number" placeholder="Product Price" v-model="product.price" class="form-control">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="updateData()" type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>


  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeItem: null
    }
  },
  methods: {
    saveData() {
      db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.reset();
          this.readData();
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
    readData(){
      db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.products.push(doc);
            // console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    deleteProduct(doc) {
      if(confirm('Are you sure?')) {
        db.collection("products").doc(doc).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      } else {

      }
    },
    editProduct(product) {
      $('#editModal').modal('show');
      this.product = product.data();
      this.activeItem = product.id;
    },
    updateData() {
      db.collection("products").doc(this.activeItem).update(this.product)
      .then(() => {
        $('#editModal').modal('hide');
        this.watcher();
        console.log("Document successfully updated!");
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    },
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
            this.products = [];
            querySnapshot.forEach((doc) => {
                this.products.push(doc);
            });
        });
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
