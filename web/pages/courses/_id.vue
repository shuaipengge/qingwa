<template>
  <div class="pa-3">
    <h3>{{ course.name }}</h3>
    <v-row>
      <v-col md="9">
        <!-- <video width="100%" controls>
          <source :src="episode.file" type="video/mp4" />
          您的浏览器不支持 HTML5 video 标签。
        </video> -->
        <video
          ref="video"
          :src="episode.file"
          controls
          controlslist="nodownload"
          preload="none"
          width="100%"
          height="100%"
        ></video>
      </v-col>
      <v-col md="3">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-subheader>视频选集</v-subheader>
            <v-list-item-group v-model="currentIndex" color="primary">
              <v-list-item v-for="(item, i) in course.episodes" :key="i">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="'P' + (i + 1) + ' ' + item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },

  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  }
}
</script>

<style></style>
