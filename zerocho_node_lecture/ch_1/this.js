console.log(this); // -> 전역 스코프 -> exports

function a() {
    console.log(this); // -> func 내부 this -> global
}
a();