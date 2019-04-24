<template>
  <Foldermodel :propsdata="nextdata"></Foldermodel>
</template>

<script>
import Foldermodel from "./foldermodel";
export default {
  data() {
    return {
      nextdata: {
        propsstatus: "pisdocs",
        breacname: "PIS项目文档",
        breacpath: "pisdocument"
      }
    };
  },
  components: {
    Foldermodel
  }
};
</script>

<style>
</style>
