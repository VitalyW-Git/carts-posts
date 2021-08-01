<template>
  <ul class="carts">
    <li class="cart_element"
        v-for="post of posts"
        :key="post.id"
    >

      <div class="cart_element-visual">
        <img class="cart_element-visual__image" src="../assets/images/image.png" />
        <router-link
            class="cart_element-visual__link"
            :to="{ name: 'detailPost', params: {id: post.id}}"
        >#компания
        </router-link>
      </div>

      <span class="cart_element-title">{{ post.name }}</span>
      <span class="cart_element-content">{{ post.description }}</span>
      <div class="cart_element-info">
        <span class="cart_element-info__date">
          {{ post.date }}
        </span>
        <div @click="addLike(post.id)">
          <img class="cart_element-info__img-true"
               src="../assets/images/heart-red.svg"
               v-if="liked.indexOf(post.id) != -1"
          />
          <img class="cart_element-info__img-false"
               src="../assets/images/heart.svg"
               v-else
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      liked: [],
    }
  },
  mounted() {
    if (localStorage.getItem('storageLike')) {
      try {
        this.liked = JSON.parse(localStorage.getItem('storageLike'));
      } catch(e) {
        localStorage.removeItem('storageLike');
      }
    }
  },
  methods: {
    addLike(like) {
      let index = this.liked.indexOf(like);
      if (index === -1) {
        this.liked.push(like);
      } else {
        this.liked.splice(index, 1);
      }
      let parsed = JSON.stringify(this.liked);
      localStorage.setItem('storageLike', parsed);
    }
  },

  async created() {
    try {
      let res = await axios.get(`http://localhost:3000/posts`)
      this.posts = res.data;
    } catch(e) {
      console.error(e)
    }
  },
}
</script>

<style scoped lang="scss">

</style>
