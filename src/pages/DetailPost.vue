<template>
  <div class="detail">
    <img class="detail__images" src="../assets/images/image-detail.png" />
    <div class="detail__info">
      <div class="detail__info_desc">
        <span class="detail__info_desc-date">{{ prop.date }}</span>
        <p class="detail__info_desc-title">{{ prop.name }}</p>
        <p class="detail__info_desc-content">{{ prop.detail_text }}</p>
        <div class="detail__info_desc-heart" @click="addLike(prop.id)">
          <img class="detail__info_desc-heart--true"
               src="../assets/images/heart-red.svg"
               v-if="liked.indexOf(prop.id) != -1"
          />
          <img class="detail__info_desc-heart--false"
               src="../assets/images/heart.svg"
               v-else
          />
        </div>
      </div>
      <div class="detail__button">
        <p class="detail__button-manuf">#компания</p>
        <p class="detail__button-home">#общежитие</p>
      </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      prop: [],
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
    const id = this.$route.params.id
    try {
      let res = await axios.get(`http://localhost:3000/posts/` + id)
      this.prop = res.data;
    } catch(e) {
      console.error(e)
    }
  },
}


</script>

<style scoped>

</style>