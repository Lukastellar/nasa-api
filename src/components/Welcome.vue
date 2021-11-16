<template>
<main class="w-screen h-screen flex justify-center items-center z-50">
    <header>
        <h1 class="text-xl">
            <span class="text-3xl ">Hello,</span> welcome to my projects. 
            <br>Enjoy the <span @click="addPeach()" id="peach" class="text-md font-bold cursor-pointer underline">b(ea)ooty!</span>
        </h1>
        <div class="add-peaches relative">
            <img class="peach-img invisible" src="../assets/peach_1.png" :data-id="1" alt="Upss, should've display a peach!" >
          </div>
    </header>
</main>
</template>
<script>
export default {
    name: 'Welcome',
    data() {
        return {
            id: 1,
            left: 0,
            bottom: 0,
        }
    },
    methods: {
        addPeach(){
            
            // Random position in window
            let left = Math.floor( Math.random() * window.innerWidth ) / 2.3
            let bottom = Math.floor( Math.random() * window.innerHeight ) / 2.2

            // Positive and Negative generator
            if ( Math.sign(this.left) === 1 && Math.sign(left) === 1 ){ left *= -1}
            else if ( Math.sign(this.left) === -1 && Math.sign(left) === -1 ) { left *= -1 } 

            if ( Math.sign(this.bottom) === 1 && Math.sign(bottom) === 1 ){ bottom *= -1} 
            else if ( Math.sign(this.bottom) === -1 && Math.sign(bottom) === -1 ) { bottom *= -1 } 

            // Refreshing values
            this.left = left
            this.bottom = bottom

            // Displaying img
            let newId = ++this.id
            let clone = $(".peach-img:first-child").clone(true)

            clone.css({"margin-left": left, "margin-bottom": bottom})
            .removeClass('invisible')
            .addClass('show')
            .attr('data-id', newId).appendTo( $('.add-peaches') )
            .fadeOut(2000, function() {
                $(this).remove()
            })
        }
    }
}
</script>
<style scoped>
*{
    user-select: none;
}
img.peach-img{
    position: absolute;
    height: 100px;
    left: 0;
    bottom: 0;
}
.show {
  animation: MoveUpDown 3s linear forwards;
}

@keyframes MoveUpDown {
  0% {
    bottom: 0;
  }
  15% {
    left: 20px;
  }
  40% {
    left: -20px;
  }
  100% {
    bottom: 1000px;
  }
}

</style>