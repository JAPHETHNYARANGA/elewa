<template>
<section style="background-color: #eee;">
  <div class="container py-5">
  

    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3">{{ $store.state.user.name }}</h5>
            <p class="text-muted mb-1">{{ $store.state.user.email }}</p>
            <p class="text-muted mb-4">{{ $store.state.user.address.street }}</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-primary">Update</button>
              <button type="button" class="btn btn-outline-danger ms-1">DeleteAccount</button>
            </div>
          </div>
        </div>
       
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">J{{ $store.state.user.name }}</p>
              </div>
            </div>
            <hr>

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">User Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.username }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.email }}</p>
              </div>
            </div>
            <hr>
            <h5>Address</h5>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Street</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.address.street }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Suite</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.suite }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">City</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.address.suite }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">ZipCode</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.address.zipcode }}</p>
              </div>
            </div>
            <hr>
            <h5>Geo</h5>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Latitude</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.address.geo.lat }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Longitude</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ $store.state.user.address.geo.lng }}</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>

section{
    margin-top: 2%;
}
.gradient-custom {
    /* fallback for old browsers */
    background: #f6d365;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))
}
</style>

<script>

</script>