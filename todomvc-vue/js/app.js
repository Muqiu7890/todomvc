(function (exports) {
	const todos = [
	];

	//输入框聚焦 全局自定义指令 v-focus
	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		inserted: function (el) {
			// 聚焦元素
			el.focus()
			//console.log(el)
		}
	});

	exports.vm = new Vue({
		el: '#todoapp',
		data: {
			todos,
			filterstate: '',
			currentEditing: null,
		}, //响应式数据成员
		computed: {
			count: function () {
				return this.todos.filter(item => !item.completed).length
			},
			filtertodos: function () {
				switch (this.filterstate) {
					case 'active': {
						return this.todos.filter(item => !item.completed);
						break;
					}
					case 'completed': {
						return this.todos.filter(item => item.completed);
						break;
					}
					default: {
						return this.todos;
						break;
					}
				}
			},
			toggleState: {
				get () {
						return this.todos.every(item => item.completed);
					}, //获取val
				set (val) {
					this.todos.forEach(todo => todo.completed = val) //全选
				}
			}


		},
		directives: { //局部自定义指令
			//在钩子函数中，this指向window
			editingFocus: {
				update (el,binding) {
					//console.log(binding.value.);
					if(binding.value) {
						console.dir(binding);
						el.focus()
					}
				},
			}
		},
		methods: {
			//es6简写 对象属性
			addTodo(event) {
				//alert(event.type);
				var todoText = event.target.value.trim();
				if (!todoText.length) {
					//获取文本框数据
					//判断数据蜀否非空，为空，保持沉默，否则，添加到数组
					//添加到数组
					//清空文本框
					return
				} else {
					const last = this.todos[this.todos.length - 1];
					const id = last ? last + 1 : 1;

						this.todos.push({
							id,
							completed: false,
							title: todoText
						});

					event.target.value = ''
				}
			},

			//点击按钮 所有被选中或未选中
			// toggleAll(event) {
			// 	var checked = event.target.checked;
			// 	this.todos.forEach(todo => todo.completed = checked)
			// },

			//删除任务项
			removeTodo(delIndex) {  //访问原始DOM事件
				//console.log(delIndex,event)
				this.todos.splice(delIndex, 1)
			},

			//清除已完成项目
			removeDone() {
				// this.todos.forEach((item,index) => {
				// 	if(item.completed) {
				// 		//console.log(item.title)
				// 		this.todos.splice(index,1)
				//
				// 	}
				// })  //问题：forEach遍历删除元素之后 索引会发生变化 可以考虑使用for循环 并给索引--1
				//解决：过滤未完成的元素
				this.todos = this.todos.filter((item) => {
					return !item.completed
				})
			},

			//剩余完成数
			// getCount() {
			// 	return this.todos.filter(item => !item.completed).length
			// 	}

			//双击编辑状态

			//保存编辑 1.拿到文本框数据 2.回车保存 3.取消编辑状态
			saveEdit(item, index, event) {
				//console.log(event.target.value);
				//this.title = event.target.value
				var edit = event.target.value.trim(); //去空
				if (!edit.length) {
					return this.todos.splice(index, 1)
				} else {
					//将数据保存数据
					item.title = edit;
					//取消编辑样式
					this.currentEditing = null
				}
			}
		},
	});

		function onhashchange() {
		//console.log(window.location.hash)
		var hash = window.location.hash.slice(2) || 'all';
		window.vm.filterstate = hash;
	}

	window.onhashchange = onhashchange;

		window.onhashchange(); //手动调用一次，刷新保持状态

})(window);//文件依赖于全局中的VUE


