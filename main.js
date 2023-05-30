const lengthInput = document.querySelector('#lengthInput')
const inputs = document.querySelectorAll('input');
const purchase = document.querySelector('#purchase');
const radioType = document.querySelectorAll('input[name="type"]');
const otkat = document.querySelector('#otkat');
const raspash = document.querySelector('#raspash');
const kalit = document.querySelector('#kalit');
const inputsField = document.querySelector('#inputsField');
let calcResult = document.querySelector('input[name="calcResult"]');
let calcType = document.querySelector('input[name="calcType"]');
let calcLength = document.querySelector('input[name="calcLength"]');
let calcVchod = document.querySelector('input[name="calcVchod"]');
radioType[0].value = 1600; //ЦЕНА МОНТАЖА ГИТТЕР
radioType[1].value = 2850; //ЦЕНА МОНТАЖА ПРОФЛИСТА
radioType[2].value = 3200; //ЦЕНА МОНТАЖА ШТАКЕТНИК В ОДИН РЯД
radioType[3].value = 4400; //ЦЕНА МОНТАЖА ШТАКЕТНИК В ШАХМАТНОМ ПОРЯДКЕ
let basePrice = 1600;
calcType.value = 'Гиттер';

function calculate() {
	if(radioType[0].checked){
		basePrice = radioType[0].value;
		calcType.value = 'Гиттер';
	}
	if(radioType[1].checked){
		basePrice = radioType[1].value;
		calcType.value = 'Профлист';
	}
	if(radioType[2].checked){
		basePrice = radioType[2].value;
		calcType.value = 'Штакетник в один ряд';
	}
	if(radioType[3].checked){
		basePrice = radioType[3].value;
		calcType.value = 'Штакетник в шахматном порядке';
	}
	
    purchase.value = parseInt(basePrice) * parseInt(lengthInput.value);
	
    if(otkat.checked) {
        purchase.value = parseFloat(purchase.value) + 75000; // ЦЕНА ЗА ОТКАТНЫЕ ВОРОТА
		calcVchod.value = 'Откатные';
    }
    if(raspash.checked) {
        purchase.value = parseFloat(purchase.value) + 35000; // ЦЕНА ЗА РАСПАШНЫЕ ВОРОТА
		calcVchod.value = 'Распашные';
    }
    if(kalit.checked) {
        purchase.value = parseFloat(purchase.value) + 11000; // ЦЕНА ЗА КАЛИТКУ
		calcVchod.value = 'Калитка';
    }
	if((otkat.checked) && (raspash.checked)) {
		calcVchod.value = 'Откатные и распашные';
	}
	if((otkat.checked) && (kalit.checked)) {
		calcVchod.value = 'Откатные и калитка';
	}
	if((raspash.checked) && (kalit.checked)) {
		calcVchod.value = 'Распашные и калитка';
	}
	if((raspash.checked) && (kalit.checked) && (otkat.checked)) {
		calcVchod.value = 'Распашные, откатные и калитка';
	}
	calcResult.value = purchase.value;
	calcLength.value = lengthInput.value;
}

for (const input of inputs) {
    input.addEventListener('input', function () {
        calculate();
    });
}

inputsField.addEventListener("click", function() {
	calculate();
});

const form = document.getElementById("feedbackForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // предотвращаем перезагрузку страницы

  const formData = new FormData(form); // получаем данные формы

  const xhr = new XMLHttpRequest(); // создаем объект XMLHttpRequest

  xhr.open("POST", "/calculator/send.php"); // настраиваем запрос

  xhr.onreadystatechange = function() { // обрабатываем результат
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      document.getElementById("result").innerHTML = xhr.responseText;
	  form.style.display = 'none';
    }
  }

  xhr.send(formData); // отправляем данные на сервер
});