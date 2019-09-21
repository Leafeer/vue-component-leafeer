<template>
  <div>
    <h1>{{$route.params.title}} </h1>
    <p>{{$route.params.content}}</p>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name:'News',
  
}
</script>

