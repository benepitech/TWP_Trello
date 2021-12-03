import http from "../http-common";

class AxiosDataService {
    getAllCategories() {
    return http.get(`/categories/`);
    }
    getAllPosts(){
    return http.get(`/posts`);
    }
    getAllComments(){
      return http.get(`/comments`);   
    }

    getCategoriesById(id) {
      return http.get(`/categories/${id}`);
    }
    getPostsById(id) {
      return http.get(`/posts/${id}`);
    }
    getCommentsById(id) {
      return http.get(`/comments/${id}`);
    }

    createCategories(data) {
    return http.post("/categories", data);
    }
    createPosts(data) {
    return http.post("/posts", data);
    }
    createComments(data) {
    return http.post("/comments", data);
    }

    updateCategories(id, data) {
      return http.put(`/categories/${id}`, data);
    }
    updatePosts(id, data) {
      return http.put(`/posts/${id}`, data);
    }

    deleteCategories(id) {
      return http.delete(`/categories/${id}?force=true`);
    }
    deletePosts(id) {
      return http.delete(`/posts/${id}?force=true`);
    }
    deleteComments(id) {
      return http.delete(`/comments/${id}?force=true`);
    }

    deleteAllPosts() {
      return http.delete(`/posts/`);
    }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new AxiosDataService();