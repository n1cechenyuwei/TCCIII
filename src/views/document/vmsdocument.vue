<template>
  <Foldermodel :propsdata="nextdata"></Foldermodel>
</template>

<script>
import Foldermodel from "./foldermodel";
export default {
  data() {
    return {
      nextdata: {
        propsstatus: "vmsdocs",
        breacname: "VMS项目文档",
        breacpath: "vmsdocument"
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
