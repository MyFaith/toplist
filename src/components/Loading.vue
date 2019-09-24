<template>
    <div class="spin">
        <a-spin>
            <a-icon slot="indicator" type="loading" style="font-size: 34px" spin/>
        </a-spin>
    </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
.spin {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>
