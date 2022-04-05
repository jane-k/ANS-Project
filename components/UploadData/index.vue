<template>
  <div class="upload-container" @dragover="handleDrag" @drop="handleDrop">
    <input type="file" id="initialData" @change="handleUpload" />
    <label for="initialData" class="data-upload__text">
      <font-awesome-icon icon="fa-upload" class="fa-2x upload-icon" />
      <p class="upload-guide__text">클릭 또는 드래그</p>
      <p>ANS 계산을 위한 .CSV 형식의 초기 데이터를 업로드해주세요.</p>
    </label>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import csv from "csvtojson";

export default {
  name: "UploadData",
  methods: {
    readFile(file) {
      let initialDataReader = new FileReader();
      initialDataReader.onloadend = (e) => {
        let readFile = e.target;
        const csvFile = readFile.result;
        csv({
          noheader: true,
          output: "csv",
        })
          .fromString(csvFile)
          .then((csvRow) => {
            const parsedDatabase = {};
            csvRow.forEach((rowItem) => {
              parsedDatabase[rowItem[0]] = rowItem.slice(1);
            });
            console.log(parsedDatabase);
            this.mutateInitialData(parsedDatabase);
          });
      };
      initialDataReader.readAsText(file);
    },
    handleUpload(e) {
      const uploadedFile = e.target.files[0];
      this.readFile(uploadedFile);
    },
    handleDrag(e) {
      e.preventDefault();
    },
    handleDrop(e) {
      e.preventDefault();
      const uploadedFile = e.dataTransfer.files[0];
      this.readFile(uploadedFile);
    },
    ...mapMutations("ansData", ["mutateInitialData"]),
  },
};
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > input {
    visibility: hidden;
    display: none;
  }

  .data-upload__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    font-size: 1.125rem;

    .upload-icon {
      color: #312a7c;
    }

    .upload-guide__text {
      color: #999;
    }
  }
}
</style>
