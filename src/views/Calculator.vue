<template>
    <main class="w-screen h-screen flex justify-center items-center">
        <div>
            <div class="p-3 w-96 bg-gray-700">
                <!-- Result -->
                <div class="w-full rounded m-1 p-3 text-right lead font-weight-bold text-white bg-vue-dark">
                    {{ previousValue + operator + value }}
                </div>

                <!-- Buttons -->
                <div class="grid grid-cols-4">
                    <div class="" v-for="n in calculatorElements" :key="n">
                        <div class="text-white text-center m-1 py-5 bg-vue-dark rounded hover:bg-gray-900"
                        :class="{'bg-vue-green': ['C','*','/','-','+','%','='].includes(n)}"
                        @click="action(n)">
                            {{n}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>

export default ({
    name: 'Calculator',

    data() {
    return {
        value: '',
        calculatorElements: ['C','*','/','-',7,8,9,'+',4,5,6,'%',1,2,3,'=',0,'.'],
        operator: '',
        previousValue: '',
        expression: 0,
    }
    },
    methods: {
        action(n){
            if(!isNaN(n) || n === '.'){
                this.value += n + '';
            }
            if(n === 'C'){
                this.value = '';
                this.previousValue = '';
                this.operator = '';
            }
            if(n === '%'){
                this.operator = n;
                this.previousValue = this.value;
                this.value = '';
            }
            if(['/','*','-','+'].includes(n)){
                this.operator = n;
                this.previousValue = this.value;
                this.value = '';
            }
            if(n === '='){
                if(this.operator !== '%') {
                    this.value = eval( this.previousValue + this.operator + this.value )
                    this.previousValue = '';
                    this.operator = '';
                }
                else {
                    this.value = eval( (this.value / 100) * this.previousValue )
                    this.previousValue = '';
                    this.operator = '';
                }
            }
            
        }
    }
})


</script>
<style scoped>
.bg-vue-dark {
    background: #31475e;
  }
.hover-class:hover {
cursor: pointer;
background: #3D5875;
}
.bg-vue-green {
background: #3e9670;
}
</style>