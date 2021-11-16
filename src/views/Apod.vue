<template>
 <main id="APOD" data-theme="" class="w-screen h-screen px-10 flex flex-row min-h-screen justify-center items-center gap-x-10 text-center">
  <!-- Box 1 -->
    <div class="flex flex-col flex-1 h-full">
      <div class="flex items-end pb-10 h-1/4">
        <div class="w-full">
          <div class="flex flex-col items-center px-10">
            <p v-if="status === 404 || status === 400" class="mb-4"> {{err_msg}} </p>
            <p class="mb-2">- Unesite datum - </p>
            <input id="calendar" class="w-9/12 text-center wrap content-center" v-model="date" @change="changeDate()" type="date" 
            min="1995-6-16" :max="todayDate()">
            <!-- Postoji i opcija na dugme ::: <button class="btn mt-3 mx-10" @click="fetchData(date)"> Submit date </button> -->
          </div>
        </div>
      </div>
      <hr>
      <div id="textarea" class="h-4/6 mt-6">
        <h2 v-if="date != null" class="text-right bg-transparent font-semibold mr-2"> Date: {{date}} </h2>
        <h1 class="font-semibold underline text-xl mb-6 mt-2"> {{title}} </h1>
        <textarea class="w-full px-6 bg-transparent h-5/6 leading-8 resize-none text-center overflow-x-hidden" :value="explanation" readonly >  </textarea>
      </div>
    </div>
  <!-- Box 2 -->
    <div class="flex items-center justify-center flex-1 ">
      <div v-if="media_type == 'image'" class="image">
        <img @click="imgZoom()" :src="media" id="apod-img" style="max-height: 500px">  
      </div>
      <div v-else-if="media_type == 'video'" class="video">
        <iframe height="400" width="600" :src="media + '?controls=0&autoplay=1&rel=0&modestbranding=1' ">
        </iframe>
      </div>
    </div>
  </main>
  <div class="outer-img">
    <div class="inner-img">
      <!-- Here comes clone image -->
    </div>
  </div>
</template>

<script>
// TODO: Title = 'Astronomy Picture Of the Day" & Footer 'API by NASA'
// TODO: Kada se menja view, neka ostane ista boja teme 

export default {
 name: 'Apod',
  components: {
    
  },
  data() {
    return {
      title: '',
      date: '',
      explanation: '',
      hdurl: '',
      media_type: '',
      media: '',
      status: 200,
      err_msg: 'Slika od danas trenutno nije dostupna. Probajte kasnije!'
    }
  },
   methods: {    
    changeDate() {
      this.fetchData(this.date)
    },
    imgZoom(){
      $('.inner-img').empty()
      $('#apod-img').clone(true).appendTo('.inner-img');
      $('.outer-img').toggleClass('show');
      $('.outer-img').on('click', function(){
        $(this).removeClass('show')
        }
      )
    },
    async fetchData(dateParam = '') {
      const API_KEY = 'oP2UeVMGk27XhgoWpy3S5Zwvfk30cipQa12eyjxC'
      const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${dateParam}`
      const response = await fetch(url)
      const data = await response.json()

      this.date = data.date
      this.title = data.title
      this.explanation = data.explanation
      this.hdurl = data.hdurl
      this.media_type = data.media_type
      this.media = data.url
      data.code === 400 || data.code === 404 ? this.status = data.code : this.status = 200

      return data
    },
    todayDate(dayNow = new Date().getDate()) {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+("0" + dayNow).slice(-2);
      return date
    }
  },
  async created () {
    await this.fetchData()
  },
}
</script>

<style scoped>
button {
  background: white;
  border: 2px solid #555;
  border-radius: 5px;
  padding: 4px 12px;
}
input {
  position: relative;
  border: 2px solid #555;
  border-radius: 5px;
}
textarea,
input:focus {
  outline: none;
  cursor: default;
}
input[type=date]::-webkit-datetime-edit-month-field,
input[type=date]::-webkit-datetime-edit-day-field,
input[type=date]::-webkit-datetime-edit-year-field {
  background: none;
  color: black;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  width: 100%;
  padding: 0;
  margin-left: 10px;
}
#apod-img {
  cursor: pointer;
}
.outer-img{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height:100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  /* Hidden by default */
  visibility: hidden;
  opacity: 0;
  transition: all ease-in-out 400ms;
}
.outer-img.show{
  visibility: visible;
  opacity: 1;
}
.inner-img{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.inner-img img{
  margin: auto;
  transform: scale(1.3);
  height: auto;
  max-width: 80%;
}
</style>