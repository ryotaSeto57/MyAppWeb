<template>
<div id="container">
  <div id= "screenshot-container">
  <div id="slider-wrap">
    <ul id="slider">
      <li v-for="url in Object.values(urlList)" v-bind:key="url" class="img-container">
        <img :src="url">
      </li>
    </ul>
    <div class="btns" id="previous" v-on:click="slideLeft">
        <svg id="svg-previous">
          <use xlink:href="#arrow-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 11" id = "arrow-left">
              <path d="M 2.31 6 l 4 4.16 a 0.82 0.82 0 0 1 0 1.11 a 0.73 0.73 0 0 1 -1 0 l 0 0 L 0.72 6.56 a 0.82 0.82 0 0 1 0 -1.11 L 5.22 0.73 a 0.73 0.73 0 0 1 1 0 l 0 0 a 0.82 0.82 0 0 1 0 1.11 Z"
                transform="translate(-.5 -.5)">
              </path>
            </svg>
          </use>
        </svg>
    </div>
    <div class="btns" id="next" v-on:click="slideRight">
      <svg id = "svg-next">
        <use xlink:href="#arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 11" id = "arrow-right">
            <path d="M 4.69 6 l -4 -4.16 A 0.82 0.82 0 0 1 0.72 0.73 a 0.73 0.73 0 0 1 1 0 l 0 0 l 4.5 4.71 a 0.83 0.83 0 0 1 0 1.12 l -4.5 4.71 a 0.73 0.73 0 0 1 -1 0 l 0 0 a 0.82 0.82 0 0 1 0 -1.11 Z"
              transform="translate(-.5 -.5)">
            </path>
          </svg>
        </use>
      </svg>
    </div>
  </div>
  <br>
  <div id="screenshot-description">{{screenshotDescription}}</div>
  </div>
  <br>
  <br>
  <ul>
    <li v-for="app in applist" v-bind:key="app.appUid">
      <div class="app-container">
        <div class="app-info">
          <img :src="app.URL" class="app-image">
          <div class = "app-name">{{app.appName}}</div>
          <a v-bind:href="'http://play.google.com/store/apps/details?id='+app.appUid">
            <img v-bind:src="storeIconUrl"  class="store-icon">
          </a>
        </div>
        <br>
        <div class="app-review">{{app.appReview}}</div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import {firebase,db,storage} from '../plugins/firebase'

export default {
  data(){
    return{
      applist:[],
      sliderPosition: 0,
      sliderWidth:300,
      id: [],
      key: "",
      userId: Number,
      screenshotDescription: "",
      allList:[],
      urlList: [],
      storeIconUrl: "https://firebasestorage.googleapis.com/v0/b/my-app-6154a.appspot.com/o/googleplayicon%2Fgoogle-play-badge.png?alt=media&token=9c5c863a-421a-4a00-ad39-ecae7960321d"
    }
  },
  asyncData(context){
    const dataRef = db.collection('lists').doc(context.params.id);
    return dataRef.get().then((snapshot)=>{
      var userAppList = snapshot.data();
      delete userAppList['screenshot_description'];
      delete userAppList['time_stamp'];
      delete userAppList['user_id'];
      delete userAppList['screenshot_url'];
      return {
      applist: userAppList,
      id: Object.keys(snapshot.data()),
      allList: snapshot.data(),       
      userId: snapshot.data()['user_id'],
      urlList: snapshot.data()['screenshot_url'],
      screenshotDescription: snapshot.data()['screenshot_description']
      }
    }).catch((error)=>{
      return {
        }
    });
  },
  mounted(){
    this.sliderWidth = document.getElementById("slider").getBoundingClientRect().width;
    document.getElementById("slider").style.width = Object.keys(this.urlList).length *  this.sliderWidth+ "px";
    const imgContainer = document.getElementsByClassName("img-container")
    for(let i = 0; i <imgContainer.length;i++){
      imgContainer.item(i).style.width = this.sliderWidth + "px";
    }
  },
  methods:{
    slideRight: function(){
      if(this.sliderPosition == Object.keys(this.urlList).length -1){
        this.sliderPosition = 0;
      }else{
        this.sliderPosition++;
      }
      document.getElementById("slider").style.left = -this.sliderWidth * this.sliderPosition + "px" ;
    },
    slideLeft: function(){
      if(this.sliderPosition==0){
        this.sliderPosition = Object.keys(this.urlList).length - 1
      }else{
        this.sliderPosition--;
      }
      document.getElementById("slider").style.left = -this.sliderWidth*this.sliderPosition+ "px" ;
    }
  }
}
</script>
<style scoped>
*{margin:0 auto; padding:0; list-style:none;}

#slider-wrap{
  width: 300px;
  height: 750px;
  max-width: 95%;
  position: relative;
  overflow: hidden;
}
#slider-wrap ul#slider{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
}
#slider-wrap ul#slider li{
  float:left;
  position: relative;
  width: 300px;
  height: 750px;
}
#slider-wrap ul#slider li > img{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  object-fit: contain;
}
#screenshot-description{
  margin: 0px 10px;
  font-size: 120%;
}
#screenshot-container{
  background-color: lightgrey;
  border-radius: 10px;
  margin:8px
}
#previous{
  position:absolute;
  width:45px;
  height:80px;
  top:50%;
  left:0px;
  margin-top:-25px;
	line-height:57px;
  color:rgba(89, 92, 91, 0.35);
  background-color: rgba(89, 92, 91, 0.35);
  z-index: 100;
}
#svg-previous{
  position:absolute;
  width:20%;
  height:20%;
  top:40%;
  left:40%;
}
#next{
  position:absolute;
  width:45px;
  height:80px;
  top:50%;
  right:0px;
  margin-top:-25px;
	line-height:57px;
  color:rgba(89, 92, 91, 0.35);
  background-color: rgba(89, 92, 91, 0.35);
  z-index: 100;
}
#svg-next{
  position:absolute;
  width:20%;
  height:20%;
  top:40%;
  left:40%;
}
#screenshot-description{
  clear:left;
}
#next{
  clear:left;
}
.app-image{
  display: inline-block;
  margin-top: 1%;
  margin-left: 1%;
  width: 20%;
  max-height: 95%;
  object-fit: contain;
}
.app-name{
  display: inline-block;
  position: relative;
  text-align: center;
  width: 40%;
  top:-35%;
  font-size: 120%;
}
.store-icon{
  width: 35%;
  max-height: 80%;
  object-fit: contain;
  position:relative;
  top:-7%;
  display: inline-block;
}
.app-info{
  width: 100%;
  height: 70px;
}
.app-review{
  text-align: center;
}
.app-container{
  background-color: aqua;
  margin: 10px;
  border-radius: 10px;
}

</style>