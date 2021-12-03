<template>
  <div>
    
      <div class="card-header m-2 is-rounded">
        <div v-if="cardEdit == false" class="card-header-title">
          {{card.title.rendered}} 
        <div  :class= "dropdownClassesCard">
      <div class="dropdown-trigger">
        <button  @click="toggleDropdownCard " class=" navbar-button is-small"  aria-haspopup="true" aria-controls="dropdown-menu2">
                V
        </button>

      </div>
        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
          <div class="dropdown-content">
            <button class="button">
              <router-link :to="'/Modal/' + card.id" class="dropdown-item">
                Read
              </router-link>
            </button>
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
        <form v-else >
          <p>change name of card</p>
          <input class= "input" v-model="card_title" placeholder="Your title...">
          <input class="input" v-model="content" placeholder="Your description...">
          <button class="button is-success" v-on:click="postCard">OK</button>
        </form>
      </div>

    </div>
</template>

<script>

      import AxiosDataService from "@/services/AxiosDataService";
      
export default {
    name: "Cards",
    data() {
      return {
      isActiveCard: false,
      cardEdit: false,
      card_title: null,
      content: null ,
      
      }
    },
    props: ["card",
            "listId"],
    computed: {
      dropdownClassesCard: function() {
        if (this.isActiveCard) {
          return "dropdown is-active";
        } else {
          return "dropdown";
        }
      }    
    },
    methods: {      
      editCard() {
        this.cardEdit = !this.cardEdit;
        this.isActiveCard = !this.isActiveCard;
      },
      toggleDropdownCard: function() {
        this.isActiveCard = !this.isActiveCard;
      },
      postCard() {
          var data = {
            title: this.card_title,
            excerpt: this.content,
            content: this.content,
          };
        AxiosDataService.updatePosts(this.card.id, data)
        .then(response => {
          console.table(response.data);
          this.cardEdit = false;
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
      },
      deleteCard() {       
      AxiosDataService.deletePosts(this.card.id)
        .then(response => {
          console.log(response);
          this.isActiveCard = !this.isActiveCard;
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
      }, 
    }
}
</script>

<style scoped>

.card-header-title{
  justify-content: space-between;
  word-break: break-all;
  background-color: white;
  border-radius: 5%;
}
</style>



