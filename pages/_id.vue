<template>
<div>
  <h1>{{$route.params.id}}</h1>
  <ul>
    <li v-for="app in applist" v-bind:key="app.appUid">
      {{app.appName}}
      <img :src="app.URL">
    </li>
  </ul>
  <pre>{{$data}}</pre>
</div>
</template>
<script>
import {firebase,db,storage} from '../plugins/firebase'

export default {
  data(){
    return{
      applist:[],
      // urlstore: [],
      id: 0,
      // index: Number
    }
  },
  asyncData(context){
    const dataRef = db.collection('users').doc(context.params.id);
    return dataRef.get().then((snapshot)=>{
      return {
        applist: snapshot.data(),
        id: Object.keys(snapshot.data()).length
        }
    }).catch((error)=>{
      return {
        applist: [],
        id: context.params.id
        }
    });
  },
  // mounted(){
  //   for(var appData in this.applist){
  //     storage.ref("images").child(this.applist[appData].appUid).getDownloadURL().then((url)=>{
  //       this.urlstore.push(url);
  //     });
  //   };
  //   return null
  // }
}
</script>
<style scoped>

</style>