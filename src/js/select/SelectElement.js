class SelectElement{
    constructor(elementDom, mainObject, options){
        this.elementDom = elementDom;
        this.mainObject = mainObject;
        this.input = null;

        this.defaultOptions = {
            classSelectedContainer: "agelar-selected-container--js",
            classSelected: "agelar-selected-option--js",
            classOption: "agelar-select-option--js",
           
            events: {
                selected: {
                    "name": "agelar-selected-option"
                }
            },

            input:{
                name: "",
                value: "",
            }
        }

        this.options = this.defaultOptions;

        for(let i in options){
            if(this.options[i] && options[i])
                this.options[i] = options[i]
        }

        if(this.options.input)
            this.__createInput();

        this.container = this.elementDom.querySelector("."+this.options.classSelectedContainer);

        this.init();
    }

    getSelectedOption(){
        const selectedOption = this.elementDom.querySelector("."+this.options.classSelected);
        if(!selectedOption){
            return this.__initSelectedOption();
        }

        return selectedOption;
    }

    setSelectedOption(option, e = null){
        if(!option || typeof option !== 'object') return;

        if(this.input){
            if(option.dataset.value)
                this.input.value = option.dataset.value;
            else
                this.input.value = option.innerHTML;
        }

        if(this.container && option){
            selectedContainer.innerHTML = option.innerHTML;    
        }

        if(option){
            const eventSelected = new CustomEvent(this.options.events.selected.name, {
                e: e, 
                detail:{
                    selectedContainer:selectedContainer,
                    option: option
                }
            });

            this.elementDom.dispatchEvent(eventSelected);
        }
    }
    
    getOptions(){
        return this.elementDom.querySelectorAll("."+this.options.classOption);
    }

    __setEventSelected(){
        this.getOptions().forEach((item) => {
            item.addEventListener("click", (e) => {
                this.__toggleSelected(item, e)
            });
        });
    }

    __toggleSelected(option, e = null){
        if(!option || typeof option !== 'object') return;

        const selectedOption = this.getSelectedOption();
        if(selectedOption){
            selectedOption.classList.remove(this.options.classSelected);
        }

        option.classList.add(this.options.classSelected);
        this.setSelectedOption(option, e);
    }

    __initSelectedOption(){
        let options = this.getOptions();
        if(options.length > 1){
            let option = options[0];
            option.classList.add(this.options.classSelected);
            return option;
        }

        return null; 
    }

    __createInput(){
        const optionsInput = this.options.input;
        const input = document.createElement("input");
              input.setAttribute("type", "hidden");
    
        if(optionsInput.name)
            input.setAttribute("name", optionsInput.name);
        if(optionsInput.value)
            input.setAttribute("value", optionsInput.value);

        this.elementDom.append(input);
        this.input = input;
    }

    init(){
        let selectedOption = this.getSelectedOption();
        if(selectedOption){
            this.setSelectedOption(selectedOption);
        }

        this.__setEventSelected();
    }
}

export default SelectElement;