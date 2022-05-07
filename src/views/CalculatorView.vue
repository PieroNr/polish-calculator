<template>
  <div class="home">
    <h1>Reverse polish calculator</h1>
    <p>You can use your keyboard or the buttons here but think to put a space between all:</p>
    <div class="calculator">
      <div class="display">{{ current || '0' }}</div>
      <button @click="append('7')" class="btn">7</button>
      <button @click="append('8')" class="btn">8</button>
      <button @click="append('9')" class="btn">9</button>
      <button @click="append(' / ')" class="btn operator">/</button>
      <button @click="append('4')" class="btn">4</button>
      <button @click="append('5')" class="btn">5</button>
      <button @click="append('6')" class="btn">6</button>
      <button @click="append(' x ')" class="btn operator">x</button>
      <button @click="append('1')" class="btn">1</button>
      <button @click="append('2')" class="btn">2</button>
      <button @click="append('3')" class="btn">3</button>
      <button @click="append(' - ')" class="btn operator">-</button>
      <button @click="append('0')" class="btn zero">0</button>
      <button @click="dot" class="btn">.</button>
      <button @click="append(' + ')" class="btn operator">+</button>
      <button @click="append(' NEGATE ')" class="btn">Neg</button>
      <button @click="append(' ')" class="btn">Espace</button>
      <button @click="clear" class="btn">C</button>
      <button @click="equal" class="btn operator">=</button>
    </div>
    <transition>
      <div class="error" v-if="errorMsg !==''">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>

    <p>Made with ❤ by Adrien BOUTEILLER, Piero NERI, Timothée DURAND, Tristan SECLET, Cécile DENONCIN, Jessy ERNATUS et Paul COTOGNO</p>
  </div>
</template>

<script>
import {calculatePolish} from "../../script/calculating";

export default {
  data() {
    return {
      current: '',
      errorMsg: ''
    }
  },
  mounted() {
    window.addEventListener("keydown", ({key, keyCode}) => {
      if((keyCode > 47 && keyCode < 58) || (keyCode > 64 && keyCode < 91) || (keyCode > 95 && keyCode < 112) || keyCode === 8 || keyCode === 13 || keyCode === 32 ) {
        //if it is a number, a letter, an operator or a correct function key
        switch (key) {
          case "Enter" :
            this.equal();
            break;
          case "Backspace" :
            this.current = this.current.slice(0, this.current.length - 1)
            break;
          default :
            this.current += key
        }
      }

    })
  },
  methods: {
    clear() {
      this.current = '';
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },
    equal() {
      try {
        this.current = `${calculatePolish(this.current)}`;
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}


.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}

.zero {
  grid-column: 1 / 3;
}

.btn {
  background-color: #F2F2F2;
  border: 1px solid #999;
}

.operator {
  background-color: orange;
  color: white;
}

button {
  cursor: pointer;
}

.error {
  background-color: orangered;
  color: white;
  width: 400px;
  text-align: center;
  margin: 10px auto 0 auto;
  padding: 10px;
  box-sizing: border-box;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
