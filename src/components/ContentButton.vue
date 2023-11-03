<template>
    <div class="container">
        <div class="">
            <div @change="changed" id="text">{{ temporaries.preview }}</div>
        </div>
        <div class="lowerContent">

            <input @change="changed" id="result" type="number" v-bind:value="temporaries.result">

            <div class="content">
                <button v-for="(button, index) in buttons" :key="index" :class="colorClass(button)"
                    @click="buttonClick(button)">
                    {{ button.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: [
                { label: "C", action: "actionClear", color: 'gray', value: 'Clear', status: 'enable' },
                { label: "±", action: "actionPlusMin", color: 'gray', value: 'switchPlusMin', status: 'disabled' },
                { label: "%", action: "actionPercent", color: 'gray', value: '%', status: 'disabled' },
                { label: "÷", action: "actionDivided", color: 'purple', value: '/', status: 'enable' },
                { label: "7", action: "action7", color: 'white', value: '7', status: 'enable' },
                { label: "8", action: "action8", color: 'white', value: '8', status: 'enable' },
                { label: "9", action: "action9", color: 'white', value: '9', status: 'enable' },
                { label: "×", action: "actionTimes", color: 'purple', value: '*', status: 'enable' },
                { label: "4", action: "action4", color: 'white', value: '4', status: 'enable' },
                { label: "5", action: "action5", color: 'white', value: '5', status: 'enable' },
                { label: "6", action: "action6", color: 'white', value: '6', status: 'enable' },
                { label: "-", action: "actionMin", color: 'purple', value: '-', status: 'enable' },
                { label: "1", action: "action1", color: 'white', value: '1', status: 'enable' },
                { label: "2", action: "action2", color: 'white', value: '2', status: 'enable' },
                { label: "3", action: "action3", color: 'white', value: '3', status: 'enable' },
                { label: "+", action: "actionPlus", color: 'purple', value: '+', status: 'enable' },
                { label: ".", action: "actionDot", color: 'white', value: '.', status: 'enable' },
                { label: "0", action: "action0", color: 'white', value: '0', status: 'enable' },
                { label: "←", action: "actionBackSpace", color: 'white', value: 'removeOne', status: 'enable' },
                { label: "=", action: "actionSubmit", color: 'purple', value: '=', status: 'enable' },
            ],
            temporaries: {
                activateSegment: 0,
                previewArr: [],
                currentlyAccess: '',
                result: 0,
                preview: '',
                value: 0
            }
        };
    },
    methods: {
        buttonClick(button) {
            switch (button.action) {
                case "actionClear":
                    this.temporaries.value = 0;
                    this.temporaries.preview = '';
                    this.temporaries.result = 0;
                    this.temporaries.activateSegment = 0;
                    this.temporaries.previewArr = [];
                    this.temporaries.currentlyAccess = '';
                    break;
                case "action0":
                    this.writeFormulas(button);
                    break;
                case "action1":
                    this.writeFormulas(button);
                    break;
                case "action2":
                    this.writeFormulas(button);
                    break;
                case "action3":
                    this.writeFormulas(button);
                    break;
                case "action4":
                    this.writeFormulas(button);
                    break;
                case "action5":
                    this.writeFormulas(button);
                    break;
                case "action6":
                    this.writeFormulas(button);
                    break;
                case "action7":
                    this.writeFormulas(button);
                    break;
                case "action8":
                    this.writeFormulas(button);
                    break;
                case "action9":
                    this.writeFormulas(button);
                    break;

                case "actionDot":
                    if (this.temporaries.previewArr.length > 0) {
                        this.writeFormulas(button);
                    }
                    break;


                case "actionPercent":
                    this.percentageFormulas();
                    break;

                case "actionDivided":
                    if (this.temporaries.previewArr.length > 0) {
                        this.splitSegment(button);
                    }
                    break;
                case "actionTimes":
                    if (this.temporaries.previewArr.length > 0) {
                        this.splitSegment(button);
                    }
                    break;
                case "actionMin":
                    if (this.temporaries.previewArr.length > 0) {
                        this.splitSegment(button);
                    }
                    break;
                case "actionPlus":
                    if (this.temporaries.previewArr.length > 0) {
                        this.splitSegment(button);
                    }
                    break;

                case "actionSubmit":
                    if (this.temporaries.previewArr.length > 0) {
                        this.submit();
                    }
                    break;
                case "actionBackSpace":
                    if (this.temporaries.previewArr.length > 0) {
                        this.backSpace();
                    }
                    break;

                default:
                    break;
            }
        },
        previewFormulas() {
            let previewString = this.temporaries.previewArr.toString();
            this.temporaries.preview = previewString.replaceAll(',', '');
        },
        storeFormulas(type) {
            let segmentWork = this.checkCurrentWorkingSegment();
            if (type == 'number' && this.temporaries.currentlyAccess != '') {

                if (this.temporaries.previewArr[segmentWork] == '+' ||
                    this.temporaries.previewArr[segmentWork] == '-' ||
                    this.temporaries.previewArr[segmentWork] == '*' ||
                    this.temporaries.previewArr[segmentWork] == '/') {
                    this.temporaries.previewArr.push(this.temporaries.currentlyAccess);
                } else {
                    this.temporaries.previewArr.pop();
                    this.temporaries.previewArr.push(this.temporaries.currentlyAccess);
                }
            } else if (type == 'number' && this.temporaries.currentlyAccess == '') {
                console.log("remove success!");

            } else {
                if (this.temporaries.previewArr[segmentWork] == '+' ||
                    this.temporaries.previewArr[segmentWork] == '-' ||
                    this.temporaries.previewArr[segmentWork] == '*' ||
                    this.temporaries.previewArr[segmentWork] == '/') {
                    this.temporaries.previewArr.pop();
                    this.temporaries.previewArr.push(type);
                } else {
                    this.temporaries.previewArr.push(type);
                }
            }

            this.previewFormulas();
        },
        writeFormulas(button) {
            let valuePreview = this.temporaries.preview;
            let valueButton = String(button.value);

            if (valuePreview == "") {
                this.temporaries.currentlyAccess = button.value;
            } else {

                let valueCurrent = this.temporaries.currentlyAccess;
                let firstCharacterPreview = valueCurrent.substring(0, 1);
                if (valueCurrent.length == 1 && firstCharacterPreview == "0" && valueButton != '.') {

                    if (valueButton != '.') {
                        valueCurrent = valueCurrent.substring(1);
                    }

                    this.temporaries.currentlyAccess = valueCurrent + valueButton;
                } else if (valueCurrent.length == 1 && valueCurrent == "0" && valueButton == '.') {

                    this.temporaries.currentlyAccess = this.temporaries.currentlyAccess + valueButton;
                } else {
                    this.temporaries.currentlyAccess = this.temporaries.currentlyAccess + valueButton;
                }
            }
            this.storeFormulas('number');
        },
        checkCurrentWorkingSegment() {
            let checkCurrentSegment = this.temporaries.previewArr;
            let segment = checkCurrentSegment.length
            if (segment == 0) {
                return 0;
            } else if (segment > 0) {
                return segment - 1
            }
        },
        splitSegment(button) {
            let checkCurrentSegment = this.temporaries.previewArr;

            if (checkCurrentSegment.length == 0) {
                checkCurrentSegment.push(this.temporaries.currentlyAccess);
                checkCurrentSegment.push(button.value);
            } else if (checkCurrentSegment.length > 0) {
                checkCurrentSegment[checkCurrentSegment.length - 1];
                if (
                    checkCurrentSegment[checkCurrentSegment.length - 1] == '+' ||
                    checkCurrentSegment[checkCurrentSegment.length - 1] == '-' ||
                    checkCurrentSegment[checkCurrentSegment.length - 1] == '*' ||
                    checkCurrentSegment[checkCurrentSegment.length - 1] == '/'
                ) {
                    checkCurrentSegment.pop();
                    checkCurrentSegment.push(button.value);
                }
            }
            this.temporaries.currentlyAccess = '';
            this.storeFormulas(button.value);

        },
        percentageFormulas() {
            let valueCurrent = this.temporaries.currentlyAccess;
            let result = valueCurrent/100;
            this.temporaries.currentlyAccess = String(result);
            this.storeFormulas("number");
        },
        submit() {
            let previewString = this.temporaries.previewArr.toString();
            let test = previewString.replaceAll(',', '');
            this.temporaries.result = eval(test);
        },
        backSpace() {

            let segmentWork = this.checkCurrentWorkingSegment();

            if (this.temporaries.previewArr[segmentWork] == '+' ||
                this.temporaries.previewArr[segmentWork] == '-' ||
                this.temporaries.previewArr[segmentWork] == '*' ||
                this.temporaries.previewArr[segmentWork] == '/') {
                this.temporaries.previewArr.pop();
                segmentWork = this.checkCurrentWorkingSegment();
                let lastSegment = this.temporaries.previewArr[segmentWork];

                this.temporaries.currentlyAccess = lastSegment;
            } else {
                let lastSegment = this.temporaries.previewArr[segmentWork];
                

                let removeSegment = lastSegment.substring(0, lastSegment.length - 1);
                if (removeSegment.length == 0) {


                    this.temporaries.previewArr.pop();
                    segmentWork = this.checkCurrentWorkingSegment();
                    let lastSegment = this.temporaries.previewArr[segmentWork];

                    if (lastSegment == '+' ||
                        lastSegment == '-' ||
                        lastSegment == '*' ||
                        lastSegment == '/') {
                        this.temporaries.currentlyAccess = '';
                    } else {
                        this.temporaries.currentlyAccess = lastSegment;
                    }
                } else {
                    this.temporaries.currentlyAccess = removeSegment;
                }

                if (segmentWork == 0 && removeSegment == ""){
                    this.temporaries.value = 0;
                    this.temporaries.preview = '';
                    this.temporaries.result = 0;
                    this.temporaries.activateSegment = 0;
                    this.temporaries.previewArr = [];
                    this.temporaries.currentlyAccess = '';
                }

            }
            this.storeFormulas("number");



        },
        colorClass(item) {
            return {
                'white': item.color === 'white',
                'gray': item.color === 'gray',
                'purple': item.color === 'purple'
            };
        }
    },
    computed: {
    },

};
</script>