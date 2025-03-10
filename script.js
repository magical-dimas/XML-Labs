window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let theme = 0
    let theme2 = 0

    body = document.getElementById("body")
    equals_but = document.getElementById("btn_op_equal")
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
                outputElement.innerHTML = a
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    document.getElementById("btn_op_sign").onclick = function(){
        if (!selectedOperation) {
            a = (-a).toString()
            outputElement.innerHTML = a
        } else {
            b = (-b).toString()
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_back").onclick = function(){
        if (!selectedOperation) {
            if(a!=""){
                a = a.slice(0, -1)
                if(a!="" && a!="-") outputElement.innerHTML = a
                else {
                    a = ""
                    outputElement.innerHTML = 0
                }
            }
        } else {
            if(b!=""){
                b = b.slice(0, -1)
                if(b!="" && b!="-") outputElement.innerHTML = b    
                else {
                    b = ""
                    outputElement.innerHTML = 0
                }
            }
        }
    }

    document.getElementById("btn_change").onclick = function(){
        if(theme==0){
            body.style.background = "#006cdc"
            body.style.color = "#f8f9fa"
            theme = 1
        }
        else {
            body.style.background = "#f8f9fa"
            body.style.color = "#1a1a19"
            theme = 0
        }
    }

    document.getElementById("btn_change_res").onclick = function(){
        if(theme2==0){
            outputElement.style.background = "#1b2335"
            outputElement.style.color = "#f8f9fa"
            theme2 = 1
        }
        else {
            outputElement.style.background = "#cbdce1"
            outputElement.style.color = "#1b2335"
            theme2 = 0
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function(){
        a = (Math.sqrt(a)).toString()
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_sqr").onclick = function(){
        a = (a*a).toString()
        outputElement.innerHTML = a
    }

    function fact(n){
        if(n == 0) return 1
        else return n*fact(n-1)
    }

    document.getElementById("btn_op_fact").onclick = function(){
        a = (fact(a)).toString()
        outputElement.innerHTML = a
    }
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if(b!=="" && selectedOperation == '+'){
            a = ((+a)+(+b)).toString()
            b = ''
        }
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if(b!=="" && selectedOperation == '-'){
            a = ((+a)-(+b)).toString()
            b = ''
        }
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a === '') return
        selectedOperation = '%'
    }

    document.getElementById("btn_special").onclick = function(){
        if(a>=0 && a<=10 && b==""){
            equals_but.style.filter = "brightness(" + a*10 + "%)";
        }
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a)/(+b)*100
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    };