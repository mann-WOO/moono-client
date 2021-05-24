<template>
  <div class="container mt-5">
    <div class="row gx-5 pt-5">
      <img class="col-5" :src="movieDetail.poster_path" :alt="movieDetail.title">
      <div class="col-7">
        <div class="d-flex flex-column justify-content-center">
          <!-- 제목/장르 -->
          <h3 class="text-start fw-bold mt-5">{{ movieDetail.title }}</h3>
          <p class="text-start text-secondary mt-3">{{ movieDetail.release_date }} &bull; {{ genres }}</p>
          <div class='d-flex flex-column align-items-start mb-3'>
            <p class="fs-6 mb-0">평가하기</p>
            <div>
              <img @click="setRating" @mousemove="moveMouse" @mouseover="onMouse" @mouseout="outMouse" id="1" class="star" src="@/assets/images/blank-star.svg">
              <img @click="setRating" @mousemove="moveMouse" @mouseover="onMouse" @mouseout="outMouse" id="2" class="star" src="@/assets/images/blank-star.svg">
              <img @click="setRating" @mousemove="moveMouse" @mouseover="onMouse" @mouseout="outMouse" id="3" class="star" src="@/assets/images/blank-star.svg">
              <img @click="setRating" @mousemove="moveMouse" @mouseover="onMouse" @mouseout="outMouse" id="4" class="star" src="@/assets/images/blank-star.svg">
              <img @click="setRating" @mousemove="moveMouse" @mouseover="onMouse" @mouseout="outMouse" id="5" class="star" src="@/assets/images/blank-star.svg">
            </div>
          </div>
          <div class="overview-box">
            <p class="text-start">{{movieDetail.overview}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MovieDetail',
    created: function () {
      this.$store.dispatch('getMovieDetail', this.$route.params.id)
      this.$store.dispatch('getUserMovieRank', this.$route.params.id)
    },
    updated: function () {
      this.setStars()
    },
    computed: {
      movieDetail: function () {
        return this.$store.state.movieDetail
      },
      genres: function () {
        return this.movieDetail.genres.map((genre) => {
          return genre.name
        }).join('/')
      },
      userMovieRank: function () {
        return this.$store.state.userMovieRank
      }
    },
    methods: {
      // 별 색칠 초기화
      initStars: function () {
        for (let i=1; i<=5; i++) {
          let star = document.getElementById(`${i}`)
          star.className = 'star'
        }
      },
      // 별을 사용자가 부여한 랭크에 따라 부여
      setStars: function () {
        if (this.userMovieRank) {
          const fulls = parseInt(this.userMovieRank / 2)
          const half = this.userMovieRank % 2
          for(let i=1; i<=fulls; i++) {
            let star = document.getElementById(`${i}`)
            star.classList.add('full-selected')
          }
          if (half) {
            let star = document.getElementById(`${fulls+1}`)
            star.classList.add('half-selected')
          }
        }
      },
      // 별에 마우스 올릴 때 동작
      onMouse: function (event) {
        this.initStars()
        // 1점 이상 별이라면 이전에 존재하는 별 채워주기
        if (event.target.id > 1) {
          for (let i=1; i<event.target.id; i++) {
            let star = document.getElementById(`${i}`)
            star.classList.add('full-selected')
          }
        }
      },
      // 별에서 마우스 뗄 때 동작
      outMouse: function () {
        this.initStars()
        this.setStars()
      },
      // 별 위에서 마우스 움직일 때 동작
      moveMouse: function (event) {
        // 마우스 올린 star의 중앙 x좌표 (viewport 상에서) 구하기 
        const starCenter = (event.target.getBoundingClientRect().x + event.target.getBoundingClientRect().right) / 2
        // 별 중앙을 기준으로 왼쪽이라면 반만 채우기, 오른쪽이라면 다 채우기
        if (event.clientX < starCenter) {
          event.target.setAttribute("class", "star half-selected")
        } else {
          event.target.setAttribute("class", "star full-selected")
        }
      },
      // 별점 부여
      setRating: function (event) {
        const starCenter = (event.target.getBoundingClientRect().x + event.target.getBoundingClientRect().right) / 2
        if (event.clientX < starCenter) {
          const score = event.target.id*2-1
          const ratingData = {
            movieId: this.$route.params.id,
            score,
          }
          this.$store.dispatch('setRating', ratingData)
        } else {
          const score = event.target.id*2
          const ratingData = {
            movieId: this.$route.params.id,
            score,
          }
          this.$store.dispatch('setRating', ratingData)
        }
      }
    }
}
</script>

<style>
import half-star from 

.overview-box {
  width:50%;
}
.star {
  width: 30px;
  margin-right: 0.5rem;
}
.full-selected {
  background: url('../assets/images/full-star.svg');
  background-size: 100%
}
.half-selected {
  background: url('../assets/images/half-star.svg');
  background-size: 100%;
}
</style>