<template>
  
   
  <div class="card-header m-2 is-rounded">
    <div class="card-header-title">
      {{comments_of_card?.content.rendered}}
      <div  :class= "dropdownClassesCard">
        <div class="dropdown-trigger">
          <button  @click="toggleDropdownCard " class=" navbar-button is-small"  aria-haspopup="true" aria-controls="dropdown-menu2">
                  V
          </button>

        </div>
        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
          <div class="dropdown-content">
            <a v-on:click="editCard" class="dropdown-item">
              Edit
            </a>
            <a v-on:click="deleteCard" class="dropdown-item">
              Delete
            </a>
          </div>
        </div>
      </div>             
    </div>
  </div>
</template>
    


<script>

  export default {
    name: 'Comments',
    data() {
      return {
        isActiveCard: false,
      }
    },
    props: {
      comments_of_card:null,
    },  
    };


</script>
<style scoped>
.card-header-title{
  justify-content: space-between;
  word-break: break-all;
  background-color: white;
  border-radius: 5%;
}
</style>

