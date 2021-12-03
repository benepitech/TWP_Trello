<template>
  <div class="container">
    <div class="card  m-2">
      <header  class="card-header">
          
        <div v-if="listEdit == false" class="card-header-title">{{list_components.name}}
          <div :class= "dropdownClasses">
            <div class="dropdown-trigger">
              <button class=" navbar-button is-small" @click="toggleDropdown" aria-haspopup="true" aria-controls="dropdown-menu2">
                V
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
              <div class="dropdown-content">
                <a href="#" v-on:click="editList" class="dropdown-item">
                  Edit
                </a>
                <a v-on:click="deleteList" class="dropdown-item">
                  Delete
                </a>
                <a v-on:click="deleteAllCards" class="dropdown-item">
                  Delete all cards
                </a>
              </div>
            </div>
          </div>
        </div>
          <form v-else >

            <input class= "input" v-model="list_name" placeholder="Change name...">
      <button class="button is-success" @click="postList">Ok</button>
      <button class="button" @click="editList">Cancel</button>
          </form>

          
      </header>

      <div v-if="cards.length >= 0" class="card-content">
        <div>
          <draggable 
            v-model="cards" 
            group="people" 
            @start="drag=true" 
            item-key="card.id"
            @end="onMoveCallback"
          >
            <template #item="{element}" >
              <div v-if="element.categories == list_components.id">
                
                  <Cards  :card="element" :listId="list_components.id" />
              </div>
                            
            </template>
            
          </draggable>
        </div>
      
      
  

        <footer class="card-footer">
          <div v-if="showModalFlag == false">
          <button  @click="showModal" class="card-footer-item m-2">+ Add New Card</button>
          </div>
          <div v-else>
            <form >
            <input type="text" v-model="title" placeholder="Give it a title..." class="input  m-2 p-2">
            <input type="text" v-model="content" placeholder="...and a description" class="input  m-2 p-2">
            <button class="button is-success" @click="saveCard">Ok</button>
            <button class="button" @click="cancelModal">Cancel</button>
            </form>
          </div>
        </footer>
        
        </div>
    </div>
  </div>
</template>


<script>
    import AxiosDataService from "@/services/AxiosDataService";
    import draggable from 'vuedraggable';
    import Cards from "@/components/Cards";
export default {
    name: "Lists",
    data() {
        return {
            
            cards: [],
            search:'',
            showModalFlag: false,
            okPressed: false,
            drag: false,
            isActive: false,
            title: null,
            content: [],
            listEdit: false,           
            list_name: null
            
            
            
            
        }
    },
    computed: {
      dropdownClasses: function() {
        if (this.isActive) {
          return "dropdown is-active";
        } else {
          return "dropdown";
        }
      }
    },
    props: {
      list_components:null,        
    },
    components:{ 
      Cards,
      draggable
    },
    methods: {
      cancelEdit(){
        this.listEdit = !this.listEdit;
        this.isActive = !this.isActive;
      },
      editList() {
        this.listEdit = !this.listEdit;
        this.isActive = !this.isActive;
      },
      toggleDropdown: function() {
      this.isActive = !this.isActive;
      },      
      showModal() {
        this.okPressed = false;
        this.showModalFlag = true;
      },
      cancelModal() {
        this.okPressed = false;
        this.showModalFlag = false;
      },
      retrievePosts() {
        AxiosDataService.getAllPosts()
          .then(response => {
            this.cards = [...response.data];
            console.log(this.cards);  
          })
          .catch(e => {
            console.log(e);
          });
      },
      onMoveCallback(evt){
        
        const itemMove = this.cards[evt.oldIndex];
        console.log(itemMove)
        //const categoriesId = this.cards.filter(l=>l.categories != itemMove.categories)[0].categories[0];
        //console.log(categoriesId)
        this.drag=false;
  //         console.log(e);
        
      },
      deleteList() {       
      AxiosDataService.deleteCategories(this.list_components.id)
        .then(response => {
          console.log(response);
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
      },
      postList() {
        var data = {
          name : this.list_name
        };
        AxiosDataService.updateCategories(this.list_components.id, data)
        .then(response => {
          console.table(response.data);
          this.listEdit = !this.listEdit;
          location.reload();
          
        })
        .catch(e => {
          console.log(e);
        });
      }, 
      saveCard() {
          var data = {
            title: this.title,
            status: "publish",
            slug: this.title,
            categories : this.list_components.id,
            comment_status: "open",
            content: this.content,
            excerpt: this.content,
          };
          AxiosDataService.createPosts(data)
            .then(response => {
              console.log(response);
             this.cards.push(response.data);
            
              this.showModalFlag = false;
              location.reload();
            })
            .catch(e => {
              console.log(e);
            });
        },
        deleteAllCards(){
          AxiosDataService.deleteAllPosts()
            .then(response => {
              console.log(response);
              location.reload();
            })
            .catch(e =>{
              console.log(e);
            });
        }
    },
    
    mounted() {
        this.retrievePosts();
    }       
}
</script>

<style scoped>
.card-footer-item{
  background-color: white;
  border-radius: 5%;
}

.card{
  width: 300px;
  background-color: #2582ec;
}
.card-header-title{
  justify-content: space-between;
  word-break: break-all;
}

</style>