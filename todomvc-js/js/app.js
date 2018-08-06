let list = document.getElementById('todolist');
let input = document.getElementsByClassName('toggle');
let count = document.getElementsByTagName('strong')[0];
let  cut = document.getElementById('toggle-all');
let clear = document.getElementsByClassName('clear-completed')[0];

//获取文本框内容 回车键入
function addTodo() {
	let todoText = event.target.value;
	if(event.keyCode === 13) {
		if(todoText.length) {
			let li = document.createElement('li');
			list.appendChild(li);
			li.innerHTML = `
						<div class="view" onclick="left()">
							<input class="toggle" type="checkbox" onclick="onpage()">
							<!--<label ondblclick="this.style.border = '1px solid orange';"><input value="${todoText}" onkeyup="editing(this)" onmouseout="delstyle(this)"></label>-->
							<label ondblclick="edit(this)" onkeyup="delstyle(this)">${todoText}</label>
							<button class="destroy" onclick="removeTodo(this)">×</button>
						</div>`;
			event.target.value = '';
			}
		}
	}

	//删除单个任务项
function removeTodo(aim) {
	aim.parentNode.parentNode.parentNode.removeChild(aim.parentNode.parentNode);
	left();
	}

	//未完成任务数数量
function leftTodo() {
	let len = 1;
	for(let i of input) {
		if(i.checked === false) {
			len++;
		}
	}
	count.innerHTML = len;
}
function left() {
	let len2 = 0;
	for(let i of input) {
		if(i.checked === false) {
			len2++;
		}
	}
	count.innerHTML = len2;
}

//控场
function allState() {
	for(let n of input) {
		n.checked = cut.checked;
	}
	left();
}

//删除任务
function removeCom() {
	let remo = [];
	for(let m = 0;m < input.length; m++) {
		if(input[m].checked === true) {
			remo.push(input[m]);
		}
	}
	for(let k = 0 ;k < remo.length; k++) {
		removeTodo(remo[k]);
	}
}

//all
function pickall() {
	for(let z of input) {
		z.parentNode.parentNode.style.display = "block";
	}
}

//completed
function completed() {
	for(let l of input) {
		!l.checked ? l.parentNode.parentNode.style.display = "none" : l.parentNode.parentNode.style.display = "block";
	}
}

//active
function active() {
		for(let m of input) {
			m.checked ? m.parentNode.parentNode.style.display = "none" : m.parentNode.parentNode.style.display = "block";
		}
}

//取消样式
function delstyle(cur) {
	if(event.keyCode === 13) {
		event.target.parentNode.style.border = 'none';
		cur.blur();
	}
}

function edit(element){
	element.style.border = '1px solid orange';
	var oldhtml = element.innerHTML;//获得元素之前的内容
	var newobj = document.createElement('input');//创建一个input元素
	newobj.type = 'text';//为newobj元素添加类型
	newobj.value=oldhtml;
	element.innerHTML = '';　　 //设置元素内容为空
	element.appendChild(newobj);//添加子元素
	newobj.focus();//获得焦点
	newobj.onblur = function(){
		//当触发时判断newobj的值是否为空，为空则不修改，并返回oldhtml
		element.innerHTML = this.value ? this.value : oldhtml;
		element.style.border = '0';
	}
}

//切换
function onpage() {
	if((page()) === 'active')
		active();
	if((page()) === 'completed')
		completed();
}

function page() {
	return window.location.hash.slice(2) || 'all';
}

window.onhashchange = page();
