function injectTemplate(templateId) {
    const rootElement = document.getElementById("main-content-root-container");
    const elementToBeRendered = document.getElementById(templateId).content.cloneNode(true);
    rootElement.replaceChildren(elementToBeRendered);
}

const views = [
    {
        id: "upload-file",
        attachHandlers() {
            document.getElementById("test-next-button").addEventListener("click", function() {
                step.current++;
            })
        }
    },
    {
        id: "adjust-image-cropping",
        attachHandlers() {}
    },
    {
        id: "finished-product",
        attachHandlers() {}
    }
];

function renderView(stepIndex) {
    if (typeof stepIndex !== "number") {
        throw new TypeError();
    }

    if (stepIndex < 0 || stepIndex >= views.length) {
        throw new RangeError();
    }

    injectTemplate(views[stepIndex].id);
    views[stepIndex].attachHandlers();
}

const step = {
    _curr: 0,

    get current() {
        return this._curr;
    },

    // _update(value) {
    //     this._curr = value;
    //     renderView(this._curr);
    // },

    set current(value) {
        /*if (typeof value === "number" && value > 0 && value < views.length-1)*/ try {
            this._curr = value;
            renderView(this._curr);
        }
        catch (err) {
            console.error(err);
            // console.log(err);
        }
    },

    next() {
        // if (this._curr < views.length-1) {
            // ++this._curr;
            // this._update(this._curr + 1);
            // this.current = this._curr + 1;
        // }
        ++this.current;
    },

    previous() {
        // if (this._curr > 0) {
            // --this._curr;
            // this._update(this._curr - 1);
            // this.current = this._curr - 1;
        // }
        --this.current;
    }
}

let currentStep = 0;
// function init() {
    renderView(currentStep);