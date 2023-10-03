import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLoading: boolean = false;
  funcionarios: any;

  constructor() {
    this.getFuncionarios();
  }

  input: any = {
    'nome':'',
    'sobrenome':'',
    'cargo':'',
    'datanasc':'',
    'endereco':'',
    'cidade':'',
    'cep':'',
    'pais':'',
    'fone':'',
    'salario':'',
    'id':''
  };

  envia(){

    fetch('http://localhost/api/funcionario/inserir_funcionario.php', {
      method:'post',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(this.input)
    }).then(response => response.json())
    .then(response =>{
      console.log(response);
    }).catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      console.log('vai la ve')
    })
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios;
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(id: any){
    this.isLoading = true;
    fetch('http://localhost/api/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      
    })
  }


}
