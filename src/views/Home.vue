<script setup>
const bgImage = "background-image: url('../../public/images/bg_Home.png')"
</script>
 
<template>
<div>
<div class=" h-screen bg-no-repeat bg-cover bg-fixed" 
:style="bgImage">
<h1 class="text-xl font-bold">PORTFOLIO</h1>
<div class="justify-center items-center flex">
    <img src="../../public/images/my-pic.png" alt="myPic" class="h-screen">
</div>

</div>
<div class="h-screen bg-blue-500">
    <div>

        <h1 class="text-xl font-bold">div for second bg</h1>
    </div>
</div>
</div>
</template>
 