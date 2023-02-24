const formTeacher = document.getElementById('data-teacher');
const resp = document.getElementById('resp');
const teacher = document.getElementById('teacher');
const teacherClass = document.getElementById('teacher-class');
const maxNote = document.getElementById('max-note');
const formStudent = document.getElementById('data-student');
const noteStudent = document.getElementById('note-student');
const screenTable = document.getElementById('screen-table');
const tbodyStudent = document.getElementById('body-table'); 
const aside01 = document.querySelector(".aside-01");
const aside02 = document.querySelector(".aside-02");

const cores = ['#D6EBF2', '#F3FAFB'];
let proximaCor = 0;


function hidden(){
  formStudent.style.display = 'none';
  screenTable.style.display = 'none';
}
hidden()


function teacherSubmit(){
    formTeacher.addEventListener('submit', function(e){
        e.preventDefault();
        formStudent.style.display = 'inline';
        resp.innerHTML = `<p>Professor(a): ${teacher.value} <br>Turma: ${teacherClass.value} <br>Nota de corte: ${maxNote.value}</p>`
    })
}
teacherSubmit()

function studentSubmit(){
    formStudent.addEventListener('submit', function(e){
        e.preventDefault();
        screenTable.style.display = 'inline';


        const obj = {
            nome: document.querySelector('#student').value,
            nota1: document.querySelector('#note-01').value,
            nota2: document.querySelector('#note-02').value,
            nota3: document.querySelector('#note-03').value

          };

        addStudent(obj)
    }) 
}
studentSubmit()



function addStudent(aluno){
  const tr = document.createElement('tr');

  tr.style.backgroundColor = cores[proximaCor];
  proximaCor = (proximaCor + 1) % cores.length; // incrementa a variável e a retorna ao início do array se chegar ao final

  const tdNome = document.createElement('td'); // criar células para cada propriedade do objeto aluno
  tdNome.textContent = aluno.nome;

  const tdNotaOne = document.createElement('td');
  tdNotaOne.textContent = aluno.nota1;

  const tdNotaTwo = document.createElement('td');
  tdNotaTwo.textContent = aluno.nota2;

  const tdNotaThree = document.createElement('td');
  tdNotaThree.textContent = aluno.nota3;

  const tdTotal = document.createElement('td');
  tdTotal.textContent = (parseInt(aluno.nota1) + parseInt(aluno.nota2) + parseInt(aluno.nota3) )

  const tdResultado = document.createElement('td');
  tdResultado.textContent = ResulAproRepro(tdTotal);
  
  const tdDelete = document.createElement('td');
  tdDelete.appendChild(btn());
  
  // adiciona as células à linha
  tr.appendChild(tdNome);
  tr.appendChild(tdNotaOne);
  tr.appendChild(tdNotaTwo);
  tr.appendChild(tdNotaThree);
  tr.appendChild(tdTotal);
  tr.appendChild(tdResultado);
  tr.appendChild(tdDelete);

  //adiciona a linha ao corpo da tabela
  tbodyStudent.appendChild(tr);

/* for (inicio ; teste ; incr){} */




  if (tbodyStudent.clientHeight > 250){ // quando o a tabela for mais q 300 a tela em branco vai ser auto
    aside01.style.height = 'auto';
  }

  if(window.innerWidth < 800){ // quando a tela for menr que 800 a tela branca vai ser auto
    aside01.style.height = 'auto';
  }


  function ResulAproRepro(total) {
    if (parseInt(total.textContent) >= parseInt(maxNote.value)) {
      tdResultado.style.color = '#617b69';
      tdResultado.style.borderRight = '5px solid green';
      return 'Aprovado';
    } else {
      tdResultado.style.color = 'red';
      tdResultado.style.borderRight = '5px solid red';
      return 'Reprovado';
    }
  }

  function btn() {
    const btnRes = document.createElement('button');
    btnRes.classList.add('lixeira')
    btnRes.innerHTML = `<img src="./assets/img/lixeira.png" alt="Deletar o aluno">`
    btnRes.addEventListener('click', function() {
      delLinhaTable(tr);
    });
    return btnRes
  }

  function delLinhaTable(row) {
    row.remove();
  }





}


