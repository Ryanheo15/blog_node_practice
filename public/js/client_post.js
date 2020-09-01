//SELECTORS
let post_content = $(".post_content");

function truncate(str, length) {
  return str.split(" ").splice(0, length).join(" ");
}

let texts = [];
let text = post_content.text();
texts.push(text);

for(let i = 0; i < texts.length; i++){
  console.log(texts[i].length);
}
console.log(text);
//post_content.text(truncate(text));
