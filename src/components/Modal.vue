<template>
    <div class="modal-overlay">
        <div class="modal">
                <div class="modal-title">
                    {{ title }}
                </div>
                <small class="modal-text">
                    {{ text }}
                </small>
            <div class="buttons">
                <button @click="emitOkAndClose">{{ okButtonText }}</button>
                <button @click="emitClose">{{ cancelButtonText }}</button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
	name: 'Modal',
	data(){
        return  {}
	},
    props: {
        title: String,
        text: String,
        okButtonText: String,
        cancelButtonText: String
    },
    methods: {
        emitClose () {
            this.$emit("closeModal");
        },
        emitOkAndClose() {
            this.$emit("closeModal");
            this.$emit("executeAction");
        }
    },
}
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  left: 25%;
  right: 25%;
  background-color: #f0f8ff;
  top: 25%;
  border-radius: 15px;
}
.modal {
    padding:20px;
}
.buttons {
    padding:10px;
}

</style>
