<template>
  <div>
      <p>Hide<span>N</span>seek</p>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap');

div {
    position: relative;
    transform: rotate(0deg);
    animation-name: shake;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    padding:20px;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 30pt;
    color: #eeeeee;
}

p span {
    font-family: 'Lobster', cursive;
    color:red;
    font-size: 40pt;
}

@keyframes shake {

  0%   {transform: rotate(0deg);}
  25%  {transform: rotate(2deg);}
  50%  {transform: rotate(0deg);}
  75%  {transform: rotate(-2deg);}
  100% {transform: rotate(0deg);}
}

</style>