const createPassBtn = document.querySelector('.createPassBtn');
const passwText = document.querySelector('.passwText');
const inputGroupInner = document.querySelector('.inputGroupInner');
const symbols = document.querySelector('.symbols');

// Параметры для пароля
const passLength = [6, 10, 14, 20];
const params = {
	rus: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
	eng: 'abcdefghigklmnopqrstuvwxyz',
	nums: '1234567890',
	chars: '!@#$%^*',
	upCase: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghigklmnopqrstuvwxyz'.toUpperCase(),
};

// формирование длины пароля
let passwlength = 0;

inputGroupInner.addEventListener('input', e => {
	const len = e.target.value;
	passwlength = len;
});

//формирование алфавита для пароля
let alp = '';

symbols.addEventListener('input', e => {
	const value = e.target.value;
	if (e.target.checked) {
		console.log('checked', value);
		alp += params[value];
	} else {
		console.log('unchecked', value);
		const target = new RegExp(`[${params[value]}]`, 'g');
		alp = alp.replace(target, '');
	}
	console.log(alp);
});

//генерация пароля
createPassBtn.addEventListener('click', () => {
	passwText.innerHTML = '';

	if (alp.length === 0) {
		alert('Пожалуйста, выберите параметры для генерации');
		return;
	}

	for (let i = 0; i < passwlength; i++) {
		let letterIndex = Math.floor(Math.random() * alp.length);
		passwText.innerHTML += alp[letterIndex];
	}
});

//копирование текста результата в буфер обмена
passwText.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(passwText.innerHTML);
	} catch (err) {
		alert(`Ошибка при копировании ${err}`);
	}
});

//генерация html всех вариантов алфавита пароля
for (let i in params) {
	let div = document.createElement('div');
	div.innerHTML = `<label for="passVar">${params[i].substr(0, 3)}</label>
  <input value=${i} type="checkbox" name="passVar" id="passVar">
  `;
	symbols.append(div);
}

//генерация html всех вариантов длины пароля
for (let i of passLength) {
	let div = document.createElement('div');
	div.innerHTML = `<div>
  <label for="passVar1">${i}</label>
  <input value=${i} type="radio" name="passVar" id="passVar1">
  </div>`;
	inputGroupInner.append(div);
}
