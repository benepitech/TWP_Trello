<template>
  
  <div class="card">
    <header class="card-header">
      <p  class="card-header-title">
        {{card?.title.rendered}}
      </p>
    </header>
      <p class="card-header-title">
        Description
      </p>
    <div class="card-content">
        {{card?.content.rendered}} 
    </div>
    <hr class="card-header">
    <header class="card-header">
      <div class= "is-inline-flex is-justify-content-space-between">  
        <p class="card-header-title">
          Comments:
        </p>
        <input class="input m-2" v-model="content" type="text">
        <button class="button is-success m-2" v-on:click="saveComment">OK</button>
      </div>
    </header>
      <div class="card-content"  v-for="commentaire in comment" :key="commentaire.id">
      <!--  <div v-if="comment.post == card.id">  -->
              <Comments  :comments_of_card="commentaire" :id="commentaire.id"/>            
        </div>         
      </div>
   <!-- </div> -->
          
</template>
 
 <script>

    import AxiosDataService from "@/services/AxiosDataService";
    import Comments from "@/components/Comments"; 
  export default {
      name: "Modal",
      data() {
        return { 
        card: null,
        content: null,
        comment:[],
        }
      },
      components:{
        Comments,
      },
      props: {
        card_id: {
          type: String,
          required: true,
        },
        comments: null,
      },
      methods: {
        getTheCard() {
        AxiosDataService.getPostsById(this.card_id)
          .then(response => {
            
          this.card = response.data;
          console.log(this.card);
          })
          .catch(e => {
            console.log(e);
          });
        },
        saveComment() {
          var data = {
            content: this.content,
            status: "publish",
            post: this.card.id,
          };
          AxiosDataService.createComments(data)
            .then(response => {
              console.log(response);
             this.comment.push(response.data);
            

              location.reload();
            })
            .catch(e => {
              console.log(e);
            });
        },
        retrieveComments() {
          AxiosDataService.getAllComments()
            .then(response => {
              this.comment = [...response.data];

            })
            .catch(e => {
              console.log(e);
            });
        },
      },
          mounted() {
        this.getTheCard();
        this.retrieveComments();
        
        console.log(this.card);

      }   
  };  
</script>


 
 
 