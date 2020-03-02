const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const todos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

$add.click(function () {
  if($input.val()) {
    todos.push({text: $input.val(), done: false});
    render(todos);
    $('.item-complete').click(complete);
    $('.item-remove').click(remove);
    return false;
  } else {
    alert('PUT SOME TEXT');
  }
});

function render(arr) {
  $('li').remove();
  arr.forEach(el => {
    $list.append(`<li class="item">
        <span class="item-text ${el.done ? 'done' : ''}">${el.text}</span>
        <button class="item-remove">Remove</button>
        <button class="item-complete">Complete</button>
      </li>
  `)
  })
  $input.val('');
};
render(todos);

function complete() {
  const parent = $(this).parent();
  for (const el of todos) {
    if (el.text === this.parentNode.firstElementChild.innerHTML) {
      el.done = !el.done;
    }
  }
  $(parent[0].firstElementChild).toggleClass('done');
}

function remove() {
  for (const el of todos) {
    if (el.text === this.parentNode.firstElementChild.innerHTML) {
      todos.splice(todos.indexOf(el), 1);
    }
  }
  this.parentNode.remove();
}

$('.item-complete').click(complete);
$('.item-remove').click(remove);