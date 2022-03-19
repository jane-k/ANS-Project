<template>
  <div class="upload-container">
    <input type="file" id="initialData" />
    <label for="initialData" class="data-upload__text">
      <font-awesome-icon icon="fa-upload" class="fa-2x upload-icon" />
      <p>ANS 계산을 위한 .CSV 형식의 초기 파일을 업로드해주세요.</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "UploadData",
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
      color: var(--secondary);
    }
  }
}
</style>
