<template>
  <div>
    <a :href="this.link.link">
      <div class="custcard">
        <div class="card-header">{{this.link.name}}</div>
        <div class="card-main">
          <i :class="`lni lni-32 lni-${this.link.icon}`"></i>
          <div class="main-description">
            <strong>{{this.link.code}}</strong>
            <br>
            {{this.link.link}}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import '@/assets/css/LineIcons.css';

export default {
  name: 'linkCard',
  props: {
    link: Object,
  },
};
</script>

<style>
a {
  text-decoration: none;
}

a:hover{
  text-decoration: none;
}

a:hover .card-header, a:hover .main-description{
  text-decoration: underline;
  text-decoration-color: #0097A7;
}

.center{
  text-align: center;
}

.custcard {
  width: 150px;                 /* Set width of cards */
  display: flex;                /* Children use Flexbox */
  flex-direction: column;       /* Rotate Axis */
  border: 1px solid #80DEEA;    /* Set up Border */
  border-radius: 4px;           /* Slightly Curve edges */
  overflow: hidden;             /* Fixes the corners */
  margin: 5px;                  /* Add space between cards */
}

.card-header {
  color: #0097A7;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid #80DEEA;
  background-color: #E0F7FA;
  padding: 5px 10px;
}

.card-main {
  display: flex;              /* Children use Flexbox */
  flex-direction: column;     /* Rotate Axis to Vertical */
  justify-content: center;    /* Group Children in Center */
  align-items: center;        /* Group Children in Center (on cross axis) */
  padding: 15px 0;            /* Add padding to the top/bottom */
}

i {
  color: #0097A7;
  margin-bottom: 5px;
}

.main-description {
  color: #0097A7;
  font-size: 12px;
  text-align: center;
}

.parent {
  overflow: hidden; /* required */
}

.ribbon {
  margin: 0;
  padding: 0;
  background: #E0F7FA;
  color: #0097A7;
  padding:1em 0;
  position: absolute;
  top:0;
  right:0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
}
.ribbon:before,
.ribbon:after {
  content: '';
  position: absolute;
  top:0;
  margin: 0 -1px; /* tweak */
  width: 100%;
  height: 100%;
  background: #E0F7FA;
}
.ribbon:before {
  right:100%;
}

.ribbon:after {
  left:100%;
}

</style>
