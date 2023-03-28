const input = document.querySelector("input"); //variable que me lleva al nodo que elijo
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");
const urgencia = document.querySelector("#urgencia");
const inColor = document.querySelector("#color");
const historial = [];
const tituloHistorial = document.querySelector("h3");
const contHistorial = document.querySelector(".container-historial");
const listHistorial = document.querySelector(".lista-historial");

addBtn.addEventListener("click", (e) =>{

    e.preventDefault();

    const text = input.value;
    const color = inColor.value;
    const selectedIndex = urgencia.selectedIndex;

    if(text !== ""){

        const li = document.createElement("li");
        const p = document.createElement("p");
        const div = document.createElement("div");
        div.className = "prioridad";

        p.textContent = text;

        if (selectedIndex != -1) {
            let selectedOption = urgencia.options[selectedIndex];
            let optionInnerHtml = selectedOption.innerHTML;
            div.textContent = ` (Prioridad: ${optionInnerHtml})`;
            urgencia.selectedIndex = 1;
        }
        
        li.appendChild(p);
        li.appendChild(div);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li);

        if(historial.length <= 10){
            historial.push(text)
        }

        if(historial.length === 10){
            historial.forEach((text)=>{
                const liHist = document.createElement("li");
                liHist.textContent = text;
                listHistorial.appendChild(liHist);
            })
        
        }

        
        input.value = "";
        li.style.backgroundColor = color;
        empty.style.display = "none";

        alert("Usted agregó una tarea nueva");

    }else{
        alert("La tarea no puede estar vacía");
    }
});


function addDeleteBtn(){

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) =>{

        function confirmar(e){
        
        let answer=confirm('¿Quieres eliminar la tarea?');
        
        if(answer){
            alert('Tarea borrada');
        }
        else{
            e.preventDefault();      
        }
    }
    confirmar();
        
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if(items.length === 0){
            empty.style.display = "block";
        }
        
    });

    return deleteBtn;

}

tituloHistorial.addEventListener("click", (e) =>{

    if (contHistorial.style.display === "none") {
        contHistorial.style.display = "block";
        tituloHistorial.textContent = 'Ocultar Historial';
      } else {
        contHistorial.style.display = "none";
        tituloHistorial.textContent = "Mostrar Historial (primeros 10)";
      }

});

