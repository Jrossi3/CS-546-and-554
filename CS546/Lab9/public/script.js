let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('attempts');
let frmLabel = document.getElementById('formLabel');
if (myForm) {
    myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isNaN(parseInt(textInput.value)) == true){
        textInput.value = '';
        errorDiv.hidden = false;
        errorDiv.innerHTML = 'You must enter a number';
        frmLabel.className = 'error';
        textInput.focus();
    }else {
        if (textInput.value.trim()) {
            errorDiv.hidden = true;
            frmLabel.classList.remove('error');
            let li = document.createElement('li');
            li.innerHTML = textInput.value;
            if (textInput.value < 0) {
                textInput.value = '';
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'You must enter a positive value';
                frmLabel.className = 'error';
                textInput.focus();
            } else {
                if (isPrime()) {
                    li.className = 'is-prime';
                    li.innerHTML = textInput.value + " is a prime number"
                }
                else {
                    li.className = 'not-prime';
                    li.innerHTML = textInput.value + " is NOT a prime number"
                }
                myUl.appendChild(li);
                myForm.reset();
                textInput.focus();
            }
        } else {
            textInput.value = '';
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'You must enter a value';
            frmLabel.className = 'error';
            textInput.focus();
        }
    }
  });
}

function isPrime(){
    if (textInput.value == 2 || textInput.value == 1) {
        return true
    }
    else if (textInput.value == 0) {
        return false
    }
    else {
        for (let i = 2; i <= 10; i++){
            if(textInput.value % i == 0 && textInput.value != i) {
                return false
            }
        }
    }
    return true
}