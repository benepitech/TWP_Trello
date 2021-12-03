
<template >
<div class= "outer-wrapper">
  <div class = "wrapper">
    <div v-if="showModalFlag == false">
    <button @click="showModal" class="card m-2">Add List</button>
    </div>
    <div v-else>
      <form >
      <input type="text" v-model="name" placeholder="Name your list..." class="input is-large m-2 p-2">
      <button class="button is-success" @click="saveList">Ok</button>
      <button class="button" @click="cancelModal">Cancel</button>
      </form>
    </div>
    <div class= "is-flex">
     
      <div v-for="list in lists" :key="list.id">
              <Lists  :list_components="list" :id="list.id"/>            
      </div>
      
    </div>      
    
    
  </div>
</div>   
</template>

<script>

        import AxiosDataService from "@/services/AxiosDataService";
        import Lists from "@/components/Lists";

export default {
    name: "Home",

    data() {
    return {
        name: null,
        description: 'this is a list',
        slug: this.name,
        parent: 0,
        lists: [],
        search:'',
        showModalFlag: false,
        okPressed: false,
    }
    },

    components : {
        Lists,
    },

    methods: {
        showModal() {
        this.okPressed = false;
        this.showModalFlag = true;
      },
      cancelModal() {
        this.okPressed = false;
        this.showModalFlag = false;
      },
      retrieveCategories() {
        AxiosDataService.getAllCategories()
          .then(response => {
            this.lists = [...response.data];
        //    console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      saveList() {
          var data = {
            name: this.name,
            description: this.description,
            slug: this.slug,
            parent:this.parent,
            
          };
          AxiosDataService.createCategories(data)
            .then(response => {
              console.log(response);
              this.lists.push(response.data);            
              this.showModalFlag = false;
            })
            .catch(e => {
              console.log(e);
            });
        },
    
    },
    mounted() {
        this.retrieveCategories();
    }
}
</script>

<style scoped>

.card{
  width: 250px;
  height: 60px;
}
.outer-wrapper{
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg) translateX(-100vh);
  transform-origin: top left;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
    scrollbar-width: none;
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  display:none;
}
.wrapper{
    display: flex;
  flex-direction: row;
  width: 400vw;
    transform: rotate(90deg) translateY(-100vh);
  transform-origin: top left;
}
</style>