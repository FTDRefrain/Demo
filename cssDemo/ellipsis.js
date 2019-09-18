// css实现多行截断及
<div class='box'>
	<p>content here</p>
</div>

// 单行截断
p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
// 多行截断
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// 点击显示更多
<div class="box">
  <input type="checkbox" name="toggle" id="toggle" style="display: none;">
  <p>文本内容</p>
  <label for="toggle"></label>
</div>

label {
  &::after {
    content: "显示更多";
  }
}
input[name="toggle"]:checked {
	& + p {
   -webkit-line-clamp: unset;
 	},
  & ~ label {
    &::after {
      content: "收起文本";
    }
  }
}
p {
	// 即是被截断状态下，才有label
	// 没有超过三行本身就不需要label
 &.truncated {
   & + label {
    display: block;
   }
 }   
}
// 遍历决定是否添加truncated类
let list = document.querySelectorAll("p");

list.forEach(item => {
  item.classList[item.scrollHeight > item.offsetHeight ? "add" : "remove"]("truncated");
});
