<template>
  <div class="todo-wrap">
    <h1 class="page-title">To do list</h1>
    <div class="form">
      <input type="text" class="form__input" placeholder="할 일을 입력하세요." v-model="todo" ref="todoinput" @keyup.enter="addTodo" autofocus>
      <button type="button" class="form__btn" @click="addTodo" title="추가">추가</button>
    </div>
    <div class="todo-box">
      <p v-if="!todolist.length">할 일을 추가해보세요!</p>
      <ul v-else class="todo-list">
        <li class="todo-list__item" :class="item.isdone ? 'todo-list__item--done' : '' " v-for="(item, index) in todolist" :key="index">
          <p v-if="!item.isupdate" class="todo-list__text" :class="item.isdone ? 'todo-list__text--is-done' : '' ">{{ item.text }}</p>
          <input type="text" v-else v-model="todoupdate" placeholder="수정할 일을 입력하세요." @keyup.enter="updateDoneTodo(index)" v-focus>
          <div class="todo-list__btn-group">
            <button type="button" v-if="item.isupdate" class="todo-list__btn" @click="updateDoneTodo(index)" title="수정완료">수정완료</button>
            <button type="button" v-if="!item.isupdate && !item.isdone" class="todo-list__btn" @click="updateTodo(index)" title="수정">수정</button>
            <button type="button" v-if="!item.isupdate" class="todo-list__btn" @click="removeTodo(index)" title="삭제">삭제</button>
            <button type="button" v-if="!item.isupdate && !item.isdone" class="todo-list__btn" @click="doneTodo(index)" title="완료">완료</button>
            <button type="button" v-if="item.isdone" class="todo-list__btn" @click="doneTodo(index)" title="다시하기">다시하기</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
/**
 * for 분기 안에 배치된 ref 지정은 반복문이 여러번 작동이 되면서 단일성을 깨뜨리게 됨
 * ref는 보통 하나의 객체를 컨트롤하기 위해 선언하고 여러번 반복하며 안 쓰임
 * 
 * https://vuejs.org/guide/reusability/custom-directives.html
 * custom directive를 사용해서 포커스 지정
 */
const focus = {
  mounted: (el) => el.focus()
}
export default {
  directives: {
    focus
  },
  setup(){
    let todo = ref('');
    let todoinput = ref(null);
    let todolist = ref([]);
    let todoupdate = ref('');

    let addTodo = () => {
      if(!todo.value){
        alert("할 일을 입력하세요.");
        todoinput.value.focus();

        return;
      }
      todolist.value.push({text: todo.value, isdone: false, isupdate: false});
      todoinput.value.focus();
      // console.log(todoinput.value);
      todo.value = '';
    }

    let updateTodo = (i) => {
      todolist.value[i].isupdate = !todolist.value[i].isupdate;
      todoupdate.value = todolist.value[i].text;
    }

    let updateDoneTodo = (i) => {
      if(todoupdate.value == ''){
        alert("수정할 일을 입력하세요.");
        return;
      }
      todolist.value[i].text = todoupdate.value;
      todolist.value[i].isupdate = !todolist.value[i].isupdate;
    }

    let removeTodo = (i) => {
      if(confirm("할 일을 삭제하시겠습니까?")){
        todolist.value.splice(i, 1);
      }
    }

    let doneTodo = (i) => {
      todolist.value[i].isdone = !todolist.value[i].isdone;
    }

    return{
      todo, todoinput, todolist, todoupdate, addTodo, updateTodo, updateDoneTodo, removeTodo, doneTodo,
    }
  }
}
</script>
